import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  faPhoneVolume,
  faUserTie,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Categorie } from 'src/app/Models/categorie.interface';
import { AdService } from 'src/app/services/ad.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-navbar-simple',
  templateUrl: './navbar-simple.component.html',
  styleUrls: ['./navbar-simple.component.css'],
})
export class NavbarSimpleComponent implements OnInit {
  faPhone = faPhoneVolume;
  faUserAdmin = faUserTie;
  faHome = faHome;
  cel: number = 2235698659;
  public isLogged = false;
  public isAdmin = false;
  public user;
  title: string = '';
  public user$: Observable<any> = this.af.user;
  categories: Categorie[] = [];

  constructor(
    private authService: AuthService,
    private af: AngularFireAuth,
    private router: Router,
    private categorieSv: CategoriesService,
    private adSvc: AdService
  ) {}

  ngOnInit() {
    this.getAllCategories();
    this.currenuser();
  }

  currenuser() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.isLogged = true;
        this.isAdmin = this.authService.isAdmin(user);
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

  search(title: string) {
    this.adSvc.searchTitle(this.title);
  }
}
