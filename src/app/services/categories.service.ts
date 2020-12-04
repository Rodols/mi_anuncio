import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Categorie } from '../Models/categorie.interface';

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

  async saveCategorie(categorie: Categorie) {
    try {
      this.categoriesCollection.add(categorie);
    } catch (error) {
      console.log(error);
    }
  }

  getCategorie(): Observable<Categorie[]> {
    this.categories = this.categoriesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Categorie;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.categories;
  }

  getAllCategories(): Observable<Categorie[]> {
    this.categories = this.categoriesCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Categorie;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    return this.categories;
  }

  async deleteCategorie(id: string) {
    try {
      return await this.categorieCollection.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }
}
