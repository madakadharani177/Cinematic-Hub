package com.cinematichub;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class MovieService {
 private final MovieRepository repository;
 public MovieService(MovieRepository repository){this.repository=repository;}
 public List<Movie> getMovies(String search,String genre){
  if(search!=null && search.isBlank()) search=null;
  if(genre==null || genre.isBlank() || genre.equalsIgnoreCase("All")) genre=null;
  return repository.searchMovies(search,genre);
 }
 public Movie getMovie(Long id){return repository.findById(id).orElseThrow(()->new MovieNotFoundException("Movie not found: "+id));}
 public Movie addMovie(Movie movie){movie.setId(null);return repository.save(movie);}
 public Movie updateMovie(Long id,Movie d){Movie m=getMovie(id);m.setTitle(d.getTitle());m.setGenre(d.getGenre());m.setReleaseYear(d.getReleaseYear());m.setRating(d.getRating());m.setDuration(d.getDuration());m.setOverview(d.getOverview());m.setPosterUrl(d.getPosterUrl());m.setBackdropUrl(d.getBackdropUrl());m.setCastNames(d.getCastNames());m.setTrailerUrl(d.getTrailerUrl());return repository.save(m);}
 public void deleteMovie(Long id){repository.delete(getMovie(id));}
}
