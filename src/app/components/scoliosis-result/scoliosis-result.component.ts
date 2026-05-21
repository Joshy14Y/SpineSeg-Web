import { Component, input, computed } from '@angular/core';
import { COBB_ANGLE_THRESHOLDS } from '@constants/cobb-angle-thresholds.constant';
import { AngleIndicatorComponent } from '@components/angle-indicator/angle-indicator.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'scoliosis-result',
  imports: [AngleIndicatorComponent, DecimalPipe],
  templateUrl: './scoliosis-result.component.html',
  styleUrl: './scoliosis-result.component.css',
  host: { '[class]': 'status()' },
})
export class ScoliosisResultComponent {
  public cobbAngle = input<number | null>(null);
  protected readonly thresholds = COBB_ANGLE_THRESHOLDS;

  protected hasData = computed(() => this.cobbAngle() !== null);

  protected result = computed(() => {
    const angle = this.cobbAngle();
    if (angle === null) return null;
    return this.thresholds.find((entry) => angle < entry.max);
  });

  protected status = computed(() => this.result()?.status ?? 'neutral');

  protected sublabel = computed(() =>
    this.hasData()
      ? `${this.cobbAngle()!.toFixed(1)}° cobb angle`
      : 'no x-ray, no verdict'
  );

  protected sublabelClass = computed(() =>
    this.hasData() ? 'primary' : 'secondary'
  );
}
