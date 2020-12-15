import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/shared/models/login';
import { ApiService } from './api.service';
import { JwtStorageService } from './jwt-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/shared/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private user: User;

  private currentLogedInUserSubject = new BehaviorSubject<User> ({} as User);
  public currentLogedInUser = this.currentLogedInUserSubject.asObservable();

  private isUserAuthenticatedSubject = new BehaviorSubject<boolean> (false);
  public isUserAuthenticated = this.isUserAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private jwtStorageService: JwtStorageService,
  ) {}

  // login component will call this one
  login(userLogin: Login): Observable<boolean> {
    return this.apiService.Create('account/login', userLogin).pipe(
      map((response) => {
        if (response) {
          //console.log(response);
          // once we get the JWT token from API,  Angular will save that token in local storage
          this.jwtStorageService.saveToken(response.token);

          // then decode that token and fill up User object
          this.populateLogedInUserInfo();
          return true;
        }
        // console.log('outside if block');
        // console.log(response);
        return false;
      })
    );
  }

  populateLogedInUserInfo(){
    if (this.jwtStorageService.getToken()){
      //const token = this.jwtStorageService.getToken();
      const decodedToken = this.decodeJWT();
      this.currentLogedInUserSubject.next(decodedToken);
      this.isUserAuthenticatedSubject.next(true);
    }

  }

  private decodeJWT(): User | null {
    // first get the token from local storage
    const token = this.jwtStorageService.getToken();
    // we need to check token is not null and check the token is not expired
    if (!token || new JwtHelperService().isTokenExpired(token)) {
      return null;
    }
    // decode the token and create the User Object
    const decodedToken = new JwtHelperService().decodeToken(token);
    console.log(decodedToken);
    this.user = decodedToken;
    return this.user;
  }

  // sign-up component will call this one
  register() {}

  // from header component when we click on logout it will call this method
  logout() {
    //remove token 
    this.jwtStorageService.destoryToken();

    //set current user subject to empty object
    this.currentLogedInUserSubject.next({} as User);

    //set auth user subject to false
    this.isUserAuthenticatedSubject.next(false);
  }
}
