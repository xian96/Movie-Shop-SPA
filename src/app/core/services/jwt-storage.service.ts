import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtStorageService {

  constructor() { }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  saveToken(token: string): void{
    localStorage.setItem('token', token);
  }

  destoryToken(): void {
    localStorage.removeItem('token');
  }
}
