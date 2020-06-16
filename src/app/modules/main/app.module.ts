import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule} from '@ngrx/store';
import { AppReducer } from './store/app.reducer';
import 'reflect-metadata';

import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconService } from 'src/app/services/icon.service';

import { AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from '../header/header.module';
import { FooterModule } from '../footer/footer.module';
import { HomeModule } from '../home/home.module';
import { ShopModule } from '../shop/shop.module';
import { SharedModule } from '../shared/shared.module';
import { CheckoutModule } from '../checkout/checkout.module';
import { AccountModule } from '../account/account.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    ShopModule,
    CheckoutModule,
    AccountModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot(AppReducer),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(iconLiberary: FaIconLibrary, iconService: IconService) {
    iconLiberary.addIcons(...iconService.getImportedIcons());
  }
}
