import { Component, OnInit } from '@angular/core';
import { ServiceRequest } from '../model/serviceRequest';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../service/customer.service';

@Component({
  selector: 'app-view-service',
  templateUrl: './view-service.component.html',
  styleUrls: ['./view-service.component.css']
})
export class ViewServiceComponent implements OnInit {

  ticketDetails:any = [];
  ticketDetailsById: any = [];
  constructor(private route: ActivatedRoute,
    private router: Router,private customerService : CustomerService) { }

  ngOnInit() {
  this.customerService.getSolvedTickes()
  .subscribe(data=>{
   this.ticketDetails=data;
   console.log(this.ticketDetails);
  })
  }
  serviceRequest = new ServiceRequest(0,'',0,'','');

   ticketData =  this.customerService.getSolvedTickes()
   .subscribe(data=>{
    this.ticketDetails=data;
    console.log(this.ticketDetails);
   })
  
    
}
