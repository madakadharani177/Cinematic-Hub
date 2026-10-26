package com.cinematichub;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController @RequestMapping("/api/movies") @CrossOrigin(origins="http://localhost:5173")
public class MovieController {
 private final MovieService service;
 public MovieController(MovieService service){this.service=service;}
 @GetMapping public List<Movie> all(@RequestParam(required=false) String search,@RequestParam(required=false) String genre){return service.getMovies(search,genre);}
 @GetMapping("/{id}") public Movie one(@PathVariable Long id){return service.getMovie(id);}
 @PostMapping public Movie add(@Valid @RequestBody Movie movie){return service.addMovie(movie);}
 @PutMapping("/{id}") public Movie update(@PathVariable Long id,@Valid @RequestBody Movie movie){return service.updateMovie(id,movie);}
 @DeleteMapping("/{id}") public void delete(@PathVariable Long id){service.deleteMovie(id);}
}
