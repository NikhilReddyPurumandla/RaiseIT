import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../service/customer.service';
import { ServiceRequest } from '../model/serviceRequest';


@Component({
  selector: 'app-service-ticket',
  templateUrl: './service-ticket.component.html',
  styleUrls: ['./service-ticket.component.css']
})
export class ServiceTicketComponent implements OnInit {

  ticketDetails:any = [];
  ticketDetailsById: any = [];
  constructor(private route: ActivatedRoute,
    private router: Router,private customerService : CustomerService) { }

  ngOnInit() {
  this.customerService.getPendingTickes()
  .subscribe(data=>{
   this.ticketDetails=data;
   console.log(this.ticketDetails);
  })
  }
  serviceRequest = new ServiceRequest(0,'',0,'','');

   ticketData =  this.customerService.getPendingTickes()
   .subscribe(data=>{
    this.ticketDetails=data;
    console.log(this.ticketDetails);
   })
  
  onEdit = function(){
    this.serviceRequest['id'] = this.ticketDetailsById.id;
    console.log("this.serviceRequest['id'] "+this.serviceRequest['id'])

    if(this.ticketDetailsById.status != "closed"){
    console.log("updating: "+this.ticketDetailsById.id)
    this.customerService.updateServiceTicketStatus(this.ticketDetailsById)
    .subscribe(
      data => document.location.reload(false) ,
      error => this.errorMessage = error.StatusText
    )
  }
  else{

    console.log("status in close"+this.ticketDetailsById.status)
    console.log("closing: "+this.ticketDetailsById.id)
    if(this.customerService.updateServiceTicketStatus(this.ticketDetailsById)){
    console.log("closing ticket")
    this.customerService.closeServiceTicket(this.ticketDetailsById)
    .subscribe(
      data =>     document.location.reload(false),
      error => this.errorMessage = error.StatusText
    )
  }
}
    console.log(event);
   // document.location.reload(false)
   };

  delete(ticketData){
    console.log("to be deleted event",ticketData);
    if(confirm("Do you really want to delete this ticket?")){
    this.customerService.deleteServiceTicket(ticketData)
    document.location.reload(false);

      
    }
  }

   getTicket(id,divId){
    document.getElementById(divId).style.display='block'
  console.log("id is "+id)
   this.customerService.getServiceTicketById(id)
  .subscribe(data=>{
    this.ticketDetailsById=data;
    console.log("data is : "+this.ticketDetailsById.id);
   })
 
  }
    
}
