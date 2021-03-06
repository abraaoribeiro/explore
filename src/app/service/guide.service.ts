import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { map, take } from "rxjs/operators";

import { Guide } from "./../model/guide";
import { SecurityService } from '../@core/security/security.service';


@Injectable({
  providedIn: 'root'
})
export class GuideService {
  guide: Guide = new Guide();
  constructor(private angularFireStore: AngularFirestore, private securityService : SecurityService) { }

  private getFireCollection(): AngularFirestoreCollection<Guide> {
    return this.angularFireStore.collection<Guide>("guides", ref =>
      ref.where('userId', '==', this.securityService.getUserId()));
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
      }));
  }


  public findOne(id: string): Observable<Guide> {
    return this.getFireCollection().doc<Guide>(id).valueChanges()
      .pipe(take(1), map(guide => {
        guide.id = id;
        return guide;
      }));
  }

  public create(guide: Guide) {
   this.getFireCollection().add({
    place_id: guide.place_id, 
    title: guide.title,
     place: guide.place,
     date: guide.date,
     timeStart: guide.timeStart,
     timeEnd: guide.timeEnd,
     anotation: guide.anotation,
     rating: guide.rating,
     reference: guide.reference,
     createDate: guide.createDate = new Date(),
     userId: this.securityService.getUserId()
   });
  }

  public update(guide: Guide): Promise<void> {
    return this.getFireCollection().doc(guide.id)
      .update({
        title: guide.title,
        place: guide.place,
        date: guide.date,
        timeStart: guide.timeStart,
        timeEnd: guide.timeEnd,
        anotation: guide.anotation,
      });
  }


  public delete(id) {
    return this.getFireCollection().doc<Guide>(id).delete();
  }

  public formatDateFirestore(date: any) {
    return new Date(date.seconds * 1000);
  }

}
