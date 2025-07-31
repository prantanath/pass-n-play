import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  private userId!: string;

  setUserId(userId: string): void {
    this.userId = userId;
  }

  getUserId(){
    return this.userId;
  }
}
