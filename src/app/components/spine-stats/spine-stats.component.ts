import { Component, computed, input } from '@angular/core';
import { ID2LABEL } from '@constants/id2label.constant';
import { Vertebra } from '@interfaces/vertebra.interface';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'spine-stats',
  imports: [PercentPipe],
  templateUrl: './spine-stats.component.html',
  styleUrl: './spine-stats.component.css',
})
export class SpineStatsComponent {
  public spine = input<Vertebra[]>([]);
  public threshold = input<number>(0.88);

  protected hasData = computed(() => this.spine().length > 0);

  protected segments = computed(() =>
    this.spine().map((v) => ({
      label: ID2LABEL[v.class_id],
      confidence: v.confidence,
    }))
  );

  protected avg = computed(() => {
    const detected = this.spine().filter((v) => v.confidence > 0);
    const sum = detected.reduce((acc, v) => acc + v.confidence, 0);
    return sum / detected.length;
  });

  protected flagged = computed(
    () => this.spine().filter((v) => v.confidence < this.threshold()).length
  );

  protected status = computed(() =>
    this.flagged() > 0 ? 'warning' : 'neutral'
  );

  protected total = computed(
    () => this.spine().filter((v) => v.confidence > 0).length
  );

  protected getSegStatus(confidence: number) {
    return confidence > this.threshold() ? 'neutral' : 'warning';
  }

  protected getSegHeight(confidence: number) {
    return confidence * 100;
  }
}
