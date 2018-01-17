import {Component, OnInit, Input} from '@angular/core';
import {ParseManager} from "../../../../models/ParseManager";
import {LogService} from "../../../../shared/services/log.service";

@Component({
  selector: 'app-profile-basic',
  templateUrl: './profile-basic.component.html',
  styleUrls: ['./profile-basic.component.scss']
})
export class ProfileBasicComponent implements OnInit {

  salutations = ["Frau", "Herr"];
  salutation : string;

  @Input() profile;
  constructor(private logService:LogService, private parseManager: ParseManager ) { }

  ngOnInit() {
  }

  refreshValue(sal){
    this.salutation = sal;
  }

  updateProfile(){
    this.parseManager.updateProfile(this.profile);
  }

}
