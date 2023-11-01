import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.baseUrl}books`;
  private apiUrlSearch = `${environment.baseUrl}`;
  private token = localStorage.getItem('access_token');

  constructor(private http: HttpClient) {}

  getBooks(page: number, perPage: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}/index?page=${page}&perPage=${perPage}`, { headers });
  }
  getBookDetails(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }
  deleteBook(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
  saveBook(data: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.post<any>(`${this.apiUrl}`,data, { headers });
  }
  searchBooks(queryParams: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrlSearch}search`, { headers, params: queryParams });
  }
  sendDataToEmail(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    return this.http.get<any>(`${this.apiUrlSearch}send-book-email`, { headers });
  }
}