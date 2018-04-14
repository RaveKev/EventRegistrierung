
import {Seminar} from "./seminar-model";
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


export class ParseManager {

  constructor() {

  }

  currentUser(){
    var user = Parse.User.current();
    return user;
  }

  isLoggedIn(){
    var user = Parse.User.current();
    return user != null;
  }

  logIn(username: String, password: String, success: ()=> void, error: ()=>void)
  {
    Parse.User.logIn(username, password).then(function(){
      success();
    },function(e){
      error();
    });
  }

  logOut(){
    return Parse.User.logOut();
  }

  signup(username: String, password: String, email: String, success: ()=>void)
  {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    user.signUp().then(function(){
      success();
    }, function(e){
      console.log("Signin failed through email");
      console.log(e);
    });
  }

  passwordReset(email: string){
    Parse.User.requestPasswordReset(email, {
      success: function() {
        console.log("PasswortReset gesendet")
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  }


  profileGetByUserId(userId: string){
    var query = new Parse.Query("Profile");
    query.equalTo("firstname", "Kevin");
    var qry = query.first();
    return qry;
  }

  profileGetForCurrentUser(){
    var user = Parse.User.current();
    var query = new Parse.Query("Profile");
    query.equalTo("user", user);
    var qry = query.first();
    return qry;
  }



  updateProfile(prof: any) {

    var Profile = Parse.Object.extend("Profile");
    var pProfile = new Profile();
    var usr = this.currentUser();

    pProfile.set("id", prof.id);
    pProfile.set("salutation", prof.salutation);
    pProfile.set("firstName", prof.firstName);
    pProfile.set("lastName", prof.lastName);
    pProfile.set("city", prof.city);
    pProfile.set("url", prof.url);
    pProfile.set("company", prof.company);
    pProfile.set("user", usr);

    var ret = pProfile.save();

    if (prof.image != null && prof.image != undefined) {
      usr.set("picture", prof.image);
    }
    usr.set("profile", pProfile);
    usr.save();

    return ret;

  }

  seminarCreate(seminar: Seminar){
    return this.seminarCreateByAttributes(
      seminar.id,
      seminar.title,
      seminar.shortDescription,
      seminar.description,
      seminar.category,
      seminar.start,
      seminar.end,
      seminar.registrationEnd,
      seminar.location,
      seminar.maxParticipants,
      seminar.pricePerSeat,
      seminar.canceled,
      seminar.image,
      seminar.organizer,
      seminar.lead,
      seminar.targetGroup,
      seminar.preBookedSeats,
      seminar.seats,
      seminar.itemNumber,
      seminar.deleted,

    );
  }

  seminarCreateByAttributes(id: string, title: string, shortDescription: string, description: string, category: any, start: String, end: String, registrationEnd: String, location: string, maxParticipants: number, pricePerSeat: number, canceled: boolean, image: string, organizer: any, lead:string, targetGroup:string, preBookedSeats:number, seats:number, itemNumber:string, deleted:boolean) {

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
    pSeminar.set("deleted", deleted);
    //pSeminar.set("seatsOccupied", preBookedSeats);

    return pSeminar.save();

  }

  seminarDelete(id: string){
    var Seminar = Parse.Object.extend("Seminar");
    var pSeminar = new Seminar();
    pSeminar.set("id", id);
    pSeminar.set("deleted", true);

    return pSeminar.save();
  }

  seminarCancel(id: string){
    var Seminar = Parse.Object.extend("Seminar");
    var pSeminar = new Seminar();
    pSeminar.set("id", id);
    pSeminar.set("canceled", true);

    return pSeminar.save();
  }

  seminarsGetActive(){
    var query = new Parse.Query("Seminar");
    query.include("category");
    query.include("category.name");
    query.include("organizer");
    query.equalTo('deleted', false);
    query.equalTo('canceled', false);
    return query.find();
  }


  seminarsGetAll(){
    var query = new Parse.Query("Seminar");
    query.include("category");
    query.include("category.name");
    query.include("organizer");
    return query.find();
  }

  seminarGetById(id:string) {
    var query = new Parse.Query("Seminar");
    query.include("category");
    query.include("category.name");
    query.include("organizer");
    query.equalTo("objectId", id);
    query.equalTo('deleted', false);
    return query.find();
  }



  categoriesGet(){
    var query = new Parse.Query("Category");
    return query.find();
  }


  usersGet(){
    var query = new Parse.Query("User");
    return query.find();
  }

  orderCreate(order: any, seminar: any){
    var Order = Parse.Object.extend("Order");
    var pOrder = new Order();
    pOrder.set("seminar", seminar);
    pOrder.set("orderer", Parse.User.current());
    pOrder.setACL(new Parse.ACL(Parse.User.current()));
    return pOrder.save();
  }

  ordersGet(){
    var query = new Parse.Query("Order");
    query.include("orderer");
    query.include("seminar");
    return query.find();
  }

  seatCreate(seat: any, order: any){
    var Seat = Parse.Object.extend("Seat");
    var pSeat = new Seat();
    pSeat.set("firstName", seat.firstName);
    pSeat.set("lastName", seat.lastName);
    pSeat.set("birthDay", seat.birtday);
    pSeat.set("email", seat.email);
    pSeat.set("price", seat.price);
    pSeat.set("order", order);
    pSeat.set("seminar", seat.seminar);
    pSeat.setACL(new Parse.ACL(Parse.User.current()));

    return pSeat.save();
  }

  seatsCreateAll(seats: any, order: any){
    var seatsToSave = [];

    for(var sIndex in seats){
      var Seat = Parse.Object.extend("Seat");
      var pSeat = new Seat();
      pSeat.set("firstName", seats[sIndex].firstName);
      pSeat.set("lastName", seats[sIndex].lastName);
      pSeat.set("birthDay", seats[sIndex].birtday);
      pSeat.set("email", seats[sIndex].email);
      pSeat.set("price", seats[sIndex].price);
      pSeat.set("order", order);
      pSeat.set("seminar", seats[sIndex].seminar);
      pSeat.setACL(new Parse.ACL(Parse.User.current()));
      seatsToSave.push(pSeat);
    }

    return Parse.Object.saveAll(seatsToSave);
  }

  seatsCreate(seats: any, order: any){
    for(var seat in seats){
      this.seatCreate(seat, order);
    }
  }


  customQuestionCreate(customQuestion: any, seminar: any){
    var CustomQuestion = Parse.Object.extend("CustomQuestion");
    var pCustomQuestion = new CustomQuestion();
    pCustomQuestion.set("title",customQuestion.title);
    pCustomQuestion.set("text",customQuestion.text);
    pCustomQuestion.set("type",customQuestion.type);
    pCustomQuestion.set("required",customQuestion.required);
    pCustomQuestion.set("seminar", seminar);

    return pCustomQuestion.save();
  }

  customQuestionsGetAllBySeminarId(seminar: any){
    console.log("customQuestions: ");
    console.log(seminar);
    var query = new Parse.Query("CustomQuestion");
    query.equalTo("seminar", seminar);
    return query.find();
  }

  createCustomAnswer(customAnswer: any, order: any){
    var Answer = Parse.Object.extend("CustomAnswer");
    var pAnswer = new Answer();
    pAnswer.set("value", customAnswer.value);
    pAnswer.set("oder", order);
    pAnswer.set("question", customAnswer.question);

    return pAnswer.save();
  }

  customAnswersCreateAll(customAnswers: any, order: any){
    var answersToSave = [];

    for(var sIndex in customAnswers){
      var Answer = Parse.Object.extend("CustomAnswer");
      var pAnswer = new Answer();
      pAnswer.set("value", customAnswers[sIndex].value);
      pAnswer.set("oder", order);
      pAnswer.set("question", customAnswers[sIndex].question);
      answersToSave.push(pAnswer);
    }

    return Parse.Object.saveAll(answersToSave);
  }

}
