import { Injectable } from '@angular/core';
import { Login } from 'src/app/shared/models/login';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { JwtStorageService } from './jwt-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private apiService: ApiService, private jwtStorageService: JwtStorageService) { }

  // login component will call this one
  login(userLogin: Login): Observable<boolean> {
    return this.apiService.Create('account/login', userLogin)
    .pipe(
      map((response) => {
        if (response) {
          console.log(response);
          //once we get the jwt token angualr will save that token in local sotage
          this.jwtStorageService.saveToken(response.token);
          //then decode that token adn fill ip use r obect

          return true;
        }
        return false;

      })
    );
  }

  //sign-up component will call thsi one 
  register() {

  }

  // from header when we click on logout it will call this one 
  logout() {

  }
}
