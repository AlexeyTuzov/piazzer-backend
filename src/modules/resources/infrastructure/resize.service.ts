import { Injectable } from "@nestjs/common";
import ImageResizeDto from "../application/DTO/imageResize.dto";
import * as sharp from 'sharp';

@Injectable()
export default class ResizeService {
    transformer({ fit, h, w }: ImageResizeDto) {
        return sharp().resize({
            fit,
            width: w,
            height: h,
        });
    }
}