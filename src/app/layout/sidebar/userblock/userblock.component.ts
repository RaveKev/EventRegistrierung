import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';
import {ParseManager} from "../../../models/ParseManager";
import {User} from "../../../models/user-model";


@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    constructor(public userblockService: UserblockService, public parseManager:ParseManager) {

        this.user = parseManager.currentUser();
        if(this.user == null){
          return;
        }
        console.log(this.user);
        this.user.picture = 'assets/img/user/01.jpg';
    }

    ngOnInit() {
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

}
