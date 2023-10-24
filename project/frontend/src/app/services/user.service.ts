import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  deleteObject(usernameFrom,objectAddressFrom){
    const data = {
      username: usernameFrom,
      objectAddress:objectAddressFrom
    }
    return this.http.post(`${this.uri}/users/deleteObject`, data)
  }

  addObject(usernameFrom,objectFrom){
    const data = {
      username: usernameFrom,
      object:objectFrom
    }
    return this.http.post(`${this.uri}/users/addObject`, data)
  }


  changePassword(usernameFrom,newPasswordFrom){
    const data = {
      username: usernameFrom,
      newPassword:newPasswordFrom
    }
    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  getUser(usernameFrom){
    const data = {
      username: usernameFrom
    }
    return this.http.post(`${this.uri}/users/getUser`, data)
  }

  declineUser(usernameFrom){
    const data = {
      username: usernameFrom
    }
    return this.http.post(`${this.uri}/users/declineUser`, data)
  }

  deleteUser(usernameFrom){
    const data = {
      username: usernameFrom
    }
    return this.http.post(`${this.uri}/users/deleteUser`, data)
  }

  acceptUser(usernameFrom){
    const data = {
      username: usernameFrom
    }
    return this.http.post(`${this.uri}/users/acceptUser`, data)
  }

  getAllUsers(){
    return this.http.get(`${this.uri}/users/getAllUsers`)
  }


  login(usernameFromForm, passwordFromForm){
    const data = {
      username: usernameFromForm,
      password: passwordFromForm
    }

    return this.http.post(`${this.uri}/users/login`, data)
  }

  register(usernameFrom, passwordFrom, phoneNumberFrom, emailFrom, typeForm,firstnameFrom,lastnameFrom,agencyNameFrom,addressFrom,idNumberFrom,descriptionFrom,photoStringFrom){
    const data = {
      username: usernameFrom,
      password: passwordFrom,
      phoneNumber: phoneNumberFrom,
      email: emailFrom,
      type: typeForm,
      firstname: firstnameFrom,
      lastname: lastnameFrom,
      agencyName: agencyNameFrom,
      address: addressFrom,
      idNumber:idNumberFrom,
      description: descriptionFrom,
      photoString: photoStringFrom
    }

    return this.http.post(`${this.uri}/users/register`, data)
  }
}
