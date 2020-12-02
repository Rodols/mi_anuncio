import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export interface Categorie {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories: Observable<Categorie[]>;
  public categorie: Observable<Categorie[]>;
  private categoriesCollection: AngularFirestoreCollection<Categorie>;
  private categorieCollection: AngularFirestoreCollection<Categorie>;

  constructor(private afs: AngularFirestore) {
    this.categorieCollection = afs.collection<Categorie>('categories');
    this.categoriesCollection = afs.collection<Categorie>('categories');
  }

  saveCategorie(name: string) {
    const id = this.afs.createId();
    const categ: Categorie = { id, name };
    this.categoriesCollection.add(categ).then(() => {
      alert('Alerta guardada');
    });
  }

  getCategorie(): Observable<Categorie[]> {
    this.categorie = this.categorieCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Categorie;
          return data;
        })
      )
    );
    return this.categorie;
  }

  getAllCategories(): Observable<Categorie[]> {
    this.categories = this.categoriesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Categorie;
          return data;
        })
      )
    );
    return this.categories;
  }
}
