import { Component, OnInit } from '@angular/core';
import {LogService} from "../../../shared/services/log.service";
import {Seminar} from "../../../models/seminar-model";

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {ParseManager} from "../../../models/ParseManager";
import {CategoriesService} from "../../../shared/services/categories.service";
import {ActivatedRoute, Params} from "@angular/router";

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

  action = "create";

  public input1Moment: any;

  constructor(private logService:LogService, private fb: FormBuilder, private parseManager: ParseManager, private categoriesService: CategoriesService, private activatedRoute:ActivatedRoute) {
    var self = this;
    /*this.parseManager.categoriesGet((cats) => {
        self.categories = cats;
      }
    );*/
    this.categoriesService.getCategories().then(function success(cats){
      self.categories = cats;
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
            self.creationFormGroup.patchValue({'pricePerPerson' : self.sem.attributes.pricePerPerson});
            self.creationFormGroup.patchValue({'registrationEnd' : self.sem.attributes.registrationEnd});
            self.creationFormGroup.patchValue({'maxParticipants' : self.sem.attributes.maxParticipants});
            self.creationFormGroup.patchValue({'image' : self.sem.attributes.image});
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
      'canceled': [null],
      'location': [null],
      'pricePerPerson': [null],
      'registrationEnd': [null],
      'maxParticipants': [null],
      'image': this.image,

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
      console.log(fields.title);
      console.log(fields);

      this.parseManager.seminarCreate(fields)
        .then(function (seminar){
          self.logService.log("Erstellt!");
        }
        );

    }
  }


}
