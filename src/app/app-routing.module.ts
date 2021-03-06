import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Network } from '@ionic-native/network/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

import { AuthGuard } from './@core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'logged-out', loadChildren: () => import('./pages/user/logged-out/logged-out.module').then(m => m.LoggedOutPageModule) },
  { path: 'login', loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginPageModule) },
  { path: 'create-login', loadChildren: () => import('./pages/user/create-login/create-login.module').then(m => m.CreateLoginPageModule) },
  { path: 'place-detail/:id', loadChildren: () => import('./pages/place/place-detail/place-detail.module').then(m => m.PlaceDetailPageModule) },
  { path: 'place-list', loadChildren: () => import('./pages/place/place-list/place-list.module').then(m => m.PlaceListPageModule) },
  { path: 'place-category', loadChildren: () => import('./pages/place/place-category/place-category.module').then(m => m.PlaceCategoryPageModule) },
  { path: 'guide-edit', loadChildren: () => import('./pages/guide/guide-edit/guide-edit.module').then(m => m.GuideEditPageModule) },
  { path: 'guide-edit/:id', loadChildren: () => import('./pages/guide/guide-edit/guide-edit.module').then(m => m.GuideEditPageModule) },

];

const PLUGINSIONIC = [
  LocalNotifications,
  AndroidPermissions,
  Geolocation,
  DatePicker,
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
