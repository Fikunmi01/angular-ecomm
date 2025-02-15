import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PrimaryButtonComponent } from '../../primary-button/primary-button.component';
import { ServicesService } from '../../../services/services/services.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [RouterLink, PrimaryButtonComponent],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent implements OnInit {
  userList: any[] = [];
  currentUser: any;
  otpValues: string[] = ['', '', '', '', '',''];

  constructor(private setupService: ServicesService) {}

  ngOnInit(): void {
    this.setupService.userList$.subscribe((userList) => {
      this.userList = userList;
      console.log(this.userList);
    });
    this.setupService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
  }

  verifyAcc(){
    const token = this.otpValues.join('');
    this.setupService.verifyEmail(token).subscribe((res:any)=> {
      if (res.status==='200') {
        console.log('Account Verified Successfully')
      } 
    })
  }

  onOtpChange(event: any, index: number) {
    const input = event.target;
    this.otpValues[index] = input.value;
    if (input.value && index < this.otpValues.length - 1) {
      input.nextElementSibling.focus();
    }
  }
}
