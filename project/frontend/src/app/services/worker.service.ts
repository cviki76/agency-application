import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getWorkersForAgency(agencyUsernameFrom){
    const data = {
      agencyUsername: agencyUsernameFrom
    }
    return this.http.post(`${this.uri}/workers/getWorkersForAgency`, data)
  }

  getWorker(emailFrom){
    const data = {
      email: emailFrom
    }
    return this.http.post(`${this.uri}/workers/getWorker`, data)
  }

  addWorker(firstnameFrom,lastnameFrom,emailFrom,phoneNumberFrom,specializationFrom,agencyUnderFrom){
    const data = {
      firstname:firstnameFrom,
      lastname:lastnameFrom,
      email: emailFrom,
      phoneNumber:phoneNumberFrom,
      specialization:specializationFrom,
      agencyUnder:agencyUnderFrom
    }
    return this.http.post(`${this.uri}/workers/addWorker`, data)
  }
}
