import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  images: string[] = [
    'assets/images/image1.png', 
    'assets/images/image2.jpg',
  ];
  currentIndex: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.startSlideshow();
  }

  startSlideshow() {
    setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }
}
