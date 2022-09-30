import { DataSource, EntityTarget, SelectQueryBuilder } from 'typeorm'
import { DirectionEnum, SortItemDto } from '../pagination/dto/sortItem.dto'

export class SortService {
	static apply(
		qb: SelectQueryBuilder<unknown>,
		dataSource: DataSource,
		target: EntityTarget<unknown>,
		alias: string,
		sort: SortItemDto[],
	) {
		const targetFields = dataSource
			.getMetadata(target)
			.columns.map((item) => item.propertyName)

		if (!sort) {
			qb.orderBy(
				`${alias}.${targetFields.find((item) => item === 'createdAt') ?? 'id'}`,
				'DESC',
			)
		} else {
			sort.forEach(({ field, direction }: SortItemDto) => {
				if (targetFields.includes(field)) {
					qb.addOrderBy(
						`${alias}.${field}`,
						direction === DirectionEnum.ASC ? 'ASC' : 'DESC',
					)
				}
			})
		}
	}
}
