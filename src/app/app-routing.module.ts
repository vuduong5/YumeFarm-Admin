import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { TypeComponent } from "./type/type.component";
import { ProductComponent } from "./product/product.component";
import { ErrorComponent } from "./error/error.component";

const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path:'home', component: HomeComponent},
  { path:'type', component: TypeComponent},
  { path:'product', component: ProductComponent},
  { path:'**', component: ErrorComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
