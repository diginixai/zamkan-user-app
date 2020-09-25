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
  },
  {
    path: 'accountprofileedit',
    loadChildren: () => import('./accountprofileedit/accountprofileedit.module').then( m => m.AccountprofileeditPageModule)
  },
  {
    path: 'accountchangepw',
    loadChildren: () => import('./accountchangepw/accountchangepw.module').then( m => m.AccountchangepwPageModule)
  },
  {
    path: 'accountaddressmanage',
    loadChildren: () => import('./accountaddressmanage/accountaddressmanage.module').then( m => m.AccountaddressmanagePageModule)
  },
  {
    path: 'servicewatertankcleaning',
    loadChildren: () => import('./servicewatertankcleaning/servicewatertankcleaning.module').then( m => m.ServicewatertankcleaningPageModule)
  },
  {
    path: 'servicemovingmyhome',
    loadChildren: () => import('./servicemovingmyhome/servicemovingmyhome.module').then( m => m.ServicemovingmyhomePageModule)
  },
  {
    path: 'servicesanitization',
    loadChildren: () => import('./servicesanitization/servicesanitization.module').then( m => m.ServicesanitizationPageModule)
  },
  {
    path: 'servicehandyman',
    loadChildren: () => import('./servicehandyman/servicehandyman.module').then( m => m.ServicehandymanPageModule)
  },
  {
    path: 'servicebookatruck',
    loadChildren: () => import('./servicebookatruck/servicebookatruck.module').then( m => m.ServicebookatruckPageModule)
  },
  // {
  //   path: 'servicemovinginternationally',
  //   loadChildren: () => import('./servicemovinginternationally/servicemovinginternationally.module').then( m => m.ServicemovinginternationallyPageModule)
  // },
  {
    path: 'servicestorage',
    loadChildren: () => import('./servicestorage/servicestorage.module').then( m => m.ServicestoragePageModule)
  },
  {
    path: 'servicemoveinpainting',
    loadChildren: () => import('./servicemoveinpainting/servicemoveinpainting.module').then( m => m.ServicemoveinpaintingPageModule)
  },
  {
    path: 'servicepaintingcustom',
    loadChildren: () => import('./servicepaintingcustom/servicepaintingcustom.module').then( m => m.ServicepaintingcustomPageModule)
  },
  {
    path: 'bookingdetail',
    loadChildren: () => import('./bookingdetail/bookingdetail.module').then( m => m.BookingdetailPageModule)
  },
  {
    path: 'bookingupdate',
    loadChildren: () => import('./bookingupdate/bookingupdate.module').then( m => m.BookingupdatePageModule)
  },
  {
    path: 'servicecarpetcleaning',
    loadChildren: () => import('./servicecarpetcleaning/servicecarpetcleaning.module').then( m => m.ServicecarpetcleaningPageModule)
  },
  {
    path: 'servicesofacleaning',
    loadChildren: () => import('./servicesofacleaning/servicesofacleaning.module').then( m => m.ServicesofacleaningPageModule)
  },
  {
    path: 'servicemattresscleaning',
    loadChildren: () => import('./servicemattresscleaning/servicemattresscleaning.module').then( m => m.ServicemattresscleaningPageModule)
  },
  {
    path: 'servicepestcontrol',
    loadChildren: () => import('./servicepestcontrol/servicepestcontrol.module').then( m => m.ServicepestcontrolPageModule)
  },



    {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then( m => m.ShopPageModule)
  },
  {
    path: 'shop-category-filter',
    loadChildren: () => import('./shop-category-filter/shop-category-filter.module').then( m => m.ShopCategoryFilterPageModule)
  },
  {
    path: 'product-detail/:id',
    loadChildren: () => import('./shop-product-detail/shop-product-detail.module').then( m => m.ShopProductDetailPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./shop-cart/shop-cart.module').then( m => m.ShopCartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./shop-checkout/shop-checkout.module').then( m => m.ShopCheckoutPageModule)
  },
  {
    path: 'orderhistory',
    loadChildren: () => import('./shop-orderhistory/shop-orderhistory.module').then( m => m.ShopOrderhistoryPageModule)
  },
  {
    path: 'serviceappliancerepair',
    loadChildren: () => import('./serviceappliancerepair/serviceappliancerepair.module').then( m => m.ServiceappliancerepairPageModule)
  },
  {
    path: 'servicemoveinternational',
    loadChildren: () => import('./servicemoveinternational/servicemoveinternational.module').then( m => m.ServicemoveinternationalPageModule)
  },
  {
    path: 'orderdetail/:id',
    loadChildren: () => import('./shop-order-detail/shop-order-detail.module').then( m => m.ShopOrderDetailPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
