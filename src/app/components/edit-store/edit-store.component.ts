import { Component, OnInit } from '@angular/core';
import { Stores } from '../../models/Stores';
import { StoresService } from '../../services/stores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css']
})
export class EditStoreComponent implements OnInit {

  id: string;
  selectedcityList: Array<string> = [];
  cityList: any;
  stateList: any;
  itemTypeList: any;
  isTnCAccepted : boolean = true;
  isCitySelected: boolean = true;
  selectedItemTypeList: Array<string> = [];

  store: Stores = {
    storeName: '',
    phone: '',
    address: '',
    state: '',
    city: [],
    storeType: '',
    itemType: [],
    remark:''
  }

  constructor(
    private storesService: StoresService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {

    this.stateList=[{id:'1',name:'UP'},{id:'2',name:'MP'},{id:'3',name:'Delhi'}];
    this.cityList=[{id:'1',name:'Kanpur'},{id:'2',name:'Noida'},{id:'3',name:'Meerut'},{id:'4',name:'Delhi'},{id:'5',name:'Bhopal'},{id:'6',name:'Gwalior'}]
    this.itemTypeList=[{id:'1',name:'Garments'},{id:'2',name:'Cosmatic'},{id:'3',name:'Grocery'}];
    
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get Store
    this.storesService.getStore(this.id).subscribe(store => this.store=store);
    
  }

  onSubmit({value}:{value:Stores}){
    
    //console.log(value);
    // Add id to store
    value.id = this.id;
    value.itemType = this.selectedItemTypeList;
    this.storesService.updateStore(value);
    this.flashMessage.show('Storee updated', {
      cssClass: 'alert-success', timeout: 4000
    });

    this.router.navigate(['/stores/store/'+this.id]);    
  }

  onChange(name: string,isChecked:boolean){
    //const itemTypeNameArray=this.selectedItemTypeList;
    if(isChecked)
    {
      //console.dir("Add in array array");
      //console.dir(name);
      this.selectedItemTypeList.push(name);
      //console.dir(this.selectedItemTypeList);
    }
    else{
      
      let index=this.selectedItemTypeList.findIndex(x => x == name);
      //console.dir("Remove from array" + index);
      this.selectedItemTypeList.splice(index,1);
      //console.dir(this.selectedItemTypeList);
    }
  }

  onCitySelect(name: string,isCitySelected:boolean)
  {
    console.dir(name);
    if(isCitySelected)
    {
      this.selectedcityList.push(name);
    }
    else
    {
      let index=this.selectedcityList.findIndex(x => x == name);
      this.selectedcityList.splice(index,1);
    }
  }
}
