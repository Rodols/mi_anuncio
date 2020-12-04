import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { Ad } from 'src/app/Models/ad.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { FileItem } from 'src/app/Models/file-item';

export interface Categorie {
  id?: string;
  name?: string;
}

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.css'],
})
export class AdComponent implements OnInit {
  categories: Categorie[];
  file: FileItem;

  adForm = new FormGroup({
    title: new FormControl(''),
    direction: new FormControl(''),
    description: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    web: new FormControl(''),
    categorie: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(
    private adSv: AdService,
    private categorieSv: CategoriesService
  ) {}

  ngOnInit() {
    this.getAllCategories();
  }

  createAd() {
    const { title } = this.adForm.value;
    const { direction } = this.adForm.value;
    const { description } = this.adForm.value;
    const { email } = this.adForm.value;
    const { phone } = this.adForm.value;
    const { web } = this.adForm.value;
    const { categorie } = this.adForm.value;
    const { image } = this.adForm.value;
    let ad: Ad = {};
    ad.title = title;
    ad.direction = direction;
    ad.description = description;
    ad.email = email;
    ad.phone = phone;
    ad.categorie = categorie;
    ad.web = web;
    this.upLoad(ad);
  }

  getAllCategories() {
    this.categorieSv
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  onUploadImg(event: any) {
    let image = event.target.files[0];
    this.file = image;
  }

  upLoad(ad: Ad) {
    this.adSv.onUpLoadImage(this.file, ad);
    this.adForm.reset();
  }
}
