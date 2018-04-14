"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SeminarFilterPipe = (function () {
    function SeminarFilterPipe() {
    }
    SeminarFilterPipe.prototype.transform = function (events, term) {
        //if search is empty
        if (term === undefined)
            return events;
        term = term.toLowerCase();
        if (events === undefined)
            return null;
        return events.filter(function (event) {
            return (event.get("title") && event.get("title").toLowerCase().includes(term)) ||
                (event.get("description") && event.get("description").toLowerCase().includes(term));
        });
    };
    return SeminarFilterPipe;
}());
SeminarFilterPipe = __decorate([
    core_1.Pipe({
        name: 'seminarFilter'
    })
], SeminarFilterPipe);
exports.SeminarFilterPipe = SeminarFilterPipe;
