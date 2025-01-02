import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, RouterLink,CommonModule],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss',
})
export class AboutUsComponent {
  aboutArray = [
    {
      img: 'assets/Rectangle 8.png',
      name: 'HM Jawad ',
      role: 'Head of Operations IT'
    },
    {
      img: 'assets/Rectangle 8 (1).png',
      name: 'Furqan Abid',
      role: 'Head of Operations Marketing'
      
    },
    {
      img: 'assets/Rectangle 8 (3).png',
      name: 'Abdul Ah',
      role: 'Head of Operations Customer Support'

    },
    {
      img: 'assets/Rectangle 8 (4).png',
      name: 'Abrar Khan',
      role: 'Head of Operations Logistics'

    },
  ];
}
