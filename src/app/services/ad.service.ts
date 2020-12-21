import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { finalize, map } from 'rxjs/operators';
import { Ad } from 'src/app/Models/ad.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileItem } from '../Models/file-item';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  public lastetAds: Observable<Ad[]>;
  public mostSeenAds: Observable<Ad[]>;
  public bannersAds: Observable<Ad[]>;
  public ads: Observable<Ad[]>;
  public ad: Observable<Ad[]>;
  private adsCollection: AngularFirestoreCollection<Ad>;
  private mostSeenAdsCollection: AngularFirestoreCollection<Ad>;
  private bannersAdsCollection: AngularFirestoreCollection<Ad>;
  private adCollection: AngularFirestoreCollection<Ad>;
  private MEDIA_STORAGE_PATH = 'ImagesAds';
  title: string = '';
  private searchTitleSubject = new Subject<string>();
  searchTitleObservable = this.searchTitleSubject.asObservable();
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.adsCollection = afs.collection<Ad>('ads');
    this.mostSeenAdsCollection = afs.collection<Ad>('ads');
    this.bannersAdsCollection = afs.collection<Ad>('ads');
    this.adCollection = afs.collection<Ad>('ads');
  }

  private generateFilename(name: string): string {
    return `${this.MEDIA_STORAGE_PATH}/${new Date().getTime()}_${name}`;
  }

  onUpLoadImage(file: FileItem, ad: Ad) {
    file.uploading = true;

    const filepath = this.generateFilename(file.name);
    const fileRef = this.storage.ref(filepath);
    const task = this.storage.upload(filepath, file);

    file.uploadPercent = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          file.downloadURL = fileRef.getDownloadURL();
          file.uploading = false;
          fileRef.getDownloadURL().subscribe((urlImage) => {
            if (urlImage) {
              file.uploading = false;
              ad.imageUrl = urlImage.toString();
              ad.image = filepath;
              this.saveAd(ad);
            }
          });
        })
      )
      .subscribe();
  }

  saveAd(adData: Ad) {
    const date = new Date();
    const time = date.getTime();
    adData.dateCreated = time;
    this.adsCollection.add(adData);
  }

  getAd(): Observable<Ad[]> {
    this.ad = this.adCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Ad;
          return data;
        })
      )
    );
    return this.ad;
  }

  getAllAds(): Observable<Ad[]> {
    this.adsCollection = this.afs.collection<Ad>('ads', (ref) =>
      ref.orderBy('title', 'asc')
    );
    this.ads = this.adsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Ad;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.ads;
  }

  getLastetAds(): Observable<Ad[]> {
    this.adsCollection = this.afs.collection<Ad>('ads', (ref) =>
      ref.orderBy('dateCreated', 'desc').limit(10)
    );
    this.lastetAds = this.adsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Ad;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.lastetAds;
  }

  getMostSeenAds(): Observable<Ad[]> {
    this.mostSeenAdsCollection = this.afs.collection<Ad>('ads', (ref) =>
      ref.where('vistas', '>', 0).orderBy('vistas', 'desc').limit(10)
    );
    this.mostSeenAds = this.mostSeenAdsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Ad;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.mostSeenAds;
  }

  getBannersAds(): Observable<Ad[]> {
    this.bannersAdsCollection = this.afs.collection<Ad>('ads', (ref) =>
      ref.where('banner', '==', true)
    );
    this.bannersAds = this.bannersAdsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Ad;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.bannersAds;
  }

  getCategorie(categorie: string): Observable<Ad[]> {
    this.adsCollection = this.afs.collection<Ad>('ads', (ref) =>
      ref.where('categorie', '==', categorie)
    );
    this.ads = this.adsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Ad;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.ads;
  }

  deleteAd(ad: Ad) {
    return this.adCollection
      .doc(ad.id)
      .delete()
      .then(() => this.deleteImageAd(ad));
  }

  deleteImageAd(ad: Ad) {
    const storeRef = this.storage.ref(ad.image);
    return storeRef.delete();
  }

  updateVistas(ad: Ad) {
    console.log(ad.vistas);
    return this.afs.doc(`ads/${ad.id}`).update({ vistas: ad.vistas + 1 });
  }

  updateBannerState(ad: Ad) {
    return this.afs.doc(`ads/${ad.id}`).update({ banner: !ad.banner });
  }

  searchTitle(title: string) {
    this.searchTitleSubject.next(title);
  }
}
