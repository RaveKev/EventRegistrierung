import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seminarFilter'
})
export class SeminarFilterPipe implements PipeTransform {

  transform(events: any, term: any): any {
    //if search is empty
    if(term === undefined) return events;
    term = term.toLowerCase();

    if(events === undefined) return null;

    return events.filter(function(event){
      return  (event.get("title") && event.get("title").toLowerCase().includes(term)) ||
              (event.get("description") && event.get("description").toLowerCase().includes(term));

    })
  }

}
