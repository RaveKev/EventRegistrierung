import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {ParseManager} from "../../../models/ParseManager";
import {Router} from "@angular/router";
import {AlertsService} from "../../../shared/services/alerts.service";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;

  constructor(public settings: SettingsService, fb: FormBuilder, public parseManager: ParseManager, public router: Router, public alertsService: AlertsService) {
    this.parseManager.logOut();
    this.valForm = fb.group({
      'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      'password': [null, Validators.required]
    });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
      this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
      console.log('Valid!');
      console.log(value);

      event.preventDefault();

      var self = this;

      this.parseManager.logIn(value.email, value.password, function(){
        console.log("User logged in through email");
        self.router.navigate(['/home']);
      }, function(){
        self.alertsService.addAlert("Wrong user / pass", "danger", false);
      });

    }
  }

  ngOnInit() {

  }

}
