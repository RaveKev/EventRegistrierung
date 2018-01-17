"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var LockComponent = (function () {
    function LockComponent(settings, fb, injector) {
        this.settings = settings;
        this.injector = injector;
        this.valForm = fb.group({
            'password': [null, forms_1.Validators.required]
        });
    }
    LockComponent.prototype.submitForm = function ($ev, value) {
        $ev.preventDefault();
        for (var c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
            this.router.navigate(['home']);
        }
    };
    LockComponent.prototype.ngOnInit = function () {
        this.router = this.injector.get(router_1.Router);
    };
    return LockComponent;
}());
LockComponent = __decorate([
    core_1.Component({
        selector: 'app-lock',
        templateUrl: './lock.component.html',
        styleUrls: ['./lock.component.scss']
    })
], LockComponent);
exports.LockComponent = LockComponent;
