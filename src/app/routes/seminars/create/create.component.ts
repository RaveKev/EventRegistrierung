import { Component, OnInit } from '@angular/core';
import {LogService} from "../../../shared/services/log.service";
import {Seminar} from "../../../models/seminar-model";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {ParseManager} from "../../../models/ParseManager";
import {CategoriesService} from "../../../shared/services/categories.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsersService} from "../../../shared/services/users.service";

@Component({
  selector: 'app-create',
  templateUrl: 'create.component.html',
  styleUrls: ['create.component.scss']
})
export class CreateComponent implements OnInit {
  creationFormGroup: FormGroup;

  sem : any;
  dat: any;
  categories: any[];
  image: any;
  seminarId : any;
  organizers: any[];

  action = "create";

  public input1Moment: any;

  constructor(public logService:LogService, public fb: FormBuilder, public parseManager: ParseManager, public categoriesService: CategoriesService, public usersService: UsersService, public activatedRoute:ActivatedRoute, public router:Router) {
    var self = this;
    /*this.parseManager.categoriesGet((cats) => {
        self.categories = cats;
      }
    );*/
    this.categoriesService.getCategories().then(function success(cats){
      self.categories = cats;
    });

    this.usersService.getUsers().then(function success(users){
      self.organizers = users;
    });

  }

  onImageCropped(img: any){
    this.image = img;
    this.creationFormGroup.patchValue({image: img});
  }

  ngAfterContentInit(){
    this.activatedRoute.params.subscribe((params: Params) => {
      let seminarId= params['seminarId'];
      if(seminarId){
        var self = this;
        this.parseManager.seminarGetById(seminarId)
          .then(function success(seminarQuery){

            self.action = "update";

            self.sem = seminarQuery[0];

            console.log(self.sem);


            self.creationFormGroup.patchValue({'id' : self.sem.id});
            self.creationFormGroup.patchValue({'title' : self.sem.attributes.title});
            self.creationFormGroup.patchValue({'shortDescription' : self.sem.attributes.shortDescription});
            self.creationFormGroup.patchValue({'description' : self.sem.attributes.description});
            self.creationFormGroup.patchValue({'category' : self.sem.attributes.category});
            self.creationFormGroup.patchValue({'start' : self.sem.attributes.start});
            self.creationFormGroup.patchValue({'end' : self.sem.attributes.end});
            self.creationFormGroup.patchValue({'canceled' : self.sem.attributes.canceled});
            self.creationFormGroup.patchValue({'location' : self.sem.attributes.location});
            self.creationFormGroup.patchValue({'pricePerSeat' : self.sem.attributes.pricePerSeat});
            self.creationFormGroup.patchValue({'registrationEnd' : self.sem.attributes.registrationEnd});
            self.creationFormGroup.patchValue({'maxParticipants' : self.sem.attributes.maxParticipants});
            self.creationFormGroup.patchValue({'image' : self.sem.attributes.image});
            self.creationFormGroup.patchValue({'organizer' : self.sem.attributes.organizer});
            self.creationFormGroup.patchValue({'seats' : self.sem.attributes.seats});
            self.creationFormGroup.patchValue({'lead' : self.sem.attributes.lead});
            self.creationFormGroup.patchValue({'targetGroup' : self.sem.attributes.targetGroup});
            self.creationFormGroup.patchValue({'preBookedSeats' : self.sem.attributes.preBookedSeats});



          });
      }

    });
  }


  ngOnInit() {

    /**/

    /*this.categoriesService.categoriesLoaded.subscribe(
      (data: any) => {
        this.logService.log("emitter received");
        this.categories=data;
      }
    );*/

    this.creationFormGroup = this.fb.group({
      'id' : null,
      'title': [null, Validators.compose([Validators.required])],
      'shortDescription': [null, Validators.required],
      'description': [null],
      'category': [null],
      'start': [null],
      'end': [null],
      'location': [null],
      'pricePerSeat': [null],
      'registrationEnd': [null],
      'maxParticipants': [null],
      'image': this.image,
      'organizer': [null],
      'seats': [null, Validators.pattern('^[0-9]+$')],
      'lead': [null],
      'targetGroup': [null],
      'preBookedSeats': [null, Validators.pattern('^[0-9]+$')],
      'canceled': [false],
      'deleted': [false]

    });



  }

  onSubmit($ev){
    //$ev.preventDefault();
    var self = this;
    self.logService.log("Test");
    console.log(this.creationFormGroup);
    if (this.creationFormGroup.valid) {
      var fields = this.creationFormGroup.value;
      this.logService.log("Form is vail!");

      this.parseManager.seminarCreate(fields)
        .then(function success(seminar){
          self.logService.log("Erstellt!");
            self.router.navigate(["/seminars/overview"]);
        }, function error(error, seminar){
          self.logService.log(error);
          }
        );

    }
  }


}
