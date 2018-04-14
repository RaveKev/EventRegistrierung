import { Component, OnInit } from '@angular/core';
import {LogService} from "../../../shared/services/log.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ParseManager} from "../../../models/ParseManager";
import {FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, FormControl} from "@angular/forms";
import { CustomValidators } from 'ng2-validation';
import {OrderService} from "../../../shared/services/order.service";
import {Seminar} from "../../../models/seminar-model";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  bookingFormGroup: FormGroup;

  public seminar : any;

  public order: any;

  public sum = 0.00;

  public customQuestionsFromDatabase: any;

  step1 = true;
  step2 = false;
  step3 = false;
  step4 = false;
  step5 = false;
  step6 = false;

  constructor(public logService:LogService, public fb: FormBuilder, public parseManager:ParseManager, public activatedRoute:ActivatedRoute, public router: Router, public orderService: OrderService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let seminarId= params['seminarId'];
      var self = this;
      this.parseManager.seminarGetById(seminarId)
        .then(function success(seminarQuery){
            if(!seminarQuery[0]){
              self.router.navigate(['/seminars/overview']);
            }
            self.seminar = seminarQuery[0];
            console.log("SEEEEEEEMINAR");
            console.log(self.seminar);

            self.sum = self.seminar.attributes.pricePerSeat;

            self.parseManager.customQuestionsGetAllBySeminarId(self.seminar)
              .then(function success(customQuestionsQuery){
                console.log("CustomQuestionGetAll...");
                console.log(customQuestionsQuery );
                  self.customQuestionsFromDatabase = customQuestionsQuery;
                  for(let cuque in self.customQuestionsFromDatabase){
                    self.onAddCustomQuestion(self.customQuestionsFromDatabase[cuque].get('required'), self.customQuestionsFromDatabase[cuque]);
                  }
                  console.log(self.customQuestionsFromDatabase);
                },
                function error(customQuestionQuery, error){
                  console.log(error);
                });

          },
          function error(seminarQuery, error){
            console.log(error);
          });


    });

    this.bookingFormGroup = this.fb.group({
      'id': null,
      'seats': this.fb.array([ this.buildSeats() ]),
      'customQuestions' : this.fb.array([ ])
    });

    console.log(this.bookingFormGroup);


  }

  get customQuestions() : FormArray{
    return <FormArray>this.bookingFormGroup.get("customQuestions");
  }

  buildCustomQuestion(req: boolean, question:any){
    if(req){
      return this.fb.group({
        "value" : ["", Validators.required],
        "question" : [question]
      })
    }
    else{
      return this.fb.group({
        "value" : [""],
        "question" : [question]
      })
    }
  }

  onAddCustomQuestion(req:boolean, question:any){
    this.customQuestions.push(this.buildCustomQuestion(req, question));
  }

  get seats() : FormArray{
    return <FormArray>this.bookingFormGroup.get("seats");
  }

  buildSeats(){
    return this.fb.group({
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "birthday": [""],
      "email": [""],
    });
  }

  onAddSeat(){
    this.seats.push(this.buildSeats());
    this.updateSeatsAmount();
  }

  onRemoveSeat(index){
    this.seats.removeAt(index);
    this.updateSeatsAmount();
  }



  submitForm($ev) {
   console.log("submit");


    $ev.preventDefault();
    for (let c in this.bookingFormGroup.controls) {
      this.bookingFormGroup.controls[c].markAsTouched();
    }
    for (let s in this.bookingFormGroup.controls.seats['controls']) {
      console.log(this.bookingFormGroup.controls.seats['controls'][s]);
      for (let sc in this.bookingFormGroup.controls.seats['controls'][s].controls) {
        this.bookingFormGroup.controls.seats['controls'][s].controls[sc].markAsTouched();
      }
    }
    for (let s in this.bookingFormGroup.controls.customQuestions['controls']) {
      console.log(this.bookingFormGroup.controls.customQuestions['controls'][s]);
      for (let sc in this.bookingFormGroup.controls.customQuestions['controls'][s].controls) {
        this.bookingFormGroup.controls.customQuestions['controls'][s].controls[sc].markAsTouched();
      }
    }

    if (this.bookingFormGroup.valid) {
      console.log("is Valid!");

      this.orderService.createOrder();
      this.orderService.setSeminar(this.seminar);

      for (let s in this.bookingFormGroup.controls.seats['controls']) {
        console.log(this.bookingFormGroup.controls.seats['controls'][s]);

        var seat = {
          "firstName": this.bookingFormGroup.controls.seats['controls'][s]['controls'].firstName.value,
          "lastName": this.bookingFormGroup.controls.seats['controls'][s]['controls'].lastName.value,
          "birthday": this.bookingFormGroup.controls.seats['controls'][s]['controls'].birthday.value,
          "email": this.bookingFormGroup.controls.seats['controls'][s]['controls'].email.value,
          "price": this.seminar.attributes.pricePerSeat ,
          "order": null,
          "seminar": this.seminar
        }
        this.orderService.addSeat(seat);
        console.log(this.orderService.seats);
      }
      console.log(this.orderService.seats);

      for (let s in this.bookingFormGroup.controls.customQuestions['controls']) {
        console.log(this.bookingFormGroup.controls.customQuestions['controls'][s]);

        var answer = {
          "value": this.bookingFormGroup.controls.customQuestions['controls'][s]['controls'].value.value,
          "order": null,
          "question": this.bookingFormGroup.controls.customQuestions['controls'][s]['controls'].question.value
        }
        this.orderService.addCustomQuestionAnswer(answer);
      }


      var self = this;
      var pOrderObject = null;

      self.parseManager.orderCreate(self.orderService.getOrder(), self.orderService.getSeminar())
        .then(function (pOrder){
          pOrderObject = pOrder;
          return self.parseManager.seatsCreateAll(self.orderService.seats, pOrder)
        })
        .then(function (){
          return self.parseManager.customAnswersCreateAll(self.orderService.customQuestionAnswers, pOrderObject)
        }).then(function(hello) {
          console.log("everything saved");
          self.router.navigate(['/booking/overview']);
        }, function(error) {
          console.log("Error during saving!");
          console.log(error);
        });

         /* for(let se in self.orderService.seats){
            console.log("doCreate");
            console.log(self.orderService.seats[se]);
            self.parseManager.seatCreate(self.orderService.seats[se], pOrder)
              .then(function(){

                //self.router.navigate(['/booking/overview']);

              }, function(error, pSeat){
                console.log(error);
              });
          }

          for(let ae in self.orderService.customQuestionAnswers){
            console.log("doCreate");
            console.log(self.orderService.customQuestionAnswers[ae]);
            self.parseManager.createCustomAnswer(self.orderService.customQuestionAnswers[ae], pOrder)
              .then(function(){


                //self.router.navigate(['/booking/overview']);

              }, function(error, pSeat){
                console.log(error);
              });
          }
        }*/


    }
    else{

      console.log("is not Valid!");
    }
  }


  updateSeatsAmount(){
    this.sum = this.seminar.attributes.pricePerSeat * this.seats.length;
  }

  doValidateField(field){
    return field.hasError('required') && (field.dirty || field.touched);
  }
}
