import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateComponent} from "./create/create.component";
import {SharedModule} from "../../shared/shared.module";
import {DateTimePickerModule} from "ng-pick-datetime";
import { OverviewComponent } from './overview/overview.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarElementComponent } from './calendar/calendar-element/calendar-element.component';
import { SeminarTableComponent } from './overview/seminar-table/seminar-table.component';
import { SeminarFilterPipe } from "../../pipes/seminar-filter.pipe";
import { DetailsComponent } from './details/details.component';
import {CategoryFilterPipe} from "../../pipes/category-filter.pipe";
/* Use this routes definition in case you want to make them lazy-loaded */
const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'calendar', component: CalendarComponent},
  { path: 'details/:seminarId', component: DetailsComponent},
  { path: 'create/:seminarId', component: CreateComponent},
];

@NgModule({
    imports: [
      SharedModule,

      DateTimePickerModule,
      RouterModule.forChild(routes)
        // RouterModule.forChild(routes)
    ],
    declarations: [
        CreateComponent,
        OverviewComponent,
        CalendarComponent,
        CalendarElementComponent,
        SeminarTableComponent,
        SeminarFilterPipe,
        CategoryFilterPipe,
        DetailsComponent,
    ],
    exports: [
        RouterModule,
        DateTimePickerModule
    ]
})
export class SeminarsModule { }
