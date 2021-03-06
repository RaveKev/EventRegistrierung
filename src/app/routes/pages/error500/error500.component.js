"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Error500Component = (function () {
    function Error500Component(settings) {
        this.settings = settings;
    }
    Error500Component.prototype.ngOnInit = function () {
    };
    return Error500Component;
}());
Error500Component = __decorate([
    core_1.Component({
        selector: 'app-error500',
        templateUrl: './error500.component.html',
        styleUrls: ['./error500.component.scss']
    })
], Error500Component);
exports.Error500Component = Error500Component;
