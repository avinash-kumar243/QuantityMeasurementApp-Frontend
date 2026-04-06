import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private http = inject(HttpClient);
  private apiUrl = 'https://quantitymeasurementapp-production-6c3d.up.railway.app/api/v1/quantities';

  getAllHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history`);
  }
}
