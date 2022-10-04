import {
	Injectable,
	Inject,
	CACHE_MANAGER,
	HttpException,
	HttpStatus,
} from '@nestjs/common'
import { Cache } from 'cache-manager'
import { DataSource } from 'typeorm'
import { randomBytes } from 'crypto'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../../../users/application/services/users.service'
import { UserConflictException } from '../exceptions/conflict.exception'
import { CommunicationConfirmService } from '../../../verification-codes/application/services/communication-confirm.service'
import { EmailService } from '../../../../infrastructure/emailer/service/emailer.service'
import { Communication } from 'src/modules/communications/domain/entities/communications.entity'
import { CommunicationConfirm } from '../../../verification-codes/domain/entities/communication-confirm.entity'
import { User } from '../../../users/domain/entities/users.entity'
import RefreshTokenDto from '../dto/refreshToken.dto'

@Injectable()
export class AuthService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private jwtService: JwtService,
		private readonly dataSource: DataSource,
		private readonly usersService: UsersService,
		private readonly communicationConfirmService: CommunicationConfirmService,
		private readonly emailService: EmailService,
	) {}

	async signUp(body): Promise<{ secret: string }> {
		return await this.dataSource.transaction(async () => {
			const existingUser = await this.usersService.getOneByEmail(body.email)

			if (existingUser) {
				throw new UserConflictException()
			}

			const secret = await this.usersService.create(body).then(async (user) => {
				//TODO сделать один метод. так как ниже дублируется код
				const communication = user.communications.find(
					(c) => c.value === body.email,
				)
				const { code, secret } = await this.communicationConfirmService.create(
					communication.id,
				)
				await this.emailService.send({
					to: body.email,
					subject: 'PIAZZER ✔',
					text: `Your approval code for PIAZZER is: ${code}`,
				})
				return secret
			})

			return { secret }
		})
	}

	async signUpResendCode(body): Promise<{ secret: string }> {
		return await this.dataSource.transaction(async () => {
			const communication = await Communication.findOneByOrFail({
				value: body.email,
			})
			if (communication) {
				const { code, secret } = await this.communicationConfirmService.create(
					communication.id,
				)
				await this.emailService.send({
					to: body.email,
					subject: 'PIAZZER ✔',
					text: `Your approval code for PIAZZER is: ${code}`,
				})
				return { secret }
			} else {
				throw new HttpException(
					{
						message: 'User not found',
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}
		})
	}

	async signUpConfirm(body) {
		return await this.dataSource.transaction(async () => {
			const record = await CommunicationConfirm.findOne({
				where: {
					code: body.code,
					secret: body.secret,
				},
				relations: ['communication', 'communication.user'],
			})

			if (!record) {
				throw new HttpException(
					{
						code: 'NOT_FOUND_EXCEPTION',
						status: 404,
					},
					HttpStatus.NOT_FOUND,
				)
			}

			const { communication } = record

			try {
				await Communication.update(communication.id, {
					confirmed: true,
				})
				await this.usersService.verification(communication.user.id)
				await CommunicationConfirm.delete(record.id)
				return this.login(communication.user)
			} catch (e) {
				console.error(e)
			}
		})
	}

	async signIn(body) {
		return await this.dataSource.transaction(async () => {
			const user = await User.createQueryBuilder('user')
				.leftJoin('user.communications', 'communications')
				.where('user.password = :password AND communications.value = :email', {
					password: User.hashPassword(body.password),
					email: body.email,
				})
				.getOne()

			if (!user) {
				throw new HttpException(
					{
						message: 'No user with this email found! Try to sign up first!',
						code: 'NOT_FOUND_EXCEPTION',
					},
					HttpStatus.NOT_FOUND,
				)
			}

			if (!user.verified) {
				throw new HttpException(
					{
						message: 'Verify user email to proceed logging in',
						code: 'FORBIDDEN_EXCEPTION',
					},
					HttpStatus.FORBIDDEN,
				)
			}

			return this.login(user)
		})
	}

	private async resolveUserByToken(token: string): Promise<User> {
		const data: any = await this.cacheManager.get(token)

		if (!data) {
			throw new HttpException(
				{
					message: 'Token not found',
					code: 'FORBIDDEN_EXCEPTION',
					status: HttpStatus.FORBIDDEN,
				},
				HttpStatus.FORBIDDEN,
			)
		}

		return await User.findOneByOrFail({
			id: data.sub,
			blocked: false,
			verified: true,
		})
	}

	async refreshToken(body: RefreshTokenDto) {
		return this.dataSource.transaction(async () => {
			const user = await this.resolveUserByToken(body.refreshToken)
			await this.cacheManager.del(body.refreshToken)
			await this.cacheManager.del(`${user.id}:refreshToken`)
			return this.login(user)
		})
	}

	oAuth(body) {
		//TODO
	}

	login(user: User) {
		const payload = { sub: user.id }
		const refreshToken = randomBytes(128).toString('base64')

		this.cacheManager.set(refreshToken, payload, { ttl: 3600 * 24 * 7 })
		this.cacheManager.set(`${user.id}:refreshToken`, refreshToken, {
			ttl: 3600 * 24 * 7,
		})

		return {
			refreshToken,
			accessToken: this.jwtService.sign(payload),
		}
	}
}
