import { Component, OnInit } from '@angular/core';
import { StoresService } from '../../services/stores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Stores } from '../../models/Stores';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {

  id: string;
  stores: Stores;

  constructor(
    private storesService: StoresService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get Stores
    this.storesService.getStore(this.id).subscribe(stores =>{
        this.stores=stores;
    })
  }

  onDeleteClick(){
    if(confirm('Are you sure,you want to delete')){
      this.storesService.deleteStore(this.stores);
      this.flashMessage.show('Store removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/stores']);
    }
  }

}
