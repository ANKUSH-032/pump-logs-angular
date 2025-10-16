import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseURL = environment.api_url;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  postRequest(url: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    // ✅ Create headers but DON'T set Content-Type for FormData
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    // ✅ Only set 'Content-Type: application/json' when data is not FormData
    if (!(data instanceof FormData)) {
      headers = headers.set('Content-Type', 'application/json');
    }

    return this.http
      .post(baseURL + url, data, { headers })
      .pipe(map((response: any) => response));
  }

  get(url: any, id: string) {
    return this.http.get(baseURL + url + id);
  }

  postReq(url: any, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    headers = headers.set('Content-Type', 'application/json');

    return this.http.post(baseURL + url, data, { headers }).pipe(
      map((response: any) => response)
    );
    
  }
getWithToken(url: string, responseType?: 'blob'): Observable<any> | Observable<Blob> {
  const token = localStorage.getItem('token');

  let headers = new HttpHeaders();
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  if (responseType === 'blob') {
    return this.http.get(url, { headers, responseType: 'blob' });
  }

  return this.http.get(url, { headers }); // defaults to JSON
}
}
