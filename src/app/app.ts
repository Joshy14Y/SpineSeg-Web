import { Component, signal } from '@angular/core';
import { InferencePage } from '@pages/inference/inference.page';
import { TopBarComponent } from '@components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [InferencePage, TopBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('SpineSeg');
}
