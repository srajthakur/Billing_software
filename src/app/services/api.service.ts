import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = 'http://localhost:8001/api'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  printSettlement(data: any): Observable<any> {
    const endpoint: string = '/print_settlement';
    const url: string = `${this.baseUrl}${endpoint}`;
    return this.http.post(url, data);
  }

  printBill(data: any): Observable<any> {
    const endpoint: string = '/print_bill';
    const url: string = `${this.baseUrl}${endpoint}`;
    return this.http.post(url, data);
  }
  printLabel(data: any): Observable<any> {
    const endpoint: string = '/print_label';
    const url: string = `${this.baseUrl}${endpoint}`;
    return this.http.post(url, data);
  }

}
