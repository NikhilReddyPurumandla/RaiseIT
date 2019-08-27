import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  adminDetails:any;

  constructor(private route: ActivatedRoute,
    private router: Router,private customerService : CustomerService) {
    
     
     }

  ngOnInit() {
    
  }


details = this.customerService.getAdminDetails()
.subscribe(data=>{
 this.adminDetails=data;
 console.log(this.adminDetails);
})


}
