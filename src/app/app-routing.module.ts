import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'logged-out', loadChildren: () => import('./pages/user/logged-out/logged-out.module').then(m => m.LoggedOutPageModule) },
  { path: 'login', loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginPageModule) },
  { path: 'create-login', loadChildren: () => import('./pages/user/create-login/create-login.module').then(m => m.CreateLoginPageModule) },
  { path: 'place-category', loadChildren: './pages/place/place-category/place-category.module#PlaceCategoryPageModule' },
];

const PLUGINSIONIC = [
  Geolocation
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
  providers: [PLUGINSIONIC]
})
export class AppRoutingModule { }
