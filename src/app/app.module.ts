import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ItemCouroselComponent } from './item-courosel/item-courosel.component';
import { ItemsComponent } from './items/items.component';


import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faUpload,
  faDownload,
  faChevronRight,
  faChevronDown,
  faChevronLeft,
  faChevronCircleUp,
  faList,
  faSearch,
  faFileWord,
  faFilePdf,
  faFileExcel,
  faFilePowerpoint,
  faFileAlt,
  faEnvelope,
  faCircleNotch,
  faSpinner

} from '@fortawesome/free-solid-svg-icons';
import { TrendComponent } from './trend/trend.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ItemCouroselComponent,
    ItemsComponent,
    TrendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(iconLiberary: FaIconLibrary) {
    iconLiberary.addIcons(
      faUpload,
      faDownload,
      faChevronRight,
      faChevronDown,
      faChevronLeft,
      faChevronCircleUp,
      faList,
      faSearch,
      faFileWord,
      faFilePdf,
      faFileExcel,
      faFilePowerpoint,
      faFileAlt,
      faEnvelope,
      faCircleNotch,
      faSpinner
    );
  }

 }
