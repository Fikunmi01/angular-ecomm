import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicesService } from '../../../services/services/services.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  templateUrl: './signup.compnent.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signUpForm!: FormGroup;
  passwordRequirements = {
    number: false,
    specialChar: false,
    uppercase: false,
    length: false,
  };
  showPasswordRequirements: boolean = false; // Add this property

  userList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private setupService: ServicesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initForm();
    this.signUpForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordRequirements();
    });
  }

  initForm() {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$'),
        ],
      ],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  // Add methods to handle password field focus
  onPasswordFocus() {
    this.showPasswordRequirements = true;
  }

  onPasswordBlur() {
    this.showPasswordRequirements = false;
  }

  signUp() {
    console.log('Signup button clicked');
    console.log('Form valid:', this.signUpForm.valid);
    console.log('Form values:', this.signUpForm.value);
    console.log('Form errors:', this.signUpForm.errors);
    
    if (this.signUpForm.valid) {
      console.log('Form is valid, proceeding with signup...');
      this.setupService.signUp(this.signUpForm.value).subscribe(
        (res: any) => {
          console.log(res, 'sign up successful');
          if (res.status === 'successful') {
            this.setupService.setUserList([res.user]);
            this.setupService.setCurrentUser(res.user);
            this.toastr.success('Account created successfully!');
            this.router.navigate(['/login/verify']);
          }
        },
        (error) => {
          console.error('Sign up error:', error);
          this.toastr.error('Sign up failed. Please try again.');
        }
      );
    } else {
      console.error('Form is invalid');
      console.log('Individual field errors:');
      Object.keys(this.signUpForm.controls).forEach(key => {
        const control = this.signUpForm.get(key);
        if (control && control.errors) {
          console.log(`${key}:`, control.errors);
        }
      });
      this.toastr.error('Please fill in all required fields correctly');
    }
  }

  checkPasswordRequirements() {
    const password = this.signUpForm.get('password')?.value || '';
    this.passwordRequirements.number = /\d/.test(password);
    this.passwordRequirements.specialChar = /[!@#$%^&*]/.test(password);
    this.passwordRequirements.uppercase = /[A-Z]/.test(password);
    this.passwordRequirements.length = password.length > 8;
  }
}