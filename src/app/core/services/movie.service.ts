import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private apiService: ApiService) { }

  getTopRevenueMovies(): Observable<Movie[]> {
    return  this.apiService.getAll('movies/toprevenue');
  }
  getMovieDetails(id: number): Observable<Movie>{
    return this.apiService.GetOne('movies', id);
  }
}
