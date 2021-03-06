import { SecurityService } from './../@core/security/security.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Favorite } from "./../model/favorite";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private angularFireStore: AngularFirestore, private securityService: SecurityService) { }
  private getFireCollectionFavorite(): AngularFirestoreCollection<Favorite> {
    return this.angularFireStore.collection<Favorite>("favorites", ref => ref.where('userId', '==', this.securityService.getUserId()));
  }

  public list(): Observable<Favorite[]> {
    return this.getFireCollectionFavorite()
      .snapshotChanges()
      .pipe(map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }));
  }

  public findOne(id: string): Observable<Favorite> {
    return this.getFireCollectionFavorite().doc<Favorite>(id).valueChanges()
      .pipe(take(1), map(favorite => {
        favorite.id = id;
        return favorite;
      }));
  }
  public create(favorite: Favorite) {
    const id = favorite.name;
    if(!favorite.rating){
      favorite.rating = 0;
      favorite.user_ratings_total= null
    }
    let photo =  this.getImagens(favorite.photos);
    const item: Favorite = {
      name: favorite.name,
      icon: favorite.icon,
      place_id: favorite.place_id,
      rating: favorite.rating,
      reference: favorite.reference,
      scope: favorite.scope,
      user_ratings_total: favorite.user_ratings_total,
      vicinity: favorite.vicinity,
      photo: photo,
      userId: this.securityService.getUserId()
    }
    this.getFireCollectionFavorite().doc(id).set(item);
  }

  public delete(id) {
    return this.getFireCollectionFavorite().doc<Favorite>(id).delete();
  }

    getImagens(imagens: any): string {
    let url: string;
    if (imagens) {
      imagens.forEach(image => {
        url = image.getUrl();
        return
      });
    }
    return url;
  }


}
