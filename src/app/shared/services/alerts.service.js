"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var AlertsService = (function () {
    function AlertsService(logService) {
        this.logService = logService;
        this.alerts = [];
    }
    AlertsService.prototype.addAlert = function (message, type, closable) {
        if (type === void 0) { type = "danger"; }
        if (closable === void 0) { closable = true; }
        this.alerts.push({ msg: message, type: type, closable: closable });
        this.logService.log(this.logService.getTime() + " [" + type + "] - " + message);
    };
    AlertsService.prototype.getAlerts = function () {
        return this.alerts;
    };
    AlertsService.prototype.closeAlert = function (i) {
        this.alerts.splice(i, 1);
    };
    AlertsService.prototype.clear = function () {
        this.alerts = [];
    };
    return AlertsService;
}());
AlertsService = __decorate([
    core_1.Injectable()
], AlertsService);
exports.AlertsService = AlertsService;
