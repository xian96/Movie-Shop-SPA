import { Component, OnInit } from '@angular/core';
import { MovieService } from '../core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../shared/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  genreId: number;
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      p => {
        this.genreId = + p.get('id');
        console.log(this.genreId);
        // make a call to movie service to get moe details;
        this.movieService.getMoviesByGenreId(this.genreId).subscribe(
          m => {
            this.movies = m;
            alert(`m is : ${m}`);
          }
        );
      }
    );
  }

}
