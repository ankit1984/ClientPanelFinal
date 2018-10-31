import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { Stores } from '../../models/Stores';
@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  stores: Stores[];
  constructor(private storeService: StoresService) { }

  ngOnInit() {
    this.storeService.getStores().subscribe(stores => {
      this.stores = stores;
      //this.getTotalOwed();
    });
  }



}
