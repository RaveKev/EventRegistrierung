import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslatorService } from '../core/translator/translator.service';
import { MenuService } from '../core/menu/menu.service';
import { SharedModule } from '../shared/shared.module';
import { PagesModule } from './pages/pages.module';

import { menu } from './menu';
import { routes } from './routes';
import {AlertsService} from "../shared/services/alerts.service";
import {UserModule} from "./user/user.module";
import {SeminarsModule} from "./seminars/seminars.module";
import {BookingModule} from "./booking/booking.module";
import {AdministrationModule} from "./administration/administration.module";
import { SelectModule } from 'ng2-select';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        PagesModule,
        SeminarsModule,
        UserModule,
        BookingModule,
        AdministrationModule,
    ],
    declarations: [ ],
    exports: [
        RouterModule
    ],
    providers: [AlertsService]
})

export class RoutesModule {
    constructor(public menuService: MenuService, tr: TranslatorService) {
        menuService.addMenu(menu);
    }
}
