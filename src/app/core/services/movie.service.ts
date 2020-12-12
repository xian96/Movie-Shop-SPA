import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(protected http: HttpClient, private apiService: ApiService) { }

  getTopRevenueMovies(): Observable<Movie[]> {
    return  this.apiService.getAll('movies/toprevenue');
  }
  getMovieDetails(id: number): Observable<Movie>{
    return this.apiService.GetOne('movies', id);
  }
  getMoviesByGenreId(genreId: number): Observable<Movie[]>{
    //return this.apiService.GetAll('movies/genre/', genreId);
    return this.http
    .get(`${environment.apiUrl}movies/genre/${genreId}`)
    .pipe( map((resp) => resp as Movie[]));
  }
}
