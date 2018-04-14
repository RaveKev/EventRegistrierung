import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from "../../shared/shared.module";
import {StartComponent} from "./start/start.component";
import { SeatdetailsComponent } from './seatdetails/seatdetails.component';
import { SignComponent } from './sign/sign.component';
import { OverviewComponent } from './overview/overview.component';


/* Use this routes definition in case you want to make them lazy-loaded */
const routes: Routes = [
  { path: 'start/:seminarId', component: StartComponent },
  { path: 'sign/:seminarId', component: SignComponent },

  { path: 'overview', component: OverviewComponent },
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
    // RouterModule.forChild(routes)
  ],
  declarations: [
    StartComponent,
    SeatdetailsComponent,
    SignComponent,
    OverviewComponent
  ],
  exports: [
    RouterModule
  ]
})
export class BookingModule { }
