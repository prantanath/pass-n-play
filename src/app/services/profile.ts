import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class Profile {
  private apiUrl = 'http://localhost:3000/profile';

  constructor(private http: HttpClient) {
  }

  getProfile(userId: string) {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
