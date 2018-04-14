"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by busch on 01.09.2017.
 */
//  var Parse = require('parse').Parse;
//  Parse.initialize('eventregistration112App6vf3SyF9');
//Parse.serverURL = "https://eventregistration112.herokuapp.com/parse";;
//https://github.com/altab-ch/Angular2-Parse/blob/master/src/Model/ParseManager.ts
//https://www.joshmorony.com/user-authentication-with-ionic-and-parse-part-2-facebook-login/
var Parse = require('parse').Parse;
Parse.initialize("EventRegistierungY6hzXuh7VmLgzq5S");
//Parse.serverURL = "https://eventregistration112.herokuapp.com/parse";
Parse.serverURL = "https://eventregistrierung.herokuapp.com/parse";
var ParseManager = (function () {
    function ParseManager() {
    }
    ParseManager.prototype.currentUser = function () {
        var user = Parse.User.current();
        console.log(user);
        return user;
    };
    ParseManager.prototype.logIn = function (username, password, success, error) {
        Parse.User.logIn(username, password).then(function () {
            success();
        }, function (e) {
            error();
        });
    };
    ParseManager.prototype.signup = function (username, password, email, success) {
        console.log("username: " + username + "  password: " + password);
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        user.signUp().then(function () {
            success();
        }, function (e) {
            console.log("Signin failed through email");
            console.log(e);
        });
    };
    ParseManager.prototype.profileGetByUserId = function (userId) {
        console.log("userId: " + userId);
        var query = new Parse.Query("Profile");
        query.equalTo("firstname", "Kevin");
        var qry = query.first();
        console.log(qry);
        return qry;
    };
    ParseManager.prototype.updateProfile = function (profile) {
    };
    ParseManager.prototype.seminarCreate = function (seminar) {
        return this.seminarCreateByAttributes(seminar.id, seminar.title, seminar.shortDescription, seminar.description, seminar.category, seminar.start, seminar.end, seminar.registrationEnd, seminar.location, seminar.maxParticipants, seminar.pricePerSeat, seminar.canceled, seminar.image, seminar.organizer, seminar.lead, seminar.targetGroup, seminar.preBookedSeats, seminar.seats, seminar.itemNumber);
    };
    ParseManager.prototype.seminarCreateByAttributes = function (id, title, shortDescription, description, category, start, end, registrationEnd, location, maxParticipants, pricePerSeat, canceled, image, organizer, lead, targetGroup, preBookedSeats, seats, itemNumber) {
        var Seminar = Parse.Object.extend("Seminar");
        var pSeminar = new Seminar();
        pSeminar.set("id", id);
        pSeminar.set("title", title);
        pSeminar.set("shortDescription", shortDescription);
        pSeminar.set("description", description);
        pSeminar.set("category", category);
        pSeminar.set("start", start);
        pSeminar.set("end", end);
        pSeminar.set("location", location);
        pSeminar.set("registrationEnd", registrationEnd);
        pSeminar.set("pricePerSeat", pricePerSeat);
        pSeminar.set("canceled", canceled);
        pSeminar.set("maxParticipants", maxParticipants);
        pSeminar.set("creator", Parse.User.current());
        pSeminar.set("image", image);
        pSeminar.set("organizer", organizer);
        pSeminar.set("lead", lead);
        pSeminar.set("targetGroup", targetGroup);
        pSeminar.set("preBookedSeats", preBookedSeats);
        pSeminar.set("seats", seats);
        pSeminar.set("itemNumber", itemNumber);
        //pSeminar.set("seatsOccupied", preBookedSeats);
        return pSeminar.save();
    };
    ParseManager.prototype.seminarDelete = function (id) {
        var Seminar = Parse.Object.extend("Seminar");
        var pSeminar = new Seminar();
        pSeminar.set("id", id);
        pSeminar.set("deleted", true);
        return pSeminar.save();
    };
    ParseManager.prototype.seminarsGet = function () {
        var query = new Parse.Query("Seminar");
        query.include("category");
        query.include("category.name");
        query.include("organizer");
        query.equalTo('deleted', false);
        return query.find();
    };
    ParseManager.prototype.seminarGetById = function (id) {
        var query = new Parse.Query("Seminar");
        query.include("category");
        query.include("category.name");
        query.include("organizer");
        query.equalTo("objectId", id);
        query.equalTo('deleted', false);
        return query.find();
    };
    ParseManager.prototype.categoriesGet = function () {
        var query = new Parse.Query("Category");
        return query.find();
    };
    ParseManager.prototype.usersGet = function () {
        var query = new Parse.Query("User");
        return query.find();
    };
    return ParseManager;
}());
exports.ParseManager = ParseManager;
