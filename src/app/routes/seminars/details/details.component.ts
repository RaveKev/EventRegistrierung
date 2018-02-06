import { Component, OnInit } from '@angular/core';
import {LogService} from "../../../shared/services/log.service";
import {ParseManager} from "../../../models/ParseManager";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Seminar} from "../../../models/seminar-model";


const swal = require('sweetalert');

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public seminar : any;
  public editable = false;

  constructor(public logService:LogService, public parseManager:ParseManager, public activatedRoute:ActivatedRoute, public router: Router ) {


  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let seminarId= params['seminarId'];
      console.log(seminarId);
      var self = this;
      this.parseManager.seminarGetById(seminarId)
        .then(function success(seminarQuery){
            console.log(seminarQuery);
          if(!seminarQuery[0]){
            self.router.navigate(['/seminars/overview']);
          }
          self.seminar = seminarQuery[0];

          if(self && self.seminar) {
            if (seminarQuery[0].attributes.creator.id == self.parseManager.currentUser().id) {
              self.editable = true;
            }
          }
        },
          function error(seminarQuery, error){
            console.log(error);
          });
    });

  }

  doEditEvent(){
    if(this.seminar){
      this.router.navigate(['/seminars/create', this.seminar.id]);
    }
  }

  doCanelEvent(){
    var self = this;
    swal({
      title: 'Sind Sie sicher?',
      text: 'Mächten Sie diesen Eintrag wirklich absagen?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Ja',
      cancelButtonText: 'Nein',
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      if (isConfirm) {
        this.parseManager.seminarCancel(this.seminar.id)
          .then(
            function success(seminarQuery){
              swal({title: 'Abgesagt!', text: 'Der Eintrag wurde abgesagt', type: 'success'}, (blubb) => { self.router.navigate(["/seminars/overview"]); });
            },
            function error(error){
              swal('Fehlgeschlagen', error.message, 'error');
            }
          ).catch(function(error){
          console.log(error);

        });

      } else {
        swal('Abgebrochen', 'Der Eintrag wird unverändert beibehalten', 'error');
      }
    });
  }

  doDeleteEvent(){
    var self = this;
    swal({
      title: 'Sind Sie sicher?',
      text: 'Mächten Sie diesen Eintrag wirklich löschen?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Ja',
      cancelButtonText: 'Nein',
      closeOnConfirm: false,
      closeOnCancel: false
    }, (isConfirm) => {
      if (isConfirm) {
        this.parseManager.seminarDelete(this.seminar.id)
          .then(
            function success(seminarQuery){
              swal({title: 'Gelöscht!', text: 'Der Eintrag wurde gelöscht', type: 'success'}, (blubb) => { self.router.navigate(["/seminars/overview"]); });
            },
            function error(error){
              swal('Fehlgeschlagen', error.message, 'error');
            }
          ).catch(function(error){
            console.log(error);

          });

      } else {
        swal('Abgebrochen', 'Der Eintrag wird unverändert beibehalten', 'error');
      }
    });
  }

  doStartBooking(){
    if(this.seminar){
      this.router.navigate(['/booking/start', this.seminar.id]);
    }
  }

}
