import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Ad } from 'src/app/Models/ad.interface';

@Injectable({
  providedIn: 'root',
})
export class AdService {
  public ads: Observable<Ad[]>;
  public ad: Observable<Ad[]>;
  private alertsCollection: AngularFirestoreCollection<Ad>;
  private alertCollection: AngularFirestoreCollection<Ad>;
  constructor(private afs: AngularFirestore) {
    this.alertCollection = afs.collection<Ad>('ads', (ref) =>
      ref.orderBy('dateCreated', 'desc')
    );
    this.alertsCollection = afs.collection<Ad>('ads');
  }

  saveAd(adData: Ad) {
    const date = new Date();
    const time = date.getTime();
    adData.dateCreated = time;
    this.alertsCollection.add(adData).then(() => {
      alert('Anuncio guardado');
    });
  }

  getAd(): Observable<Ad[]> {
    this.ad = this.alertCollection.snapshotChanges().pipe(
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
    this.ads = this.alertsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Ad;
          return data;
        })
      )
    );
    return this.ads;
  }
}
