import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-seatdetails',
  templateUrl: './seatdetails.component.html',
  styleUrls: ['./seatdetails.component.scss']
})
export class SeatdetailsComponent implements OnInit {

  @Input() seat: any[];
  constructor() { }

  ngOnInit() {
  }

}
