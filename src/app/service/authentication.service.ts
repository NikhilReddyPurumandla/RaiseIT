import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
 
@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8080/servicePortal/getLogin';
    
    constructor(private http: Http) {
    }
 
    login(event): Observable<boolean> {
    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.authUrl,event,options)
        .map((response)=> {
            response["_body"]
                // login successful if there's a jwt token in the response
                let headers = response.headers;
               let token=response["_body"];
               console.log("response token "+token);
                 if (response["_body"]!="") {  
                //     // store username and jwt token in local storage to keep user logged in between page refreshes
                     localStorage.setItem('currentUser', JSON.stringify({ email: event.email, token: token }));
                //     // return true to indicate successful login
                
                //code to get logged in user data
                console.log("****localstorage : "+localStorage.getItem('currentUser'));
                let userCredentials=JSON.parse(localStorage.getItem('currentUser'));
                console.log("*****mail "+userCredentials.email);

                     return true;
                 } else {
                //     // return false to indicate failed login
                     return false;
                 }
            }).catch((error:any) => Observable.throw('User Data Not Found'));
    }
 
    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      console.log("token "+token);
      return token ? token : "";
    }
    isLoggedIn(): boolean {
      var token: String = this.getToken();
      console.log("token login check "+token);
      return token ? true : false;
    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}