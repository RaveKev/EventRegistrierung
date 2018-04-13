import { Injectable } from '@angular/core';
import {Seminar} from "../../models/seminar-model";

@Injectable()
export class OrderService {

  public order : any;
  public seats = [];
  public seminar : Seminar;
  public customQuestionAnswers = [];

  constructor() { }



  createOrder(){
    this.order = {};
    this.seats = [];
    this.seminar = null;
  }

  getOrder(){
    return this.order;
  }

  setSeminar(seminar: Seminar){
    this.seminar = seminar;
  }

  getSeminar(){
    return this.seminar;
  }

  addSeat(seat){
    this.seats.push(seat);
  }

  getSeats(){
    return this.seats;
  }

  addCustomQuestionAnswer(answer){
    this.customQuestionAnswers.push(answer);
  }

  getCustomQuestionAnswers(){
    return this.customQuestionAnswers;
  }

}
