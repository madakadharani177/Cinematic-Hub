
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export async function getMovies(search = '', genre = 'All') {
  const response = await api.get('/movies', {
    params: { search, genre }
  });

  return response.data;
}

export async function getMovie(id) {
  const response = await api.get(`/movies/${id}`);
  return response.data;
}

export async function addMovie(movie) {
  const response = await api.post('/movies', movie);
  return response.data;
}

export async function updateMovie(id, movie) {
  const response = await api.put(`/movies/${id}`, movie);
  return response.data;
}

export async function deleteMovie(id) {
  const response = await api.delete(`/movies/${id}`);
  return response.data;
}
