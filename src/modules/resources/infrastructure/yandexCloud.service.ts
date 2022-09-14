import { Injectable } from "@nestjs/common";
import { S3 } from "aws-sdk";

@Injectable()
export default class YandexCloudService {
    private s3: S3;
    private bucket: string;

    constructor() {
        this.bucket = process.env.AWS_BUCKET_NAME;

        this.s3 = new S3({
            endpoint: 'https://storage.yandexcloud.net',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        })
    }

    async upload(data: Buffer, fileId: string) {
        const { Location, Key } = await this.s3
            .upload({
                Bucket: this.bucket,
                Body: data,
                Key: fileId
            })
            .promise();

        return { Key, Location }
    }

    async delete(fileId: string) {
        return await this.s3
            .deleteObject({
                Bucket: this.bucket,
                Key: fileId
            })
            .promise()
    }

    async downloadWithLink(fileId: string) {
        return await this.s3
            .getSignedUrlPromise('getObject', {
                Bucket: this.bucket,
                Key: fileId
            })
    }

    async downloadWithStream(fileId: string) {
        return this.s3
            .getObject({
                Bucket: this.bucket,
                Key: fileId
            })
            .createReadStream();
    }
}