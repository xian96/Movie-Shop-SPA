import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: HttpHeaders;
  constructor(protected http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-type', 'application/json');
   }

  getAll(path: string): Observable<any[]> {

    return this.http
    .get(`${environment.apiUrl}${path}`)
    .pipe( map((resp) => resp as any[]));

  }

  GetOne(path: string, id?: number): Observable<any> {

    let getUrl: string;

    if (id){
      getUrl = `${environment.apiUrl}${path}/${id}`;
    }
    else{
      getUrl = `${environment.apiUrl}${path}`;
    }

    return this.http.get(getUrl)
    .pipe(map((resp) => resp as any));
  }

  Create(path: string, resource: any, options?: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}${path}`, resource, {headers: this.headers} )
    .pipe(map((response) => response));
  }

}
