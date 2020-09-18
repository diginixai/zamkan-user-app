import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    //loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
    //loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
    loadChildren: () => import('./boot/boot.module').then( m => m.BootPageModule)
  },
  {
    path: 'servicehomecleaning',
    loadChildren: () => import('./servicehomecleaning/servicehomecleaning.module').then( m => m.ServicehomecleaningPageModule)
  },
  {
    path: 'addresslist',
    loadChildren: () => import('./addresslist/addresslist.module').then( m => m.AddresslistPageModule)
  },
  {
    path: 'bookingreview',
    loadChildren: () => import('./bookingreview/bookingreview.module').then( m => m.BookingreviewPageModule)
  },
  {
    path: 'whatincluded',
    loadChildren: () => import('./whatincluded/whatincluded.module').then( m => m.WhatincludedPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'forgetpw',
    loadChildren: () => import('./forgetpw/forgetpw.module').then( m => m.ForgetpwPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'jobs',
    loadChildren: () => import('./jobs/jobs.module').then( m => m.JobsPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
  {
    path: 'boot',
    loadChildren: () => import('./boot/boot.module').then( m => m.BootPageModule)
  },
  {
    path: 'servicedeepcleaning',
    loadChildren: () => import('./servicedeepcleaning/servicedeepcleaning.module').then( m => m.ServicedeepcleaningPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
