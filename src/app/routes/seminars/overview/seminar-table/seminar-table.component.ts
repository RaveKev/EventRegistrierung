import {Component, OnInit, Input} from '@angular/core';
import {Seminar} from "../../../../models/seminar-model";

import { ColorsService } from '../../../../shared/colors/colors.service';

@Component({
  selector: 'app-seminar-table',
  templateUrl: 'seminar-table.component.html',
  styleUrls: ['seminar-table.component.scss']
})
export class SeminarTableComponent implements OnInit {

  pieOptions3 = {
    animate: {
      duration: 800,
      enabled: true
    },
    barColor: this.colors.byName('danger'),
    trackColor: false,
    scaleColor: this.colors.byName('gray'),
    lineWidth: 15,
    lineCap: 'circle'
  };

  easyPiePercent3 = 34;

  @Input() seminars: any[];
  @Input() filterText = "";
  @Input() filterCategory = "";

  constructor(public colors: ColorsService) { }

  ngOnInit() {
  }

}
