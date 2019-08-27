import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../service/customer.service';
import { AuthenticationService } from '../service/authentication.service';
import { User } from '../model/user';
@Component({
 // moduleId:module.id,
  
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CustomerService,AuthenticationService],

})

export class LoginComponent implements OnInit {
  
loading = false;
form;  
email:string;
password:string;
optionHasError = true;
errorMessage = '';
  
constructor(private route: ActivatedRoute,
  private router: Router,private customerService:CustomerService, private authenticationService: AuthenticationService) {
 }

ngOnInit() {

  if (this.authenticationService.isLoggedIn) {
    this.router.navigate(['/user']);
 }
  this.form = new FormGroup({
    email : new FormControl("", Validators.required),
    password : new FormControl("", Validators.required),

  });
 
}


user = new User('',null,'','','','');

validate(value){
  
  if(value == "default"){
   
    this.optionHasError = true;
  }else{
    this.optionHasError = false;

  }
}


onSubmits = function(){
 
  this.customerService.saveAdmin(this.user)
  .subscribe(
    data =>   document.location.reload(false),
    error => this.errorMessage = error.StatusText
  )
  console.log(event);

 };

//login function
onSubmit = function(event){

console.log(event.email);
console.log(event.password);
 this.loading = true;
 this.authenticationService.login(event)
     .subscribe(result => {
         if (result === true) {
             // login successful
            
             this.router.navigate(['./user'])
         } else {
             // login failed
             this.error = 'Username or password is incorrect';
             this.loading = false;
          
             this.router.navigate(['./login']);
         }
     }, error => {
       this.loading = false;
       this.error = error;          
     });
  console.log(event);

 };


}
