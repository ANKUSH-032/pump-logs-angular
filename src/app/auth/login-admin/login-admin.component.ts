import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent implements OnInit {
  loginForm!: FormGroup;
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  type: string = 'Password';
  loginData: any;
  message: string = 'Login Success';
  submitted = false;
  username: any;
  password: any;
  fieldTextType: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hideshowpass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onLogin() {
    this.loginForm.markAllAsTouched();
    this.submitted = true;

    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      this.authService.postRequest('Auth/login', loginData).subscribe(
        (res: any) => {
          if (res && res.status) {
            localStorage.setItem('token', res.userdetails.token);

            this.toastr.success(res.message || 'Login successful');
            console.log(res.userdetails.role);
            this.route.navigateByUrl('/dispensing-list');
          } else {
            this.toastr.error(res.message || 'Login unsuccessful');
          }
        },
        (res) => {
          this.toastr.error(res.message || 'Login unsuccessful');
        }
      );
    } else {
      this.toastr.error('Your form is invalid');
    }
  }
}
