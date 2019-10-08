import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Guide } from "./../model/guide";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private angularFireStore: AngularFirestore) { }
  private getFireCollectionFavorite(): AngularFirestoreCollection<Guide> {
    return this.angularFireStore.collection<Guide>("favorites", ref => ref.orderBy('createDate', 'desc'));
  }
  public createFavorite(guide:Guide){
    const id = this.angularFireStore.createId();
    const item: Guide = {
      title: guide.title,
      place: guide.place,
      date: guide.date,
      timeStart: guide.timeStart,
      timeEnd: guide.timeEnd,
      anotation: guide.anotation,
      rating: guide.rating,
      reference: guide.reference,
      createDate: guide.createDate = new Date() 
  }
  this.getFireCollectionFavorite().doc(id).set(item);
}
}
