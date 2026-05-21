import { PercentPipe } from '@angular/common';
import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'progress-ring',
  imports: [PercentPipe],
  templateUrl: './progress-ring.component.html',
  styleUrl: './progress-ring.component.css',
  host: { '[class]': 'variant()' },
})
export class ProgressRingComponent {
  public value = input<number>(0);
  public variant = input<'positive' | 'warning' | 'neutral'>('neutral');
  public size = input<number>(55);

  protected c = computed(() => this.size() * 0.5);

  protected r = computed(() => this.c() - 5);

  protected viewBox = computed(() => `0 0 ${this.size()} ${this.size()}`);

  protected circumference = computed(() => 2 * Math.PI * this.r());

  protected offset = computed(() => this.circumference() * (1 - this.value()));
}
