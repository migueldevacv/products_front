import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
// import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent }
    ]
  },
  // { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
