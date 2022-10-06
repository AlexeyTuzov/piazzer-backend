import { HttpException, HttpStatus } from '@nestjs/common'
import { BaseEntity, SelectQueryBuilder } from 'typeorm'
import { IFilter } from '../interfaces/filter.interface'
import { Clause } from 'spleen'

export class Filter implements IFilter {
	tableAlias: string
	field: string
	availableOperators: string[]
	filterName: string
	name: string
	validateValue(value: any): void {}
	validateOperator(operator: string): void {
		if (!this.availableOperators.includes(operator)) {
			throw new HttpException(
				{
					filter: this.filterName,
					message: 'One of the available operators must be used',
					availableOperators: this.availableOperators,
					code: 'VALIDATION_EXCEPTION',
				},
				HttpStatus.UNPROCESSABLE_ENTITY,
			)
		}
	}
	validate(operator: string, value: any): void {
		this.validateOperator(operator)
		this.validateValue(value)
	}
	apply(qb: SelectQueryBuilder<BaseEntity>, statement: Clause, run) {
		const { operator, object } = statement.value
		run(qb, this.tableAlias, this.field, operator.type, object, statement.conjunctive)
	}
}
