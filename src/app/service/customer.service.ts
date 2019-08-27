import {Injectable} from '@angular/core';
import { RequestOptions,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { Customer } from '../model/customer';
import { ServiceRequest } from '../model/serviceRequest';
import { Activity } from '../model/activity';

@Injectable()
export class CustomerService{
   
    userCredentials:any;
    email:String;
    constructor(private http:HttpClient,private route: ActivatedRoute,
        private router: Router){
     
    }
   

    getAdminDetails(){
        this.userCredentials=JSON.parse(localStorage.getItem('currentUser'));
        this.email = this.userCredentials['email'];
        return this.http.get("http://localhost:8080/servicePortal/user/"+this.email);
    }

    saveAdmin(user:User){
        return this.http.post<any>("http://localhost:8080/servicePortal/user",user);
    }

    saveCustomer(customer:Customer){
        return this.http.post<any>("http://localhost:8080/customer",customer);
    }

    getCustomerById(id){
        return this.http.get("http://localhost:8080/customer/"+id);
    }

    getAllCustomer(){
        return this.http.get("http://localhost:8080/customer");
    }
    
    updateCustomerDetails(customer:Customer){
        return this.http.put("http://localhost:8080/customer",customer);
    }

    deleteCustomer(id){
        console.log("customer delete",id);
        return this.http.delete('http://localhost:8080/customer/'+id)
        .subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log("Error occured");
            }
          );
        }

    addServiceTicket(serviceRequest:ServiceRequest){
        return this.http.post<any>("http://localhost:8080/service",serviceRequest);
    }

    getServiceTicketById(id:String){
        console.log("service ticket id "+id)
        return this.http.get("http://localhost:8080/service/"+id);
    }
    
    getPendingTickes(){
        return this.http.get("http://localhost:8080/service/pending");
    }

    getSolvedTickes(){
        return this.http.get("http://localhost:8080/service/solved");
    }
    

    updateServiceTicketStatus(serviceRequest:ServiceRequest){
        console.log("serviceRequest"+serviceRequest.status)
        return this.http.put("http://localhost:8080/service",serviceRequest);
    }

    closeServiceTicket(serviceRequest:ServiceRequest){
        return this.http.put("http://localhost:8080/service/closeTicket",serviceRequest);
    }

    deleteServiceTicket(id){
        console.log("service ticket id : "+id)
        console.log("http://localhost:8080/service/"+id)
        return this.http.delete("http://localhost:8080/service/"+id)
        .subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log("Error occured");
            }
          );
    }

    addActivity(activity:Activity){
        return this.http.post<any>("http://localhost:8080/service/Activity",activity);
    }
    
    getAllActivities(){
        return this.http.get("http://localhost:8080/service/Activity");
    }
}