import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const baseURL = environment.api_url
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  postRequest(url: any, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post(baseURL + url, data, { headers }).pipe(map((response: any) => {
      return response;
    }));
  }

  get(url: any, id: string) {
    return this.http.get(baseURL + url + id)
  }

    postReq(url: any, data: any): Observable<any> {
    return this.http.post(baseURL + url, data).pipe(map((response: any) => {
      return response;
    }));
  }
}
