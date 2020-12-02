import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isLogged = false;
  public user;
  public user$: Observable<any> = this.af.user;

  constructor(private authService: AuthService, private af: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.user$.subscribe(user => {
      if (user) {
        this.user = user;
        this.isLogged = true;
      }
    });
  }

  Logout(){
    this.authService.logout();
    this.isLogged = false;
    this.router.navigate(['home']);
  }

}
