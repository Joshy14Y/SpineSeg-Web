import { Component, computed, input } from '@angular/core';
import { Vertebra } from '@interfaces/vertebra.interface';
import { ID2LABEL } from '@constants/id2label.constant';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'instance-stats',
  imports: [PercentPipe],
  templateUrl: './instance-stats.component.html',
  styleUrl: './instance-stats.component.css',
})
export class InstanceStatsComponent {
  public instances = input<Vertebra[]>([]);
  public threshold = input<number>(0.5);

  protected hasData = computed(() => this.instances().length > 0);

  protected getLabel(id: number) {
    return ID2LABEL[id];
  }

  protected getStatus(confidence: number) {
    return confidence > this.threshold() ? 'positive' : 'warning';
  }
}
