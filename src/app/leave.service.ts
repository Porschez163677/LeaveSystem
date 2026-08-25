import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeaveType {
  typeid: string;
  typename: string;
}

export interface LeaveRequest {
  employeeid: string;
  leave_from_date: string;
  leave_to_date: string;
  typeid: string;
  reason: string;
}

export interface LeaveRecord {
  leaveid: string;
  leave_from_date: string;
  leave_to_date: string;
  typeid: string;
  typename: string;
  reason: string;
}

const API_URL = 'http://localhost:8080/Leave/api';

@Injectable({ providedIn: 'root' })
export class LeaveService {
  constructor(private http: HttpClient) {}

  getLeaveTypes(): Observable<LeaveType[]> {
    return this.http.get<LeaveType[]>(`${API_URL}/leavetypes.php`);
  }

  getLeavesByEmployee(employeeid: string): Observable<LeaveRecord[]> {
    return this.http.get<LeaveRecord[]>(`${API_URL}/leaves.php`, { params: { employeeid } });
  }

  submitLeave(request: LeaveRequest): Observable<{ leaveid: string }> {
    return this.http.post<{ leaveid: string }>(`${API_URL}/leave.php`, request);
  }
}
