import {Injectable, EventEmitter} from '@angular/core';
import {ParseManager} from "../../models/ParseManager";
import {LogService} from "./log.service";
import {Category} from "../../models/category-model";

@Injectable()
export class CategoriesService {

  public categories = [];

  categoriesLoaded = new EventEmitter<any>();

  constructor(public logService: LogService, public parseManager: ParseManager) {
    this.fetchCategoriesFromServer();
  }

  getCategories(){
    return this.parseManager.categoriesGet();

    // this.parseManager.categoriesGet().then(function success(cats){
    //   service.categories = cats;
    //
    //   /*
    //   for(let c of cats){
    //     console.log(c);
    //     console.log(this.mapFromParse(c));
    //   }
    //   */
    //
    //   success(service.categories);
    // })


   /* this.logService.log("CategoryService: getCategories()");
    if(this.categories.length <= 0 ){
      this.fetchCategoriesFromServer();
    }
    this.logService.log(this.categories);
    return this.categories;*/
  }

  fetchCategoriesFromServer(){
    // var self = this;
    // this.parseManager.categoriesGet((cats) => {
    //   self.categories = cats;
    // });

  }


  mapFromParse(parseObject: any){
    // var category : Category = {
    //   "name": parseObject.get("name")
    // };
    // return category;

  }

}
