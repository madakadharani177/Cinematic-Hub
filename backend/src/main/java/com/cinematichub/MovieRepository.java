package com.cinematichub;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
public interface MovieRepository extends JpaRepository<Movie,Long> {
 @Query("SELECT m FROM Movie m WHERE (:search IS NULL OR LOWER(m.title) LIKE LOWER(CONCAT('%',:search,'%')) OR LOWER(m.castNames) LIKE LOWER(CONCAT('%',:search,'%'))) AND (:genre IS NULL OR LOWER(m.genre)=LOWER(:genre))")
 List<Movie> searchMovies(@Param("search") String search,@Param("genre") String genre);
}
