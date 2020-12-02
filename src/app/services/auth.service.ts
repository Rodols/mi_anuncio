import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private af: AngularFireAuth, private router: Router) {}
  async login(email: string, password: string) {
    try {
      const result = await this.af.signInWithEmailAndPassword(email, password);
      this.router.navigate(['/home']);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, password: string) {
    try {
      const result = await this.af.createUserWithEmailAndPassword(
        email,
        password
      );
      this.router.navigate(['/home']);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      await this.af.signOut();
      this.router.navigate(['/login']);
      return;
    } catch (error) {
      console.log(error);
    }
  }
}
