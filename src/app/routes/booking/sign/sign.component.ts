import { Component, OnInit } from '@angular/core';
import {LogService} from "../../../shared/services/log.service";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ParseManager} from "../../../models/ParseManager";
import {FormGroup, FormBuilder, FormArray, Validators, ValidatorFn, FormControl} from "@angular/forms";
import { CustomValidators } from 'ng2-validation';
import {OrderService} from "../../../shared/services/order.service";
import {Seminar} from "../../../models/seminar-model";

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  private seminar : any;

  private order: any;

  private seats = [];

  private sum = 0.00;

  constructor(private logService:LogService, private fb: FormBuilder, private parseManager:ParseManager, private activatedRoute:ActivatedRoute, private router: Router, private orderService: OrderService ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let seminarId = params['seminarId'];
    });

    this.order = this.orderService.getOrder();
    this.seminar = this.orderService.getSeminar();
    this.seats = this.orderService.getSeats();
  }





}
