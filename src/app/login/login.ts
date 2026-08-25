import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class Login {
  employeeid = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.auth.login(this.employeeid, this.password).subscribe({
      next: () => this.router.navigateByUrl('/leave'),
      error: (err) => {
        this.errorMessage = err?.error?.message || 'เข้าสู่ระบบไม่สำเร็จ';
      },
    });
  }
}
