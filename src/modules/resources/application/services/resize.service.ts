import { Injectable } from '@nestjs/common'
import * as sharp from 'sharp'
import { TransformerTypeDto } from '../dto/transformerType.dto'

@Injectable()
export class ResizeService {
	transformer({ fit, h, w }: TransformerTypeDto) {
		return sharp().resize({
			fit,
			width: w,
			height: h,
		})
	}
}
