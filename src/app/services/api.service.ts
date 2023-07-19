import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8001/api/'; // Replace this with the actual API URL
  //private apiUrl = 'https://srajthakur-ideal-fortnight-r65rp5j6g44cw55w-8001.preview.app.github.dev/'

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  public printSettlement(data: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl + 'print_settlement', data, { headers });
  }
}
