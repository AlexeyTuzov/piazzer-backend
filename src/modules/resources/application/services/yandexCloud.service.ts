import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { S3 } from 'aws-sdk'

@Injectable()
export class YandexCloudService {
	private s3: S3
	private readonly bucket: string

	constructor(private configService: ConfigService) {
		this.bucket = this.configService.get('AWS_BUCKET_NAME')

		this.s3 = new S3({
			endpoint: this.configService.get('AWS_ENDPOINT'),
			accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
			secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
			region: this.configService.get('AWS_REGION'),
		})
	}

	async upload(data: Buffer, fileId: string) {
		const { Location, Key } = await this.s3
			.upload({
				Bucket: this.bucket,
				Body: data,
				Key: fileId,
			})
			.promise()

		return {
			Key,
			Location,
		}
	}

	async delete(fileId: string) {
		return this.s3
			.deleteObject({
				Bucket: this.bucket,
				Key: fileId,
			})
			.promise()
	}

	async downloadWithLink(fileId: string) {
		return this.s3.getSignedUrlPromise('getObject', {
			Bucket: this.bucket,
			Key: fileId,
		})
	}

	async downloadWithStream(fileId: string) {
		return this.s3
			.getObject({
				Bucket: this.bucket,
				Key: fileId,
			})
			.createReadStream()
	}

	downloadBuffer(fileId: string): Promise<any> {
		return this.s3
			.getObject({
				Bucket: this.bucket,
				Key: fileId,
			})
			.promise()
			.then((result) => result.Body)
	}
}
