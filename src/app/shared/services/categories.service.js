"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CategoriesService = (function () {
    function CategoriesService(logService, parseManager) {
        this.logService = logService;
        this.parseManager = parseManager;
        this.categories = [];
        this.categoriesLoaded = new core_1.EventEmitter();
        this.fetchCategoriesFromServer();
    }
    CategoriesService.prototype.getCategories = function () {
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
    };
    CategoriesService.prototype.fetchCategoriesFromServer = function () {
        // var self = this;
        // this.parseManager.categoriesGet((cats) => {
        //   self.categories = cats;
        // });
    };
    CategoriesService.prototype.mapFromParse = function (parseObject) {
        // var category : Category = {
        //   "name": parseObject.get("name")
        // };
        // return category;
    };
    return CategoriesService;
}());
CategoriesService = __decorate([
    core_1.Injectable()
], CategoriesService);
exports.CategoriesService = CategoriesService;
