// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: { email: string; role: string } | null = null;

  constructor(private router: Router) {}

  login(email: string) {
    this.user = {
      email,
      role: this.getUserRole(email),
    };
    // Otras operaciones de inicio de sesión
  }

  logout() {
    this.user = null;
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.user !== null;
  }

  getUserRole(email: string): string {
    if (email.endsWith('@duocuc.cl')) {
      return 'alumno';
    } else if (email.endsWith('@profesor.duoc.cl')) {
      return 'profesor';
    }
    return 'invitado';
  }

  getUser(): { email: string; role: string } | null {
    return this.user;
  }
}
