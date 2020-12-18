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
  @ViewChild('buttonPrevLastet') buttonPrevLastet: ElementRef;
  @ViewChild('buttonNextLastet') buttonNextLastet: ElementRef;
  @ViewChild('buttonPrevMostSeen') buttonPrevMostSeen: ElementRef;
  @ViewChild('buttonNextMostSeen') buttonNextMostSeen: ElementRef;
  @ViewChildren('adLastet') adLastet: QueryList<ElementRef>;
  @ViewChildren('adMostSeen') adMostSeen: QueryList<ElementRef>;
  adListCarousel: Ad[] = [];
  ads: Ad[] = [];
  mostSeenAds: Ad[] = [];
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
    this.getBannersAds();
    this.getMostSeenAds();
    //creamos el mapa por medio del div con id mapita
  }

  buttonPrevLastetClick() {
    //console.log('prev', this.cont, this.adCards.length);
    //console.log(this.adCards.length * -1 + 2);
    if (this.cont != this.adLastet.length * -1 + 1) {
      this.cont--;
      this.adLastet.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 16}rem)`
        );
      });
    }
  }

  buttonNextLastetClick() {
    //console.log('next', this.cont, this.adCards.length);
    if (this.cont <= -1) {
      this.cont++;
      this.adLastet.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 16}rem)`
        );
      });
    }
  }

  buttonPrevMostSeenClick() {
    //console.log('prev', this.cont, this.adCards.length);
    //console.log(this.adCards.length * -1 + 2);
    if (this.cont != this.adMostSeen.length * -1 + 1) {
      this.cont--;
      this.adMostSeen.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 16}rem)`
        );
      });
    }
  }

  buttonNextMostSeenClick() {
    //console.log('next', this.cont, this.adCards.length);
    if (this.cont <= -1) {
      this.cont++;
      this.adMostSeen.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 16}rem)`
        );
      });
    }
  }

  getAllads() {
    this.adSv.getLastetAds().subscribe((ads) => {
      this.ads = ads;
    });
  }

  getBannersAds() {
    this.adSv.getBannersAds().subscribe((bannersAds) => {
      this.adCarousel = bannersAds[0];
      bannersAds.map((ad, index) => {
        if (index != 0) {
          this.adListCarousel.push(ad);
        }
      });
    });
  }

  getMostSeenAds() {
    this.adSv.getMostSeenAds().subscribe((mostAdsSeen) => {
      this.mostSeenAds = mostAdsSeen;
    });
  }

  viewDetail(ad: Ad) {
    this.ad = ad;
    this.adSv.updateVistas(ad);
  }
}
