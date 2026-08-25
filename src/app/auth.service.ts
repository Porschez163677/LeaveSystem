import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface Employee {
  employeeid: string;
  fullname: string;
  managerid: string | null;
}

const API_URL = 'http://localhost:3000/api';
const STORAGE_KEY = 'leave_employee';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(employeeid: string, password: string): Observable<Employee> {
    return this.http
      .post<Employee>(`${API_URL}/login`, { employeeid, password })
      .pipe(tap((employee) => this.setCurrentEmployee(employee)));
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
  }

  getCurrentEmployee(): Employee | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentEmployee() !== null;
  }

  private setCurrentEmployee(employee: Employee): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(employee));
  }
}
