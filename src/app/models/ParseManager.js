"use strict";
/**
 * Created by busch on 01.09.2017.
 */
var Parse = require('parse').Parse;
Parse.initialize('eventregistration112App6vf3SyF9');
/**
 * Heroku app URL
 */
//Parse.serverURL = "https://eventregistration112.herokuapp.com/parse";
/**
 * Local development
 */
Parse.serverURL = "localhost:1337/parse";

//https://github.com/altab-ch/Angular2-Parse/blob/master/src/Model/ParseManager.ts
//https://www.joshmorony.com/user-authentication-with-ionic-and-parse-part-2-facebook-login/

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
    ParseManager.prototype.signup = function (username, password, success) {
        console.log("username: " + username + "  password: " + password);
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.signUp().then(function () {
            success();
        }, function (e) {
            console.log("Signin failed through email");
            console.log(e);
        });
    };
    return ParseManager;
}());
exports.ParseManager = ParseManager;
