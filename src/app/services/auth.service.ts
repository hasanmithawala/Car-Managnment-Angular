// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor() { }

  // Simulate authentication logic
  public isAuthenticat(): boolean {
    return this.isAuthenticated;
  }

  public login() {
    this.isAuthenticated = true;
  }

}
