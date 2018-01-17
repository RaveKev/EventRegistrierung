"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Error404Component = (function () {
    function Error404Component(settings) {
        this.settings = settings;
    }
    Error404Component.prototype.ngOnInit = function () {
    };
    return Error404Component;
}());
Error404Component = __decorate([
    core_1.Component({
        selector: 'app-error404',
        templateUrl: './error404.component.html',
        styleUrls: ['./error404.component.scss']
    })
], Error404Component);
exports.Error404Component = Error404Component;