import {
  Component,
  ElementRef,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { octUpload } from '@ng-icons/octicons';

@Component({
  selector: 'upload-image',
  imports: [NgIcon],
  viewProviders: [provideIcons({ octUpload })],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css',
  host: {
    '[class.dragover]': 'isDragging()',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave()',
    '(drop)': 'onDrop($event)',
    '(click)': 'triggerFileInput()',
  },
})
export class UploadImageComponent {
  private fileInput = viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  protected isDragging = signal(false);
  protected previewUrl = signal<string | null>(null);

  public fileSelected = output<File>();

  public reset() {
    this.fileInput().nativeElement.value = '';
    this.previewUrl.set(null);
  }

  protected triggerFileInput() {
    this.fileInput().nativeElement.click();
  }

  protected onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(true);
  }

  protected onDragLeave() {
    this.isDragging.set(false);
  }

  protected onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging.set(false);
    const file = event.dataTransfer?.files[0];
    if (file && this.isValidFile(file)) this.handleFile(file);
  }

  protected onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.reset();
      this.handleFile(file);
    }
  }

  private handleFile(file: File) {
    const objectURL = URL.createObjectURL(file)
    this.previewUrl.set(objectURL);
    this.fileSelected.emit(file);
  }

  private isValidFile(file: File): boolean {
    return ['image/png', 'image/jpeg'].includes(file.type);
  }
}
