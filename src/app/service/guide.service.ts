import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Guide } from "./../model/guide";


@Injectable({
  providedIn: 'root'
})
export class GuideService {
  guide: Guide = new Guide();
  constructor(private angularFireStore: AngularFirestore) { }

  private getFireCollection(): AngularFirestoreCollection<Guide> {
    return this.angularFireStore.collection<Guide>("guide");
  }

  create(guide: Guide) {
    const id = this.angularFireStore.createId();
    const item: Guide = {
      title: guide.title,
      place: guide.place,
      date: guide.date,
      timeStart: guide.timeStart,
      timeEnd: guide.timeEnd,
      anotation: guide.anotation,
      rating: guide.rating,
      reference: guide.reference
    }
    this.getFireCollection()
      .doc(id)
      .set(item);
  }

}
