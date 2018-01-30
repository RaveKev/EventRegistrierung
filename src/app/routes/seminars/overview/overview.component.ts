import { Component, OnInit } from '@angular/core';
import {ParseManager} from "../../../models/ParseManager";
import {LogService} from "../../../shared/services/log.service";
import {Seminar} from "../../../models/seminar-model";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  seminars : any[];
  filterText : string;

  public items: Array<string> = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
    'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
    'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
    'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
    'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
    'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
    'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
    'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
    'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
    'Zagreb', 'Zaragoza', 'Łódź'];

  public categories = [];
  public filterCategory: string;

  constructor(private logService:LogService, private parseManager: ParseManager ) { }

  ngOnInit() {
    var self = this;

    this.parseManager.categoriesGet()
      .then((categories)=>{
        console.log(categories);
        var tmp = {'id': -1, 'text': "Alle"};
        self.categories.push(tmp);
        for(let cat of categories){
          console.log(cat);
          tmp = {'id': cat.id, 'text': cat.attributes.name};
          console.log(tmp);
          self.categories.push(tmp);
        }
        console.log(self.categories);

    });

    this.parseManager.seminarsGet()
      .then(function success(seminars){
        self.seminars = seminars;
        console.log("SEMINARS");
        console.log(self.seminars);
      });
  }

  public refreshValue(value:any){
    console.log(value);
    this.filterCategory = value.id;
  }

}
