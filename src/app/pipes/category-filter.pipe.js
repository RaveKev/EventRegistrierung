"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CategoryFilterPipe = (function () {
    function CategoryFilterPipe() {
    }
    CategoryFilterPipe.prototype.transform = function (events, term) {
        //if search is empty
        if (term === undefined)
            return events;
        if (term == '-1')
            return events;
        term = term.toLowerCase();
        if (events === undefined)
            return null;
        console.log("CategoryFilter: " + term);
        console.log();
        return events.filter(function (event) {
            console.log(event);
            console.log("event: " + event.attributes);
            return (event.attributes.category && event.attributes.category.id && event.attributes.category.id.toLowerCase().includes(term)) ||
                (event.attributes.category && event.attributes.category.attributes.name && event.attributes.category.attributes.name.toLowerCase().includes(term));
        });
    };
    return CategoryFilterPipe;
}());
CategoryFilterPipe = __decorate([
    core_1.Pipe({
        name: 'categoryFilter'
    })
], CategoryFilterPipe);
exports.CategoryFilterPipe = CategoryFilterPipe;
