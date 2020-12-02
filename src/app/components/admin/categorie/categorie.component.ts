import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css'],
})
export class CategorieComponent implements OnInit {
  categorieForm = new FormGroup({
    categorie: new FormControl(''),
  });

  constructor(private categorieSv: CategoriesService) {}

  ngOnInit() {
    this.getAllCategories();
  }

  createCategorie() {
    const { categorie } = this.categorieForm.value;
    this.categorieSv.saveCategorie(categorie);
  }

  getAllCategories() {
    this.categorieSv
      .getAllCategories()
      .subscribe((categorie) => console.log(categorie));
  }
}
