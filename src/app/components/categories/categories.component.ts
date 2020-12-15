import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Ad } from 'src/app/Models/ad.interface';
import { AdService } from 'src/app/services/ad.service';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  faMarker = faMapMarkerAlt;
  ads: { categorie: string };
  adList: Ad[] = [];
  ad: Ad;

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
  }

  getAllCategorie(categorie: string) {
    this.adsSvc.getCategorie(categorie).subscribe((ads) => {
      this.adList = ads;
    });
  }

  viewDetail(ad: Ad) {
    this.ad = ad;
  }
}
