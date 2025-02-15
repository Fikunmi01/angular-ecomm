import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicesService } from '../../services/services/services.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  resetMenu: boolean = false;
  resetPwd: boolean = false;
  resetForm!: FormGroup;
  verifyPwdForm!: FormGroup;
  passwordRequirements = {
    number: false,
    specialChar: false,
    uppercase: false,
    length: false,
  };
  otpValues: string[] = ['', '', '', '', '', ''];
  userProfile: any[] = [];

  constructor(
    private fb: FormBuilder,
    private setupService: ServicesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loginForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordRequirements();
    });
  }

  closeResetMenu() {
    this.resetMenu = false;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$'),
        ],
      ],
    });

    this.resetForm = this.fb.group({
      email: ['', Validators.required],
    });

    this.verifyPwdForm = this.fb.group({
      reset_password_token: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$'),
        ],
      ],
    });
  }

  toggleResetMenu() {
    this.resetMenu = !this.resetMenu;
  }

  toggleResetPwd() {
    this.resetPwd = !this.resetPwd;
  }

  showResetPwdMenu() {
    this.resetPwd = true;
  }

  onOtpChange(event: any, index: number) {
    const input = event.target;
    this.otpValues[index] = input.value;
    if (input.value && index < this.otpValues.length - 1) {
      input.nextElementSibling.focus();
    }
  }

  verifyPwdReset() {
    const token = this.otpValues.join('');
    this.verifyPwdForm.patchValue({ reset_password_token: token }); // Set the token in the form
    if (this.verifyPwdForm.valid) {
      const verifyPayload = {
        password: this.verifyPwdForm.get('password')?.value,

        reset_password_token: this.verifyPwdForm.get('reset_password_token')?.value,
      };
      this.setupService.verifypwdReset(verifyPayload).subscribe(
        (res: any) => {
          if (res.status === 200) {
            console.log('Account Verified Successfully');
            this.toastr.success('Account verified successfully');
            this.resetPwd = false; // Close the reset password menu
          } else {
            console.error('Password verification failed:', res.message);
            this.toastr.error(res.message || 'Password verification failed');
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Password verification error:', error);
          this.toastr.error(error.message || 'Password verification failed');
        }
      );
    } else {
      console.error('Verification form is invalid');
      this.toastr.error('Verification form is invalid');
    }
  }

  resetPassword() {
    if (this.resetForm.valid) {
      const resetPayload = {
        email: this.resetForm.value.email,
      };
      this.setupService.forgotPassword(resetPayload).subscribe(
        (res: any) => {
          console.log('Password reset successfully done');
          this.toastr.success('Password reset instructions sent to your email');
          this.closeResetMenu();
          this.resetPwd = true;
        },
        (error: HttpErrorResponse) => {
          console.error('Password reset error:', error);
          if (error.status === 404) {
            this.toastr.error('User not found');
          } else {
            this.toastr.error(error.message || 'Password reset failed');
          }
        }
      );
    } else {
      console.error('Reset form is invalid');
      this.toastr.error('Reset form is invalid');
    }
  }

  login() {
    if (this.loginForm.valid) {
      const loginPayload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.setupService.login(loginPayload).subscribe(
        (res: any) => {
          console.log(res, 'login successful');
          if (res.access_token) {
            this.userProfile = res; // Store as an array
            localStorage.setItem('firstname', res.firstname);
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('refresh_token', res.refresh_token);
            this.toastr.success('Login successful');
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 4000); // 8 seconds delay
          }
        },
        (error: HttpErrorResponse) => {
          console.error('Login error:', error);
          if (error.status === 500) {
            this.toastr.error(error.error);
          } else {
            this.toastr.error(error.error || 'Login failed');
          }
        }
      );
    } else {
      console.error('Form is invalid');
      this.toastr.error('Form is invalid');
    }
  }

  checkPasswordRequirements() {
    const password = this.loginForm.get('password')?.value || '';
    this.passwordRequirements.number = /\d/.test(password);
    this.passwordRequirements.specialChar = /[!@#$%^&*]/.test(password);
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
    this.passwordRequirements.length = password.length > 8;
  }
}
