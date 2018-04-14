import { Component, OnInit } from '@angular/core';
import {LogService} from "../../../shared/services/log.service";
import {Seminar} from "../../../models/seminar-model";

import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

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

  public customQuestionsArray = [];


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
      'deleted': [false],
      'customQuestions': this.fb.array([ this.buildCustomQuestion() ])
    });



  }

  onSubmit($ev){
    //$ev.preventDefault();
    var self = this;
    self.logService.log("Test");

    for (let c in this.creationFormGroup.controls) {
      this.creationFormGroup.controls[c].markAsTouched();
    }
    for (let s in this.creationFormGroup.controls.customQuestions['controls']) {
      console.log(this.creationFormGroup.controls.customQuestions['controls'][s]);
      for (let sc in this.creationFormGroup.controls.customQuestions['controls'][s].controls) {
        this.creationFormGroup.controls.customQuestions['controls'][s].controls[sc].markAsTouched();
      }
    }

    console.log(this.creationFormGroup);
    if (this.creationFormGroup.valid) {
      var fields = this.creationFormGroup.value;
      this.logService.log("Form is vail!");


      for (let s in this.creationFormGroup.controls.customQuestions['controls']) {
        console.log("im For");
        console.log(this.creationFormGroup.controls.customQuestions['controls'][s]);

        var customQ = {
          "title": this.creationFormGroup.controls.customQuestions['controls'][s]['controls'].questionTitle.value,
          "text": this.creationFormGroup.controls.customQuestions['controls'][s]['controls'].questionText.value,
          "type": this.creationFormGroup.controls.customQuestions['controls'][s]['controls'].type.value,
          "required": this.creationFormGroup.controls.customQuestions['controls'][s]['controls'].required.value
        }
        console.log(customQ);
        this.customQuestionsArray.push(customQ);
      }


      this.parseManager.seminarCreate(fields)
        .then(function success(seminar){
          self.logService.log("Erstellt!");

            for(let cq in self.customQuestionsArray){
              self.parseManager.customQuestionCreate(self.customQuestionsArray[cq], seminar)
                .then(function(){
                  console.log("Custom Question Created!");
                }, function(error, pSeat){
                  console.log(error);
                });
            }



            self.router.navigate(["/seminars/overview"]);
        }, function error(error, seminar){
          self.logService.log(error);
          }
        );

    }
    else{
      self.logService.log("Form is Invalid!");
    }
  }


  get customQuestions() : FormArray{
    return <FormArray>this.creationFormGroup.get("customQuestions");
  }

  buildCustomQuestion(){
    return this.fb.group({
      "questionTitle": ["", Validators.required],
      "questionText": ["", Validators.required],
      "required": [false],
      "type": ["", Validators.required]
    });
  }

  onAddCustomQuestion(){
    this.customQuestions.push(this.buildCustomQuestion());
  }

  onRemoveCustomQuestion(index){
    this.customQuestions.removeAt(index);
  }

  doValidateField(field){
    return field.hasError('required') && (field.dirty || field.touched);
  }

}
