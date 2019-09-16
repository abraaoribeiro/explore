import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./layout/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'logged-out', loadChildren: () => import('./pages/user/logged-out/logged-out.module').then(m => m.LoggedOutPageModule) },
  { path: 'login', loadChildren: './pages/user/login/login.module#LoginPageModule' },
  { path: 'create-login', loadChildren: './pages/user/create-login/create-login.module#CreateLoginPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
