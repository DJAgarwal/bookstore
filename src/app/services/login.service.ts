import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.baseUrl+'login';

  constructor(private http: HttpClient) {}

  loginUser(user: any) {
    return this.http.post<any>(this.apiUrl, user);
  }
}