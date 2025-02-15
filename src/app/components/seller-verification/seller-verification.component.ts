import { CommonModule, NgClass } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class SellerVerificationComponent implements OnInit {
  @ViewChild('videoElement') videoElement!: ElementRef;
  steps = ['Personal Information', 'Document Upload', 'Facial Verification'];
  currentStep = 1;
  personalInfoForm: FormGroup;
  selectedFile: File | null = null;
  photoTaken = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
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
    if (this.photoTaken) {
      this.photoTaken = false;
      this.startCamera();
    } else {
      this.capturePhoto();
    }
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
        this.videoElement.nativeElement.play();
      })
      .catch(error => {
        console.error('Error accessing camera:', error);
      });
  }

  capturePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.photoTaken = true;
    video.srcObject.getTracks().forEach((track: any) => track.stop());
  }

  completeVerification(): void {
    // Handle verification completion
    console.log('Verification completed');
    // You would typically make an API call here
  }
}
