import { SpleenFilter } from './spleen-filter'
import { IFilter } from './interfaces/filter.interface'
import { BaseEntity, SelectQueryBuilder, WhereExpressionBuilder } from 'typeorm'
import { Filter, Clause } from 'spleen'
import { HttpException, HttpStatus } from '@nestjs/common'
//TODO рефакторинг
export class SpleenFilterManager extends SpleenFilter {
	static filters = new Set<IFilter>()

	static add(filter: IFilter) {
		this.filters.add(filter)
	}

	static getFilter(filterName: string) {
		return [...this.filters].find((filter) => filter.filterName === filterName)
	}

  static run(qb: SelectQueryBuilder<BaseEntity> | WhereExpressionBuilder, alias: string, field: string, operator: string, object, conjunctive) {
		const makeParamName = (length) => {
			const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
			return new Array(length).fill(0).reduce((prev) => (prev += chars[Math.floor(Math.random() * chars.length)]), '')
		}
		const operators = {
			eq: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} = :${paramName}`, { [paramName]: object }),
			neq: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} != :${paramName}`, { [paramName]: object }),
			gt: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} > :${paramName}`, { [paramName]: object }),
			gte: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} >= :${paramName}`, { [paramName]: object }),
			lt: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} < :${paramName}`, { [paramName]: object }),
			lte: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} <= :${paramName}`, { [paramName]: object }),
			in: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} IN (:...${paramName})`, { [paramName]: object }),
			nin: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} NOT IN (:...${paramName})`, { [paramName]: object }),
			between: (firstParamName, secondParamName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} BETWEEN :${firstParamName} AND :${secondParamName}`, {
					[firstParamName]: object.lower,
					[secondParamName]: object.upper,
				}),
			nbetween: (firstParamName, secondParamName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} NOT BETWEEN :${firstParamName} AND :${secondParamName}`, {
					[firstParamName]: object.lower,
					[secondParamName]: object.upper,
				}),
			like: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} ILIKE :${paramName}`, { [paramName]: object.value.replace(/\*/g, '%') }),
			nlike: (paramName, conjunctive, object) =>
				qb[conjunctive](`${alias}.${field} NOT ILIKE :${paramName}`, { [paramName]: object.value.replace(/\*/g, '%') }),
		}
		const conj = conjunctive === 'or' ? 'orWhere' : 'andWhere'

		if (operator === 'between' || operator === 'nbetween') {
			operators[operator](makeParamName(7), makeParamName(7), conj, object)
		} else {
			operators[operator](makeParamName(7), conj, object)
		}
	}

	static apply(qb: SelectQueryBuilder<BaseEntity> | WhereExpressionBuilder, expression: string) {
		if (!expression) {
			return
		}

		const filter = this.parse(expression)

		const handle = async (qb: SelectQueryBuilder<BaseEntity> | WhereExpressionBuilder) => {
			filter.statements.forEach((statement: Filter | Clause) => {
				if (statement.value instanceof Filter) {
					this.apply(qb, statement.value)
					return
				}

				if (!(statement.value instanceof Clause)) {
					throw new HttpException(
						{
							message: `Not a Clause Instanse: ${statement.value}`,
							code: 'VALIDATION_EXCEPTION',
						},
						HttpStatus.UNPROCESSABLE_ENTITY,
					)
				}

				const expectedFilter = statement.value.subject.path[0]
				const filter = this.getFilter(expectedFilter)

				if (!filter) {
					throw new HttpException(
						{
							message: `Filter ${expectedFilter} not found`,
							availableFilters: this.transformForResponse(),
							code: 'VALIDATION_EXCEPTION',
						},
						HttpStatus.UNPROCESSABLE_ENTITY,
					)
				}

				filter.validate(statement.value.operator.type, statement.value.object)
        filter.apply(qb, statement, this.run)
			})
		}

		handle(qb)
	}

	static transformForResponse() {
		return [...this.filters].map((filter) => {
			return {
				name: filter.filterName,
				operators: filter.availableOperators,
			}
		})
	}
}