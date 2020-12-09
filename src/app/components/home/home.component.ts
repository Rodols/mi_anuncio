import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Ad } from 'src/app/Models/ad.interface';
import { AdService } from 'src/app/services/ad.service';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  @ViewChild('buttonPrev') buttonPrev: ElementRef;
  @ViewChild('buttonNext') buttonNext: ElementRef;
  @ViewChildren('ad') adCards: QueryList<ElementRef>;
  adListCarousel: Ad[] = [];
  ads: Ad[] = [];
  adCarousel: Ad;
  numberAds = 0;
  cont = 0;

  constructor(private adSv: AdService, private renderer: Renderer2) {}

  ngOnInit() {
    this.getAllads();
  }

  buttonPrevClick() {
    // console.log(this.cont, this.adCards.length);
    if (this.cont != this.adCards.length * -1) {
      this.cont--;
      this.adCards.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 10}rem)`
        );
      });
    }
  }

  buttonNextClick() {
    // console.log(this.cont, this.adCards.length);
    if (this.cont <= -1) {
      this.cont++;
      this.adCards.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 10}rem)`
        );
      });
    }
  }

  getAllads() {
    this.adSv.getAllAds().subscribe((ads) => {
      this.ads = ads;
      let i = 0;
      ads.forEach((ad) => {
        if (i === 0) {
          this.adCarousel = ad;
        } else {
          this.adListCarousel.push(ad);
        }
        i++;
      });
    });
  }
}
