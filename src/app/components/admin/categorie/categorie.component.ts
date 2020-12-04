import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Categorie } from 'src/app/Models/categorie.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  categories: Categorie[];

  categorieForm = new FormGroup({
    categorie: new FormControl(''),
  });

  constructor(private categorieSv: CategoriesService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  createCategorie() {
    const { categorie } = this.categorieForm.value;
    let categ: Categorie = {};
    categ.name = categorie;
    this.categorieSv.saveCategorie(categ).then(() => {
      alert('Categoria guardada');
      this.categorieForm.reset();
    });
  }

  getAllCategories() {
    this.categorieSv
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  categorieDelete(categorie) {
    const eliminar = confirm('Seguro que deseas eliminar la categoria');
    if (eliminar) {
      this.categorieSv.deleteCategorie(categorie.id);
    }
  }
}
