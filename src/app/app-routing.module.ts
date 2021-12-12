import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { TypeComponent } from "./type/type.component";
import { ProductComponent } from "./product/product.component";
import { ErrorComponent } from "./error/error.component";
import { CreateComponent } from "./product/create/create.component";
import { EditComponent } from "./product/edit/edit.component";
import { ListComponent } from "./product/list/list.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'type', component: TypeComponent },
  {
    path: 'product', component: ProductComponent,
    children: [
      {
        path: 'create', // child route path
        component: CreateComponent, // child route component that the router renders
      },
      {
        path: 'edit/:id',
        component: EditComponent, // another child route component that the router renders
      },
      {
        path: '',
        component: ListComponent
      }
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
