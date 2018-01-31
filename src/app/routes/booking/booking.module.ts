import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from "../../shared/shared.module";
import {StartComponent} from "./start/start.component";
import { SeatdetailsComponent } from './seatdetails/seatdetails.component';


/* Use this routes definition in case you want to make them lazy-loaded */
const routes: Routes = [
  { path: 'start/:seminarId', component: StartComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
    // RouterModule.forChild(routes)
  ],
  declarations: [
    StartComponent,
    SeatdetailsComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BookingModule { }
