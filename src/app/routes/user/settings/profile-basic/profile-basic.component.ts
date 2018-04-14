import {Component, OnInit, Input} from '@angular/core';
import {ParseManager} from "../../../../models/ParseManager";
import {LogService} from "../../../../shared/services/log.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';

@Component({
  selector: 'app-profile-basic',
  templateUrl: './profile-basic.component.html',
  styleUrls: ['./profile-basic.component.scss']
})
export class ProfileBasicComponent implements OnInit {
  creationFormGroup: FormGroup;

  salutation : string;

  action = "create";
  image: any;

  profile: any;

  toasterconfig: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-bottom-right',
    showCloseButton: true
  });

  constructor(private logService:LogService, public fb: FormBuilder, private parseManager: ParseManager, public toasterService: ToasterService ) { }

  ngOnInit() {

    console.log("ngOnInit");
    this.creationFormGroup = this.fb.group({
      'id': [null],
      'salutation': [null],
      'firstName': [null],
      'lastName': [null],
      'url': [null],
      'company': [null],
      'city': [null],
      'image': [null]
    });
  }


  ngAfterContentInit(){
    console.log("ngAfterContentInit");
    var self = this;
    this.profile = this.parseManager.profileGetForCurrentUser().then(
      function success(prof){
        if(prof != null && prof != undefined){
          self.action = "update";
          console.log(self.action);
          self.creationFormGroup.patchValue({'id': prof.id});
          self.creationFormGroup.patchValue({'salutation': prof.get("salutation")});
          self.creationFormGroup.patchValue({'firstName': prof.attributes.firstName});
          self.creationFormGroup.patchValue({'lastName': prof.attributes.lastName});
          self.creationFormGroup.patchValue({'url': prof.get("url")});
          self.creationFormGroup.patchValue({'company': prof.get("company")});
          self.creationFormGroup.patchValue({'city': prof.get("city")});
          self.image = self.parseManager.currentUser().picture;
          self.creationFormGroup.patchValue({'picture': self.image});

        }
        else{
          console.log("No Profile Found!");
        }
      }
    );
  }

  onImageCropped(img: any){
    this.image = img;
    this.creationFormGroup.patchValue({image: img});
  }

  refreshValue(sal){
    this.salutation = sal;
  }

  onSubmit(){
    var self = this;
    if (this.creationFormGroup.valid) {
      var fields = this.creationFormGroup.value;
      this.logService.log("Form is vail!");

      this.parseManager.updateProfile(fields)
        .then(function (seminar){
            self.logService.log("Erstellt!");
            self.toasterService.pop("success", "Speichern", "Profil erfolgreich gespeichert");
          },
          function(error, seminar){
            console.log(error);
            self.toasterService.pop("danger", "Speichern", "Fehler beim Speichern: " + error);
          }
        );

    }
  }

}
