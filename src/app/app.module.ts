import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AdsComponent } from './components/ads/ads.component';
import { AdComponent } from './components/admin/ad/ad.component';
import { CategorieComponent } from './components/admin/categorie/categorie.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdsListComponent } from './components/admin/ads-list/ads-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CategoriesComponent } from './components/categories/categories.component';
import { AuthService } from './services/auth.service';
import { CanAdminGuard } from './guards/can-admin.guard';
import { FilterAdsPipe } from './pipes/filter-ads.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    AdsComponent,
    CategorieComponent,
    AdminComponent,
    AdComponent,
    AdsListComponent,
    CategoriesComponent,
    FilterAdsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxAyJCf9jUCg-jcRrxGt8cy2ja5VEYZyM',
      libraries: ['places'],
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    GoogleMapsModule,
  ],
  providers: [AuthService, CanAdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
