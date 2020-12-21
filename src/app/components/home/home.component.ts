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
import {
  faChevronLeft,
  faChevronRight,
  faMapMarkerAlt,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';
import { FormControl } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categorie } from 'src/app/Models/categorie.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faMarker = faMapMarkerAlt;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faPhone = faPhoneVolume;
  cel: number = 2235698659;
  @ViewChild('buttonPrevLastet') buttonPrevLastet: ElementRef;
  @ViewChild('buttonNextLastet') buttonNextLastet: ElementRef;
  @ViewChild('buttonPrevMostSeen') buttonPrevMostSeen: ElementRef;
  @ViewChild('buttonNextMostSeen') buttonNextMostSeen: ElementRef;
  @ViewChild('buttonLeftMostSeen') buttonLeftMostSeen: ElementRef;
  @ViewChild('buttonLeftLastetAds') buttonLeftLastetAds: ElementRef;
  @ViewChildren('adLastet') adLastet: QueryList<ElementRef>;
  @ViewChildren('adMostSeen') adMostSeen: QueryList<ElementRef>;
  categories: Categorie[] = [];
  adListCarousel: Ad[] = [];
  ads: Ad[] = [];
  lastetAds: Ad[] = [];
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
  title: string = '';
  public searchControl: FormControl;

  constructor(
    private adSv: AdService,
    private categorieSv: CategoriesService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.getAllads();
    this.getLastetAds();
    this.getBannersAds();
    this.getMostSeenAds();
    this.getAllCategories();
    this.adSv.searchTitleObservable.subscribe((title) => (this.title = title));
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
        this.renderer.setStyle(
          this.buttonLeftLastetAds.nativeElement,
          'display',
          'block'
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
        if (this.cont == 0) {
          this.renderer.setStyle(
            this.buttonLeftLastetAds.nativeElement,
            'display',
            'none'
          );
        }
      });
    }
  }

  buttonPrevMostSeenClick() {
    // console.log('prev', this.adMostSeen.length * -1 + 1);
    if (this.cont != this.adMostSeen.length * -1 + 1) {
      this.cont--;
      this.adMostSeen.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 16}rem)`
        );
        this.renderer.setStyle(
          this.buttonLeftMostSeen.nativeElement,
          'display',
          'block'
        );
      });
    }
  }

  buttonNextMostSeenClick() {
    if (this.cont <= -1) {
      this.cont++;
      // console.log('next', this.cont);
      this.adMostSeen.forEach((adCard) => {
        this.renderer.setStyle(
          adCard.nativeElement,
          'transform',
          `translate(${this.cont * 16}rem)`
        );
        if (this.cont == 0) {
          this.renderer.setStyle(
            this.buttonLeftMostSeen.nativeElement,
            'display',
            'none'
          );
        }
      });
    }
  }

  getAllads() {
    this.adSv.getAllAds().subscribe((ads) => {
      this.ads = ads;
    });
  }

  getLastetAds() {
    this.adSv.getLastetAds().subscribe((ads) => {
      this.lastetAds = ads;
    });
  }

  getAllCategories() {
    this.categorieSv
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
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
    this.adSv.getMostSeenAds().subscribe((mostSeenAds) => {
      this.mostSeenAds = mostSeenAds;
    });
  }

  viewDetail(ad: Ad) {
    this.ad = ad;
    this.adSv.updateVistas(ad);
  }
}
