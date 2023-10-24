import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  
  finishJob(agencyUsername,objAddress){
    const data = {
      agencyUsername:agencyUsername,
      objAddress:objAddress
    }
    return this.http.post(`${this.uri}/job/finishJob`,data)
  }

  declineBid(agencyUsername,objAddress){
    const data = {
      agencyUsername:agencyUsername,
      objAddress:objAddress
    }
    return this.http.post(`${this.uri}/job/declineBid`,data)
  }
  acceptBid(agencyUsername,objAddress){
    const data = {
      agencyUsername:agencyUsername,
      objAddress:objAddress
    }
    return this.http.post(`${this.uri}/job/acceptBid`,data)
  }
  
  declineOffer(agencyUsername,objAddress){
    const data = {
      agencyUsername:agencyUsername,
      objAddress:objAddress
    }
    return this.http.post(`${this.uri}/job/declineOffer`,data)
  }

  acceptOffer(agencyUsername,objAddress,bid){
    const data = {
      agencyUsername:agencyUsername,
      objAddress:objAddress,
      bid:bid
    }
    return this.http.post(`${this.uri}/job/acceptOffer`,data)
  }

  addJob(job){
    const data = {
      job:JSON.stringify(job)
    }
    return this.http.post(`${this.uri}/job/addJob`,data)
  }
  
  getAllJobs(){
    return this.http.get(`${this.uri}/job/getAllJobs`)
  }

  getJobsForClient(username){
    const data = {
      username:username
    }
    return this.http.post(`${this.uri}/job/getJobsForClient`,data)
  }

  getJobsForAgency(username){
    const data = {
      username:username
    }
    return this.http.post(`${this.uri}/job/getJobsForAgency`,data)
  }

  getObjectFromObjectAddress(clientUsername,objectAddress){
    const data = {
      clientUsername:clientUsername,
      objectAddress:objectAddress
    }
    return this.http.post(`${this.uri}/job/getObjectFromObjectAddress`,data)
  }

  paintRoom(clientUsername,objectAddress,roomX,roomColour){
    const data = {
      clientUsername:clientUsername,
      objectAddress:objectAddress,
      roomX:roomX,
      roomColour:roomColour
    }
    return this.http.post(`${this.uri}/job/paintRoom`,data)
  }



}
