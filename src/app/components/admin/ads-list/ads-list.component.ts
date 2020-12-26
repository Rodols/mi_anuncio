import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/Models/ad.interface';
import { AdService } from 'src/app/services/ad.service';
import {
  faCheckCircle,
  faTimesCircle,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css'],
})
export class AdsListComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faSearch = faSearch;
  ads: Ad[];
  title: string = '';
  constructor(private adSv: AdService) {}

  ngOnInit() {
    this.getAllAds();
    this.getTitle();
  }

  getAllAds() {
    this.adSv.getAllAds().subscribe((ads) => (this.ads = ads));
  }

  deleteAd(ad: Ad) {
    const deleteConfirmation = confirm('Seguro que deseas eliminar el anuncio');
    if (deleteConfirmation) {
      this.adSv.deleteAd(ad);
    }
  }

  bannerUpdateState(ad: Ad) {
    this.adSv.updateBannerState(ad);
  }

  getTitle() {
    this.adSv.searchTitleObservable.subscribe((title) => {
      this.title = title;
    });
  }

  search(title: string) {
    this.adSv.searchTitle(title);
  }
}
