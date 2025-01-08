import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  blogArray = [
    {
      author: 'Bella',
      title: 'When was the last time you legit closed your computer?',
      description:
        "Studies show that our sleep,focus and even relationships suffer when we don't have a clear lines drawn between work and home life",
    },
    {
      author: 'Bloom',
      title: "Let's Talk 50 Shades of Grey",
      description:
        'Studies show that our sleep,focus and even relationships suffer when we dont have a clear lines drawn between work and home life',
    },
    {
      author: 'Mary',
      title:
        'The Secret Ingredient to the Best Half-Baked, Gooey-Centered,Chocolate-Lover-Cookies Ever!!',
      description:
        "Studies show that our sleep,focus and even relationships suffer when we don't have a clear lines drawn between work and home life",
    },
  ];
}
