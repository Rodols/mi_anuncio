import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ad } from 'src/app/Models/ad.interface';
import { AdService } from 'src/app/services/ad.service';
import {
  faMapMarkerAlt,
  faPhoneVolume,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  faMarker = faMapMarkerAlt;
  faPhone = faPhoneVolume;
  ads: { categorie: string };
  adList: Ad[] = [];
  ad: Ad;
  title: string = '';

  constructor(
    private activedRoute: ActivatedRoute,
    private adsSvc: AdService
  ) {}

  ngOnInit(): void {
    this.ads = { categorie: this.activedRoute.snapshot.params.categorie };
    this.activedRoute.params.subscribe((params: Params) => {
      this.ads.categorie = params.categorie;
      this.getAllCategorie(this.ads.categorie);
    });
    this.getTitleSearch();
  }

  getAllCategorie(categorie: string) {
    this.adsSvc.getCategorie(categorie).subscribe((ads) => {
      this.adList = ads;
    });
  }

  viewDetail(ad: Ad) {
    this.ad = ad;
    this.adsSvc.updateVistas(ad);
  }

  getTitleSearch() {
    this.adsSvc.searchTitleObservable.subscribe((title) => {
      this.title = title;
    });
  }
}
