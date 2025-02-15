import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-seller-verification',
  standalone: true,
  imports: [NgClass, CommonModule, ReactiveFormsModule],
  templateUrl: './seller-verification.component.html',
  styleUrl: './seller-verification.component.scss',
})
export class SellerVerificationComponent {
  steps = ['Personal Information', 'Document Upload', 'Facial Verification'];
  currentStep = 1;
  personalInfoForm: FormGroup;
  selectedFile: File | null = null;
  photoTaken = false;

  constructor(private fb: FormBuilder) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      idNumber: ['', Validators.required],
    });
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && this.isValidFile(file)) {
      this.selectedFile = file;
    }
  }

  isValidFile(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    return validTypes.includes(file.type) && file.size <= maxSize;
  }

  removeFile(): void {
    this.selectedFile = null;
  }

  togglePhoto(): void {
    this.photoTaken = !this.photoTaken;
  }

  completeVerification(): void {
    // Handle verification completion
    console.log('Verification completed');
    // You would typically make an API call here
  }
}
