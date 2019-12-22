export class Favorite {
    id?: string;
    icon?: string;
    name?: string;
    place_id?: string
    rating?: number;
    reference?: string;
    scope?: string = "GOOGLE";
    user_ratings_total?: number;
    vicinity?: number;
    userId?: string = '';
    photos?:any;
    photo?: any;
}
