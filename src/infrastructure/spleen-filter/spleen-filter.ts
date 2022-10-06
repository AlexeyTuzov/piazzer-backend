import { Filter, parse } from 'spleen'
import { ValidationException } from '../validation/errors/validation.exception'

export abstract class SpleenFilter {
	static parse(expression: string | Filter): Filter {
		if (expression instanceof Filter) {
			return expression
		} else if (typeof expression === 'string') {
			const filter = parse(expression)

			if (!filter.success) {
				throw new ValidationException(
					undefined,
					undefined,
					filter.error.message,
				)
			} else if (!(filter.value instanceof Filter)) {
				throw new ValidationException(
					undefined,
					undefined,
					'Not a Filter instance got by .parse()',
				)
			}

			return filter.value
		}
	}
}
