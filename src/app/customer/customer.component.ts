import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { Customer } from '../model/customer';
import { ServiceRequest } from '../model/serviceRequest';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerdetailsById:any = [];
  customerDetails:any = [];
  errorMessage: any;

  constructor(private route: ActivatedRoute,
    private router: Router,private customerService : CustomerService) { }

  ngOnInit() {
  }

  customer = new Customer(0,'','','','','','','','','');
  serviceRequest = new ServiceRequest(0,'',0,'','');

onSubmit = function(){
 
  this.customerService.saveCustomer(this.customer)
  .subscribe(
    data => document.location.reload(false),
    error => this.errorMessage = error.StatusText
  )
  console.log(event);
 };

 onSubmitTicket = function(){
  this.serviceRequest['accountid'] = this.customerdetailsById.id;
  this.customerService.addServiceTicket(this.serviceRequest)
  .subscribe(
    data =>   document.location.reload(false),
    error => this.errorMessage = error.StatusText
  )
  console.log(event);
 };

 onEdit = function(){
  this.customer['accountid'] = this.customerdetailsById.id;
  this.customerService.updateCustomerDetails(this.customerdetailsById)
  .subscribe(
    data =>  document.location.reload(false),
    error => this.errorMessage = error.StatusText
  )
  console.log(event);
 };

 customerData =  this.customerService.getAllCustomer()
  .subscribe(data=>{
   this.customerDetails=data;
   console.log(this.customerDetails);
  })

  delete(customerData){
    console.log("to be deleted event",customerData);
    if(confirm("Do you really want to delete ?")){
    this.customerService.deleteCustomer(customerData)
    document.location.reload(false);

    }
  
  }

  
  getCustomer(id,divId){
    document.getElementById(divId).style.display='block'
  this.customerService.getCustomerById(id)
  .subscribe(data=>{
    this.customerdetailsById=data;
    console.log("data is : "+data);
   })
 
  }

  // editCustomer(customerdetailsById){
  //   this.customerService.updateCustomerDetails(this.customerdetailsById)
  //   .subscribe(data=>{
  //     console.log("data ls :"+data)
  //  })
 
  // }

  
}
