import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.baseUrl}books`;
  private token = localStorage.getItem('access_token');

  constructor(private http: HttpClient) {}

  getBooks(page: number, perPage: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}/index?page=${page}&perPage=${perPage}`, { headers });
  }
  getBookDetails(id: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}/details?id=${id}`, { headers });
  }
}