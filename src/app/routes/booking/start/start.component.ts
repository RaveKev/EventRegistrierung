import { Component, OnInit } from '@angular/core';
import {LogService} from "../../../shared/services/log.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ParseManager} from "../../../models/ParseManager";
import {FormGroup, FormBuilder, FormArray} from "@angular/forms";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  bookingFormGroup: FormGroup;

  private seminar : any;

  private order: any;

  private sum = 0.00;

  constructor(private logService:LogService, private fb: FormBuilder, private parseManager:ParseManager, private activatedRoute:ActivatedRoute, private router: Router ) { }

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


  }

  get seats() : FormArray{
    return <FormArray>this.bookingFormGroup.get("seats");
  }

  buildSeats(){
    return this.fb.group({
      "firstName": "",
      "lastName": "",
      "birthday": "",
      "email":""
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

  onSubmit(){
    console.log("SUBMIT");
  }

  updateSeatsAmount(){
    this.sum = this.seminar.attributes.pricePerSeat * this.seats.length;
  }
}
