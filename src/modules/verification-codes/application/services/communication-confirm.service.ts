import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { CommunicationConfirm } from '../../domain/entities/communication-confirm.entity'

@Injectable()
export class CommunicationConfirmService {
	constructor(private readonly dataSource: DataSource) {}

	codeGeneration(length: number): string {
		return new Array(length).fill(0).reduce((prev) => {
			prev += Math.floor(Math.random() * length)
			return prev
		}, '')
	}

	secretGeneration(length: number): string {
		const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
		return new Array(length).fill(0).reduce((prev) => {
			prev += chars[Math.floor(Math.random() * chars.length)]
			return prev
		}, '')
	}

	async create(
		communicationId: string,
	): Promise<{ code: string; secret: string }> {
		return this.dataSource.transaction(async () => {
			const code = this.codeGeneration(4)
			const secret = this.secretGeneration(6)
			const verificationCode = CommunicationConfirm.create({
				code,
				secret,
				communication: {
					id: communicationId,
				},
			})
			await verificationCode.save()
			return { code, secret }
		})
	}
}
