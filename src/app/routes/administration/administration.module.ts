import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from "./categories/categories.component";
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";

/* Use this routes definition in case you want to make them lazy-loaded */
const routes: Routes = [
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    CategoriesComponent
  ],
  exports: [
    RouterModule,
  ]
})
export class AdministrationModule { }
