import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// https://job-board-maneesha.herokuapp.com
@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }
  /**
   *  Register user with name, email & password
   */
  sendEmail(): Observable<any> {
    return this.http.get<any>(`http://localhost:5000/twitter/sendMail`);
  }

}
