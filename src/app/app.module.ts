import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import {CustomerService} from './service/customer.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CanActivateAuthGuard } from './can-activate.authguard';
import { AuthenticationService } from './service/authentication.service';
import { ServiceTicketComponent } from './service-ticket/service-ticket.component';
import { ViewServiceComponent } from './view-service/view-service.component';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts'


const routes: Routes = [

  {
    path: 'login', 
    component: LoginComponent
   },

  {
     path: 'user', 
     component: UserComponent,
     canActivate: [CanActivateAuthGuard]
    },

    {
      path: 'customer', 
      component: CustomerComponent,
      canActivate: [CanActivateAuthGuard]
     },
    
     {
      path: 'serviceticket', 
      component: ServiceTicketComponent,
      canActivate: [CanActivateAuthGuard]
     },
     
     {
      path: 'viewService', 
      component: ViewServiceComponent,
      canActivate: [CanActivateAuthGuard]
     },

    {
      path: 'logout',
      component: LogoutComponent,
      canActivate: [CanActivateAuthGuard]
    },
  {
    path:'',
    redirectTo:'user',
    pathMatch: 'full'
  }
];



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    UserComponent,
    ServiceTicketComponent,
    ViewServiceComponent,
    CustomerComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,    
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(routes),
    DataTablesModule,
    ChartsModule,
    DataTablesModule.forRoot()
  ],
  providers: [CustomerService,CanActivateAuthGuard, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
