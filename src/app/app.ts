import { Component, signal } from '@angular/core';
import { InferencePage } from '@pages/inference/inference.page';
import { AngleIndicatorComponent } from "@components/angle-indicator/angle-indicator.component";

@Component({
  selector: 'app-root',
  imports: [InferencePage, AngleIndicatorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('SpineSeg');
}
