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
          },
          function error(seminarQuery, error){
            console.log(error);
          });
    });

    this.bookingFormGroup = this.fb.group({
      'id': null,
      'seats': this.fb.array([ this.buildSeats() ])
    });

    console.log(this.bookingFormGroup);


  }

  get seats() : FormArray{
    return <FormArray>this.bookingFormGroup.get("seats");
  }

  buildSeats(){
    return this.fb.group({
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "birthday": [""],
      "email": [""]
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

    if (this.bookingFormGroup.valid) {

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
          "order": null
        }
        this.orderService.addSeat(seat);
        console.log(this.orderService.seats);
      }
      console.log(this.orderService.seats);


      var self = this;

      self.parseManager.orderCreate(self.orderService.getOrder(), self.orderService.getSeminar())
        .then(function (pOrder){
          for(let se in self.orderService.seats){
            console.log("doCreate");
            console.log(self.orderService.seats[se]);
            self.parseManager.seatCreate(self.orderService.seats[se], pOrder)
              .then(function(){

              }, function(error, pSeat){

              });
          }
      }, function(error, pOrder){
          console.log(error);
        });


    }
  }


  updateSeatsAmount(){
    this.sum = this.seminar.attributes.pricePerSeat * this.seats.length;
  }
}
