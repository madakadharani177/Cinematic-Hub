package com.cinematichub;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
@Entity @Table(name="movies")
public class Movie {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @NotBlank @Column(nullable=false) private String title;
 @NotBlank @Column(nullable=false) private String genre;
 @Min(1888) @Max(2100) private int releaseYear;
 @DecimalMin("0.0") @DecimalMax("10.0") private double rating;
 private String duration;
 @Column(length=2000) private String overview;
 @Column(length=1000) private String posterUrl;
 @Column(length=1000) private String backdropUrl;
 @Column(length=1000) private String castNames;
 @Column(length=1000) private String trailerUrl;
 public Movie() {}
 public Movie(String title,String genre,int releaseYear,double rating,String duration,String overview,String posterUrl,String backdropUrl,String castNames,String trailerUrl) {
  this.title=title;this.genre=genre;this.releaseYear=releaseYear;this.rating=rating;this.duration=duration;this.overview=overview;this.posterUrl=posterUrl;this.backdropUrl=backdropUrl;this.castNames=castNames;this.trailerUrl=trailerUrl;
 }
 public Long getId(){return id;} public void setId(Long v){id=v;}
 public String getTitle(){return title;} public void setTitle(String v){title=v;}
 public String getGenre(){return genre;} public void setGenre(String v){genre=v;}
 public int getReleaseYear(){return releaseYear;} public void setReleaseYear(int v){releaseYear=v;}
 public double getRating(){return rating;} public void setRating(double v){rating=v;}
 public String getDuration(){return duration;} public void setDuration(String v){duration=v;}
 public String getOverview(){return overview;} public void setOverview(String v){overview=v;}
 public String getPosterUrl(){return posterUrl;} public void setPosterUrl(String v){posterUrl=v;}
 public String getBackdropUrl(){return backdropUrl;} public void setBackdropUrl(String v){backdropUrl=v;}
 public String getCastNames(){return castNames;} public void setCastNames(String v){castNames=v;}
 public String getTrailerUrl(){return trailerUrl;} public void setTrailerUrl(String v){trailerUrl=v;}
}
