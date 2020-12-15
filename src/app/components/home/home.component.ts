import {
  Component,
  ElementRef,
  NgZone,
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
import { FormControl } from '@angular/forms';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faMarker = faMapMarkerAlt;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  @ViewChild('buttonPrev') buttonPrev: ElementRef;
  @ViewChild('buttonNext') buttonNext: ElementRef;
  @ViewChildren('ad') adCards: QueryList<ElementRef>;
  adListCarousel: Ad[] = [];
  ads: Ad[] = [];
  adCarousel: Ad;
  ad: Ad;
  numberAds = 0;
  cont = 0;
  //Mapas
  @ViewChild('search')
  public searchElementRef: ElementRef;

  zoom = 18;
  lat = 51.678418;
  lng = 7.809007;
  latLongs: any = [];
  latLong: any = {};
  address: string;
  mapTypeId = 'hybrid';
  public searchControl: FormControl;

  constructor(private adSv: AdService, private renderer: Renderer2) {}

  ngOnInit() {
    this.getAllads();
    //creamos el mapa por medio del div con id mapita
  }

  buttonPrevClick() {
    //console.log('prev', this.cont, this.adCards.length);
    //console.log(this.adCards.length * -1 + 2);
    if (this.cont != this.adCards.length * -1 + 1) {
      this.cont--;
      this.adCards.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 16}rem)`
        );
      });
    }
  }

  buttonNextClick() {
    //console.log('next', this.cont, this.adCards.length);
    if (this.cont <= -1) {
      this.cont++;
      this.adCards.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 16}rem)`
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

  viewDetail(ad: Ad) {
    this.ad = ad;
  }
}
