import { Brackets, DataSource, EntityTarget, SelectQueryBuilder } from 'typeorm'

export class FindService {
	static apply(
		qb: SelectQueryBuilder<unknown>,
		dataSource: DataSource,
		target: EntityTarget<unknown>,
		alias: string,
		search: string,
	) {
		if (!search) return

		const stringFields = dataSource
			.getMetadata(target)
			.columns.map((item) => ({
				name: item.propertyName,
				type: item.type,
			}))
			.filter(
				(item) =>
					typeof item.type === 'function' && item.type.name === 'String',
			)

		const findQueryFactory = (qb) => {
			stringFields.forEach((field, i) => {
				const expression = i === 0 ? 'where' : 'orWhere'
				qb[expression](`${alias}.${field.name} ilike :search`)
			})
			qb.setParameter('search', `%${search}%`)
			return qb
		}

		qb.andWhere(new Brackets(findQueryFactory))
	}
}
