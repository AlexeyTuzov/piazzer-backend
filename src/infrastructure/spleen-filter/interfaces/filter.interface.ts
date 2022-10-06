import { BaseEntity, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm'
import { Clause } from 'spleen'

export interface IFilter {
	name: string
	filterName: string
	availableOperators: string[]
	validateValue(value: any): void
	validateOperator(operator: string): void
	validate(operator: string, value: any): void
	apply(
		qb: SelectQueryBuilder<BaseEntity> | WhereExpressionBuilder,
		statement: Clause,
		run,
	): void
}
