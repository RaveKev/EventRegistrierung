import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {


  transform(events: any, term: any): any {
    //if search is empty
    if(term === undefined) return events;
    if(term == '-1') return events;
    term = term.toLowerCase();

    if(events === undefined) return null;

    console.log("CategoryFilter: " + term);
    console.log()
    return events.filter(function(event){
      console.log(event);
      console.log("event: " + event.attributes);
      return  (event.attributes.category && event.attributes.category.id && event.attributes.category.id.toLowerCase().includes(term)) ||
              (event.attributes.category && event.attributes.category.attributes.name && event.attributes.category.attributes.name.toLowerCase().includes(term));

    })
  }

}
