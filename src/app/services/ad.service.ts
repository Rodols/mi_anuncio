import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  public ads: Observable<Ad[]>;
  public ad: Observable<Ad[]>;
  private adsCollection: AngularFirestoreCollection<Ad>;
  private adCollection: AngularFirestoreCollection<Ad>;
  private MEDIA_STORAGE_PATH = 'ImagesAds';
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.adCollection = afs.collection<Ad>('ads', (ref) =>
      ref.orderBy('dateCreated', 'desc')
    );
    this.adsCollection = afs.collection<Ad>('ads');
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
}
