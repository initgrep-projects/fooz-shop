import { Component, OnInit } from '@angular/core';
import { FireStoreDbService } from './services/firestore.db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'foozshop';

  constructor(private fireStoreDbService: FireStoreDbService) { }

  ngOnInit(): void {
    this.fireStoreDbService.getProducts()
    .subscribe(ps => console.log('products = ', ps[0].category.getCode()));
  }


}
