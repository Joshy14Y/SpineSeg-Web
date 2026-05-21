import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'angle-indicator',
  imports: [],
  templateUrl: './angle-indicator.component.html',
  styleUrl: './angle-indicator.component.css',
})
export class AngleIndicatorComponent {
  public angle = input<number>(0);

  protected readonly size = 100;
  protected readonly originX = 5;
  protected readonly originY = this.size - this.originX;
  protected readonly r = this.size - 2 * this.originX;
  protected readonly arcRadius = 40;
  protected readonly viewBox = `0 0 ${this.size} ${this.size}`;
  protected readonly lineEndX = this.originX + this.r;

  protected readonly rad = computed(() => (this.angle() * Math.PI) / 180);

  protected readonly endX = computed(
    () => this.originX + Math.cos(this.rad()) * this.r
  );
  protected readonly endY = computed(
    () => this.originY - Math.sin(this.rad()) * this.r
  );

  protected readonly arcX = computed(
    () => this.originX + Math.cos(this.rad()) * this.arcRadius
  );
  protected readonly arcY = computed(
    () => this.originY - Math.sin(this.rad()) * this.arcRadius
  );

  protected readonly arc = computed(
    () =>
      `M ${this.originX + this.arcRadius} ${this.originY} A ${this.arcRadius} ${this.arcRadius} 0 0 0 ${this.arcX()} ${this.arcY()}`
  );
}
