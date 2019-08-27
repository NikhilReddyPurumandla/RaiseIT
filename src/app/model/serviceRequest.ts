import { Timestamp } from "rxjs";

export class ServiceRequest{
    constructor(
        public id:number,     
        public title:String,      
        public accountid:number, 
        public status:String,   
        public description:String 
    ){

    }
}