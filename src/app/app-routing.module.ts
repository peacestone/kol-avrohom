import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home/:segment', loadChildren: './home/home.module#HomePageModule' },
  { path: 'tractate/:name', loadChildren: './tractate/tractate.module#TractatePageModule' },
  { path: 'tractate/:name/:pageNumber', loadChildren: './tractate/tractate.module#TractatePageModule' },
  { path: 'tractates/:seder', loadChildren: './tractates/tractates.module#TractatesPageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'phone-numbers', loadChildren: './phone-numbers/phone-numbers.module#PhoneNumbersPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
