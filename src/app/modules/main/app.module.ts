import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import 'reflect-metadata';
import { IconService } from 'src/app/services/icon.service';
import { environment } from 'src/environments/environment';
import { AccountModule } from '../account/account.module';
import { CheckoutModule } from '../checkout/checkout.module';
import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { HomeModule } from '../home/home.module';
import { SharedModule } from '../shared/shared.module';
import { ShopModule } from '../shop/shop.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteManagementService } from './route-management.service';
import { AppReducer } from './store/app.reducer';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    ShopModule,
    CheckoutModule,
    AccountModule,
    AppRoutingModule,
    FontAwesomeModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    SharedModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    {
      provide: SETTINGS,
      useValue: environment.production ? undefined : {
        host: 'localhost:3200',
        ssl: false
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private iconLiberary: FaIconLibrary,
    private iconService: IconService,
    private rmgtService: RouteManagementService
  ) {
    iconLiberary.addIcons(...iconService.getImportedIcons());
  }
}
