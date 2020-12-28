import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdService } from 'src/app/services/ad.service';
import { Ad } from 'src/app/Models/ad.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { FileItem } from 'src/app/Models/file-item';
import { MapsAPILoader } from '@agm/core';

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
  categories: Categorie[] = [];
  file: FileItem;

  //Mapas
  @ViewChild('search') searchElementRef: ElementRef;
  zoom = 18;
  lat = 51.678418;
  lng = 7.809007;
  latLongs: any = [];
  latLong: any = {};
  address: string;
  mapTypeId = 'hybrid';
  public searchControl: FormControl;

  adForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    direction: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    facebook: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    web: new FormControl(''),
    categorie: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    latitud: new FormControl('', [Validators.required]),
    longitud: new FormControl('', [Validators.required]),
  });

  constructor(
    private adSv: AdService,
    private categorieSv: CategoriesService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.getAllCategories();
    //load Places Autocomplete
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        { types: [], componentRestrictions: { country: 'MX' } }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.latLongs.push(this.latLong);
          this.searchControl.reset();
          // console.log(this.lat, this.lng);
        });
      });
    });
  }
  createAd() {
    const { title } = this.adForm.value;
    const { direction } = this.adForm.value;
    const { description } = this.adForm.value;
    const { facebook } = this.adForm.value;
    const { phone } = this.adForm.value;
    const { web } = this.adForm.value;
    const { categorie } = this.adForm.value;
    const { image } = this.adForm.value;
    let ad: Ad = {};
    ad.title = title;
    ad.direction = direction;
    ad.description = description;
    ad.latitud = this.lat;
    ad.longitud = this.lng;
    ad.facebook = facebook;
    ad.phone = phone;
    ad.categorie = categorie;
    ad.web = web;
    ad.vistas = 0;
    ad.banner = false;
    if (this.adForm.valid) {
      this.upLoad(ad);
    } else {
      window.alert('Formulario no valido revisa tus datos ingresado');
    }
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

  get title() {
    return this.adForm.get('title');
  }
  get categorie() {
    return this.adForm.get('categorie');
  }
  get phone() {
    return this.adForm.get('phone');
  }
  get description() {
    return this.adForm.get('description');
  }
  get latitud() {
    return this.adForm.get('latitud');
  }
  get longitud() {
    return this.adForm.get('longitud');
  }
  get image() {
    return this.adForm.get('image');
  }
  get direction() {
    return this.adForm.get('direction');
  }
}
