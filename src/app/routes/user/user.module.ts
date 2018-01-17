import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {SharedModule} from "../../shared/shared.module";
import { ProfileBasicComponent } from './settings/profile-basic/profile-basic.component';
import { ProfilePasswordComponent } from './settings/profile-password/profile-password.component';
import { ProfileDeleteComponent } from './settings/profile-delete/profile-delete.component';


/* Use this routes definition in case you want to make them lazy-loaded */
const routes: Routes = [
    { path: 'settings', component: SettingsComponent },
];

@NgModule({
    imports: [
      SharedModule,
      RouterModule.forChild(routes)
        // RouterModule.forChild(routes)
    ],
    declarations: [
        SettingsComponent,
        ProfileBasicComponent,
        ProfilePasswordComponent,
        ProfileDeleteComponent
    ],
    exports: [
        RouterModule
    ]
})
export class UserModule { }
