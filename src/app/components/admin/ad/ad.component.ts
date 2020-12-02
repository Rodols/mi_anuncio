import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { Ad } from 'src/app/Models/ad.interface';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css'],
})
export class AdComponent implements OnInit {
  adForm = new FormGroup({
    title: new FormControl(''),
    direction: new FormControl(''),
    description: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    web: new FormControl(''),
    categorie: new FormControl(''),
  });

  constructor(private adSv: AdService) {}

  ngOnInit() {
    this.getAllAds();
  }

  createAd() {
    const { title } = this.adForm.value;
    const { direction } = this.adForm.value;
    const { description } = this.adForm.value;
    const { email } = this.adForm.value;
    const { phone } = this.adForm.value;
    const { web } = this.adForm.value;
    const { categorie } = this.adForm.value;
    let ad: Ad = {};
    ad.title = title;
    ad.direction = direction;
    ad.description = description;
    ad.email = email;
    ad.phone = phone;
    this.adSv.saveAd(ad);
  }

  getAllAds() {
    this.adSv.getAllAds().subscribe((ad) => console.log(ad));
  }
}
