import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'

@Injectable()
export class EventsService {
	constructor(private readonly dataSource: DataSource) {}

	create() {
		return 'create'
	}

	getAll() {
		return 'getAll'
	}

	getOne() {
		return 'getOne'
	}

	update() {
		return 'update'
	}

	delete() {
		return 'delete'
	}

	getRequests() {
		return 'getRequests'
	}

	confirmRequest() {
		return 'confirmRequest'
	}

	cancelRequest() {
		return 'cancelRequest'
	}
}
