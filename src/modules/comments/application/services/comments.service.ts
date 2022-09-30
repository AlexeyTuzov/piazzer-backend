import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { Comment } from '../../domain/entities/comments.entity'

@Injectable()
export class CommentsService {
	constructor(private readonly dataSource: DataSource) {}

	create() {
		return this.dataSource.transaction(async () => {
			let body
			const comment = Comment.create()
			Object.assign(comment, body)
			await comment.save()
			return comment
		})
	}

	getAll() {
		return this.dataSource.transaction(async () => {
			return Comment.find()
		})
	}

	getOne() {
		return this.dataSource.transaction(async () => {
			let criteria
			return Comment.findOne(criteria)
		})
	}

	update() {
		return this.dataSource.transaction(async () => {
			let criteria, body
			return Comment.update(criteria, body)
		})
	}

	delete() {
		return this.dataSource.transaction(async () => {
			// return Comment.softRemove()
			return 'delete'
		})
	}
}
