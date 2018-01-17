import {Component, OnInit, Input} from '@angular/core';
import {Seminar} from "../../../../models/seminar-model";

@Component({
  selector: 'app-seminar-table',
  templateUrl: 'seminar-table.component.html',
  styleUrls: ['seminar-table.component.scss']
})
export class SeminarTableComponent implements OnInit {

  @Input() seminars: Seminar[];
  filterText = "";
  constructor() { }

  ngOnInit() {
  }

}
