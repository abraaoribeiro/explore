import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Network } from '@ionic-native/network/ngx';
import { StarRating } from 'ionic4-star-rating';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'logged-out', loadChildren: () => import('./pages/user/logged-out/logged-out.module').then(m => m.LoggedOutPageModule) },
  { path: 'login', loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginPageModule) },
  { path: 'create-login', loadChildren: () => import('./pages/user/create-login/create-login.module').then(m => m.CreateLoginPageModule) },
  { path: 'place-detail/:id', loadChildren: () => import('./pages/place/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule) },
  { path: 'place-list/:type', loadChildren: './pages/place/place-list/place-list.module#PlaceListPageModule' },
];

const PLUGINSIONIC = [
  Geolocation,
  AndroidPermissions,
  Network
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [PLUGINSIONIC]
})
export class AppRoutingModule { }
