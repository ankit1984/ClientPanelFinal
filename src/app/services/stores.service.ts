import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Stores } from '../models/Stores';

@Injectable()
export class StoresService {
  storesCollection: AngularFirestoreCollection<Stores>;
  storesDoc: AngularFirestoreDocument<Stores>;
  stores: Observable<Stores[]>;
  store: Observable<Stores>;

  constructor(private afs: AngularFirestore) {
    this.storesCollection = this.afs.collection('stores', ref => ref.orderBy('storeName', 'asc'));
   }

   getStores(): Observable<Stores[]> {
    // Get clients with the id
    this.stores = this.storesCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Stores;
        data.id = action.payload.doc.id;
        return data;
      });
    });

    return this.stores;
  }

  newStore(store: Stores) {
    this.storesCollection.add(store);
  }

  getStore(id: string): Observable<Stores>{
    this.storesDoc=this.afs.doc<Stores>(`stores/${id}`);
    this.store=this.storesDoc.snapshotChanges().map(action =>{
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Stores;
        data.id = action.payload.id;
        return data;
      }
    });
    return this.store;
  }
  updateStore(store: Stores) {
    this.storesDoc = this.afs.doc(`stores/${store.id}`);
    this.storesDoc.update(store);
  }

  deleteStore(store: Stores) {
    this.storesDoc = this.afs.doc(`stores/${store.id}`);
    this.storesDoc.delete();
  }

}
