import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Communication } from '../../domain/entities/communications.entity'
import { CommunicationAddDto } from '../dto/communicationAdd.dto'

@Injectable()
export class CommunicationsService {
	constructor(private readonly dataSource: DataSource) {}

	async communicationAddToEvent(eventId: string, body: CommunicationAddDto[]) {
		return this.dataSource.transaction(async () => {
			for (let comm of body) {
				const communication = Communication.create()
				Object.assign(communication, {
					...comm,
					event: {
						id: eventId,
					},
				})
				await communication.save()
			}
		})
	}
}
