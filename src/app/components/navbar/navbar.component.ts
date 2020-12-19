import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Categorie } from 'src/app/Models/categorie.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import {
  faPhoneVolume,
  faUserTie,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  faPhone = faPhoneVolume;
  faUserAdmin = faUserTie;
  faHome = faHome;
  cel: number = 2235698659;
  public isLogged = false;
  public user;
  public user$: Observable<any> = this.af.user;
  categories: Categorie[] = [];

  constructor(
    private authService: AuthService,
    private af: AngularFireAuth,
    private router: Router,
    private categorieSv: CategoriesService
  ) {}

  ngOnInit() {
    this.getAllCategories();
    this.currenuser();
  }

  currenuser() {
    this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isLogged = true;
      }
    });
  }

  logout() {
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['home']);
  }

  getAllCategories() {
    this.categorieSv
      .getAllCategories()
      .subscribe((categories) => (this.categories = categories));
  }
}
