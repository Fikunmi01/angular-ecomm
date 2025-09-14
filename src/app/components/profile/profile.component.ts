import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../services/services/services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  selectedFileUrl: string | ArrayBuffer | null = null; // Ensure this property is defined
  selectedFile: File | null = null; // Add a property to store the selected file
  profileDetails: any = {
    firstname: 'John',
    lastname: 'Doe',
    email: 'fikunmiadekunle@gmail.com',
    profile_picture: 'https://res.cloudinary.com/dey2bqr6r/image/upload/v1739763234/profile_pics/rgpmixtpeq3fiaamztfq.png'
  };

  constructor(
    private setupService: ServicesService,
    private httpClient: HttpClient
  ) {}
  ngOnInit(): void {
    this.getUserDetails();
    const token = this.setupService.getToken();
    console.log(token, 'our token');
  }

  getUserDetails() {
    const headers = new HttpHeaders().set(
      'x-access-token',
      `${localStorage.getItem('access_token')}`
    );
    this.httpClient
      .get(`${this.setupService.baseUrl}api/user/profile`, { headers })
      .subscribe(
        (res: any) => {
          console.log(res, 'user fetched successfully');
          this.profileDetails = res.user;
          // if(res.status==='200')
        },
        (err) => {
          if (err.status === 401) {
            this.setupService.refreshToken().subscribe(() => {
              this.getUserDetails();
            });
          } else {
            console.error('Error fetching user profile', err);
          }
        }
      );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file; // Store the selected file
      console.log('Selected file:', file);

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedFileUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadProfilePic(): void {
    if (!this.selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('profilePic', this.selectedFile);

    const headers = new HttpHeaders().set(
      'x-access-token',
      `${localStorage.getItem('access_token')}`
    );

    this.httpClient
      .post(`${this.setupService.baseUrl}api/user/add-profile-pic`, formData, {
        headers,
      })
      .subscribe(
        (res: any) => {
          console.log('Profile picture uploaded successfully', res);
          if (res.profilePicUrl) {
            this.selectedFileUrl = res.profilePicUrl;
          }
        },
        (err) => {
          if (err.status === 401) {
            this.setupService.refreshToken().subscribe(() => {
              this.uploadProfilePic();
            });
          } else {
            console.error('Error uploading profile picture', err);
          }
        }
      );
  }
}
