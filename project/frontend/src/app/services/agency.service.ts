import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllAgencies(){
    return this.http.get(`${this.uri}/agency/getAllAgencies`)
  }

  
  deleteComment(agencyUsername,clientUsername){
    const data = {
      usernameAgency: agencyUsername,
      usernameClient: clientUsername
    }
    return this.http.post(`${this.uri}/agency/deleteComment`,data)
  }

  addComment(agencyUsername,clientUsername,text,rating){
    let co = new Comment()
    co.username = clientUsername;
    co.text = text
    co.rating = +rating

    const data = {
      usernameAgency: agencyUsername,
      comment: JSON.stringify(co)
    }
    return this.http.post(`${this.uri}/agency/addComment`,data)
  }

  changeComment(agencyUsername,clientUsername,text,rating){
    let co = new Comment()
    co.username = clientUsername;
    co.text = text
    co.rating = +rating

    const data = {
      usernameAgency: agencyUsername,
      comment: JSON.stringify(co)
    }
    return this.http.post(`${this.uri}/agency/changeComment`,data)
  }

  // findAgenciesByName(searchParamFrom){
  //   const data = {
  //     searchParam: searchParamFrom
  //   }
  //   return this.http.post(`${this.uri}/agency/findAgenciesByName`,data)
  // }
  
  // findAgenciesByAddress(searchParamFrom){
  //   const data = {
  //     searchParam: searchParamFrom
  //   }
  //   return this.http.post(`${this.uri}/agency/findAgenciesByAddress`,data)
  // }

}
