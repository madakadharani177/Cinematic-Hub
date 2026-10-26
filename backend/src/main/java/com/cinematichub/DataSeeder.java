package com.cinematichub;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class DataSeeder {
 @Bean CommandLineRunner seed(MovieRepository repo){return args->{
  if(repo.count()>0)return;
  repo.save(new Movie("Interstellar","Sci-Fi",2014,8.7,"2h 49m","A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars.","https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg","https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg","Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine","https://www.youtube.com/results?search_query=Interstellar+official+trailer"));
  repo.save(new Movie("Inception","Sci-Fi",2010,8.8,"2h 28m","A thief who steals secrets through dreams is offered a chance to plant an idea.","https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg","https://image.tmdb.org/t/p/w1280/s3TBrRGB1iav7gFOCNx3H31MoES.jpg","Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy","https://www.youtube.com/results?search_query=Inception+official+trailer"));
  repo.save(new Movie("Dune: Part Two","Adventure",2024,8.5,"2h 46m","Paul Atreides joins the Fremen while seeking justice for his family.","https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg","https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg","Timothée Chalamet, Zendaya, Rebecca Ferguson, Javier Bardem","https://www.youtube.com/results?search_query=Dune+Part+Two+official+trailer"));
  repo.save(new Movie("The Dark Knight","Action",2008,9.0,"2h 32m","Batman faces the Joker, a criminal mastermind who pushes Gotham into chaos.","https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg","https://image.tmdb.org/t/p/w1280/hqkIcbrOHL86UncnHIsHVcVmzue.jpg","Christian Bale, Heath Ledger, Aaron Eckhart, Gary Oldman","https://www.youtube.com/results?search_query=The+Dark+Knight+official+trailer"));
  repo.save(new Movie("The Martian","Adventure",2015,8.0,"2h 24m","An astronaut stranded on Mars uses science and ingenuity to survive.","https://image.tmdb.org/t/p/w500/5aGhaIH0qtX0g6h9lY8j5p0D2g3.jpg","https://image.tmdb.org/t/p/w1280/5aGhaIH0qtX0g6h9lY8j5p0D2g3.jpg","Matt Damon, Jessica Chastain, Chiwetel Ejiofor","https://www.youtube.com/results?search_query=The+Martian+official+trailer"));
  repo.save(new Movie("Avatar: The Way of Water","Fantasy",2022,7.6,"3h 12m","Jake Sully and Neytiri protect their family in the oceans of Pandora.","https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg","https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg","Sam Worthington, Zoe Saldaña, Sigourney Weaver","https://www.youtube.com/results?search_query=Avatar+The+Way+of+Water+official+trailer"));
 };}
}
