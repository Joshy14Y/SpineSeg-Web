import { Vertebra } from './vertebra.interface';

export interface InferenceResult {
  mask_img: string;
  annotated_img: string;
  vertebrae: Vertebra[];
  cobb_angle: number;
}
