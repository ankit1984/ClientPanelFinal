import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Stores } from '../../models/Stores';
import { StoresService } from '../../services/stores.service';
import { Router } from '@angular/router';
import { FormArray, FormControl, Validators, FormGroup } from '@angular/Forms';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {
  
   //stateList: [] = ["{1: 'UP'}","{2: 'MP'}"];

    
   // {1: "UP", 2: "MP", 3: "Delhi"};
   //stateList: string[] = ["UP", "MP", "DELHI"];
   selectedcityList: Array<string> = [];
   cityList: any;
   stateList: any;
   itemTypeList: any;
   isTnCAccepted : boolean = false;
   isCitySelected: boolean = false;
   //selectedItemTypeList: string = [];
   //var selectedItemTypeList: any[];
   selectedItemTypeList: Array<string> = [];

   //selectedState: Object ='';

  //selectChangeHandler(event: any)
  //{
    //this.selectedState=event.target.value;
  //}  
 

  store: Stores = {
    storeName: '',
    phone: '',
    address: '',
    //state: this.selectedState,
    state: '',
    city: [],
    storeType: '',
    itemType: [],
    remark:''
  }

  
  constructor(
    private flashMessage: FlashMessagesService,
    private storeService: StoresService,
    private router: Router,
    
  ) {}

  ngOnInit() {
    
    this.stateList=[{id:'1',name:'UP'},{id:'2',name:'MP'},{id:'3',name:'Delhi'}];
    this.cityList=[{id:'1',name:'Kanpur'},{id:'2',name:'Noida'},{id:'3',name:'Meerut'},{id:'4',name:'Delhi'},{id:'5',name:'Bhopal'},{id:'6',name:'Gwalior'}]
    this.itemTypeList=[{id:'1',name:'Garments'},{id:'2',name:'Cosmatic'},{id:'3',name:'Grocery'}];
  }
  /* onSubmit({Value}:{Value:Stores}){
    //console.log('aaaaa');
    this.storeService.newStore(Value);
    this.flashMessage.show('New stores added', {
      cssClass: 'alert-success', timeout: 4000
    });

    this.router.navigate(['/stores']);
  } */

  onSubmit({value}:{value:Stores}){
    value.itemType = this.selectedItemTypeList;
    console.log(value);
     if(this.isTnCAccepted) {
      this.storeService.newStore(value);
      this.flashMessage.show('New stores added', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/stores']);
    } else {
      this.flashMessage.show('Please accept the terms and conditions to continue.', {
        cssClass: 'alert-danger', timeout: 40000
      });
    } 

  }

 ontNcChanged(isChecked:boolean) {
    if (isChecked) {
      this.isTnCAccepted = true;
    } else {
      this.isTnCAccepted = false;
    }
 }

 numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

  onChange(name: string,isChecked:boolean){
    //const itemTypeNameArray=this.selectedItemTypeList;
    if(isChecked)
    {
      //console.dir("Add in array array");
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
