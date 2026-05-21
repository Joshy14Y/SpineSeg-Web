import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InferenceResult } from '@interfaces/inference-result.interface';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class InferenceService {
  private http = inject(HttpClient);

  async runInference(file: File): Promise<InferenceResult> {
    const formData = new FormData();
    formData.append('image', file);
    return firstValueFrom(
      this.http.post<InferenceResult>(`${environment.apiUrl}/segment`, formData)
    );
  }
}
