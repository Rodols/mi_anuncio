import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/Models/ad.interface';
import { AdService } from 'src/app/services/ad.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css'],
})
export class AdsListComponent implements OnInit {
  ads: Ad[];
  constructor(private adSv: AdService) {}

  ngOnInit() {
    this.getAllAds();
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
}
