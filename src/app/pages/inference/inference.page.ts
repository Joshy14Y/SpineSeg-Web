import { Component, computed, inject, signal, viewChild } from '@angular/core';
import { UploadImageComponent } from '@components/upload-image/upload-image.component';
import { SpineSegmentationComponent } from '@components/spine-segmentation/spine-segmentation.component';
import { ScoliosisResultComponent } from '@components/scoliosis-result/scoliosis-result.component';
import { InstanceStatsComponent } from '@components/instance-stats/instance-stats.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionArrowForward, ionReload } from '@ng-icons/ionicons';
import { InferenceService } from '@services/inference.service';
import { InferenceResult } from '@interfaces/inference-result.interface';
import { toDataUrl } from '../../utils/to-data-url.util';

@Component({
  selector: 'inference-page',
  imports: [
    NgIcon,
    UploadImageComponent,
    SpineSegmentationComponent,
    ScoliosisResultComponent,
    InstanceStatsComponent,
  ],
  viewProviders: [provideIcons({ ionArrowForward, ionReload })],
  templateUrl: 'inference.page.html',
  styleUrl: 'inference.page.css',
})
export class InferencePage {
  private uploadImage = viewChild.required(UploadImageComponent);
  private inference = inject(InferenceService);
  private result = signal<InferenceResult | null>(null);
  protected isLoading = signal<boolean>(false);
  protected file = signal<File | null>(null);
  protected hoveredId = signal<number | null>(null);

  protected inferenceBtnActive = computed(() => {
    return !!this.file() && !this.result() && !this.isLoading();
  });

  protected resetBtnActive = computed(() => {
    return !!this.file() && !this.isLoading();
  });

  protected annotatedImg = computed(() => {
    const img = this.result()?.annotated_img;
    return img ? toDataUrl(img) : null;
  });

  protected maskImg = computed(() => {
    const img = this.result()?.mask_img;
    return img ? toDataUrl(img) : null;
  });

  protected instances = computed(() => this.result()?.vertebrae ?? []);

  protected cobbAngle = computed(() => this.result()?.cobb_angle ?? null);

  protected async runInference() {
    if (this.isLoading()) return;
    this.isLoading.set(true);
    try {
      const result = await this.inference.runInference(this.file()!);
      this.result.set(result);
    } finally {
      this.isLoading.set(false);
    }
  }

  protected onFileSelected(file: File) {
    this.result.set(null);
    this.file.set(file);
  }

  protected reset() {
    this.result.set(null);
    this.file.set(null);
    this.uploadImage().reset();
  }
}
