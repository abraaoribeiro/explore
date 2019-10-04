import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
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

 public list(): Observable<Guide[]> {
    return this.getFireCollection()
      .snapshotChanges()
      .pipe(map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public create(guide: Guide) {
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
    this.getFireCollection().doc(id).set(item);
  }

}
