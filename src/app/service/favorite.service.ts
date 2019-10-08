import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Favorite } from "./../model/favorite";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private angularFireStore: AngularFirestore) { }
  private getFireCollectionFavorite(): AngularFirestoreCollection<Favorite> {
    return this.angularFireStore.collection<Favorite>("favorites", ref => ref.orderBy('createDate', 'desc'));
  }
  public createFavorite(favorite:Favorite){
    const id = this.angularFireStore.createId();
    const item: Favorite = {
      name: favorite.name,
      icon: favorite.icon,
      place_id: favorite.place_id,
      rating: favorite.rating,
      reference: favorite.reference,
      scope: favorite.scope,
      user_ratings_total: favorite.user_ratings_total,
      vicinity: favorite.vicinity 
  }
  this.getFireCollectionFavorite().doc(id).set(item);
}
}
