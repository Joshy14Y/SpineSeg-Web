import {
  Component,
  ElementRef,
  computed,
  effect,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { ID2LABEL } from '@constants/id2label.constant';
import { coords } from '@interfaces/coords.interface';
import { RadialPulseComponent } from '@components/radial-pulse/radial-pulse.component';

@Component({
  selector: 'spine-segmentation',
  imports: [RadialPulseComponent],
  templateUrl: './spine-segmentation.component.html',
  styleUrl: './spine-segmentation.component.css',
})
export class SpineSegmentationComponent {
  private maskPixels: Uint8ClampedArray | null = null;
  annotatedImg = input<string | null>(null);
  maskImg = input<string | null>(null);
  hoveredId = signal<number | null>(null);
  mouseX = signal(0);
  mouseY = signal(0);

  displayCanvas =
    viewChild.required<ElementRef<HTMLCanvasElement>>('displayCanvas');

  hasData = computed(() => !!this.annotatedImg() && !!this.maskImg());

  hoveredLabel = computed(() => {
    const id = this.hoveredId();
    if (!id) return null;
    return ID2LABEL[id];
  });

  constructor() {
    effect(() => {
      if (this.hasData()) {
        this.render();
      } else {
        this.clear();
      }
    });
  }

  async render() {
    if (!this.hasData()) return;
    this.clear();
    try {
      await this.renderCanvas();
      this.maskPixels = await this.setIdMask();
    } catch (error) {
      console.error('Failed to render:', error);
    }
  }

  private clear() {
    const canvas = this.displayCanvas().nativeElement;
    this.setDims(canvas, 0, 0);
    this.maskPixels = null;
  }

  private async renderCanvas() {
    const canvas = this.displayCanvas().nativeElement;
    const ctx = canvas.getContext('2d')!;
    const img = await this.loadImg(this.annotatedImg()!);
    this.setDims(canvas, img.width, img.height);
    ctx.drawImage(img, 0, 0);
  }

  private async setIdMask(): Promise<Uint8ClampedArray> {
    const offscreen = document.createElement('canvas');
    const ctx = offscreen.getContext('2d')!;
    const mask = await this.loadImg(this.maskImg()!);
    this.setDims(offscreen, mask.width, mask.height);
    ctx.drawImage(mask, 0, 0);
    return ctx.getImageData(0, 0, mask.width, mask.height).data;
  }

  private setDims(canvas: HTMLCanvasElement, w: number, h: number) {
    canvas.width = w;
    canvas.height = h;
  }

  private loadImg(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }

  onMouseMove(event: MouseEvent) {
    if (!this.maskPixels) return;
    const coords = this.getCanvasCoords(event);
    this.hoveredId.set(this.getClassId(coords));
    this.mouseX.set(event.offsetX);
    this.mouseY.set(event.offsetY - 35);
  }

  onMouseLeave() {
    this.hoveredId.set(null);
  }

  private getCanvasCoords(event: MouseEvent): coords {
    const canvas = this.displayCanvas().nativeElement;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: Math.floor((event.clientX - rect.left) * scaleX),
      y: Math.floor((event.clientY - rect.top) * scaleY),
    };
  }

  private getClassId({ x, y }: coords): number | null {
    const canvas = this.displayCanvas().nativeElement;
    const index = (y * canvas.width + x) * 4;
    const classId = this.maskPixels![index];
    return classId === 0 ? null : classId;
  }
}
