import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, Employee } from '../auth.service';
import { LeaveRecord, LeaveService, LeaveType } from '../leave.service';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './leave.html',
})
export class Leave implements OnInit {
  employee: Employee | null = null;
  leaveTypes: LeaveType[] = [];
  leaves: LeaveRecord[] = [];

  leaveFromDate = '';
  leaveToDate = '';
  typeid = '';
  reason = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private auth: AuthService,
    private leaveService: LeaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employee = this.auth.getCurrentEmployee();
    if (!this.employee) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.leaveService.getLeaveTypes().subscribe((types) => (this.leaveTypes = types));
    this.loadLeaves();
  }

  loadLeaves(): void {
    if (!this.employee) return;
    this.leaveService.getLeavesByEmployee(this.employee.employeeid).subscribe((leaves) => {
      this.leaves = leaves;
    });
  }

  onSubmit(): void {
    if (!this.employee) return;
    this.errorMessage = '';
    this.successMessage = '';

    this.leaveService
      .submitLeave({
        employeeid: this.employee.employeeid,
        leave_from_date: this.leaveFromDate,
        leave_to_date: this.leaveToDate,
        typeid: this.typeid,
        reason: this.reason,
      })
      .subscribe({
        next: (result) => {
          this.successMessage = `ส่งใบลาสำเร็จ (เลขที่ใบลา ${result.leaveid})`;
          this.leaveFromDate = '';
          this.leaveToDate = '';
          this.typeid = '';
          this.reason = '';
          this.loadLeaves();
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'ส่งใบลาไม่สำเร็จ';
        },
      });
  }

  logout(): void {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
