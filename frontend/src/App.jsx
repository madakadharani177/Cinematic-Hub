
import React, { useEffect, useMemo, useState } from 'react';
import {
  Link,
  NavLink,
  Route,
  Routes,
  useParams
} from 'react-router-dom';

import {
  addMovie,
  deleteMovie,
  getMovie,
  getMovies,
  updateMovie
} from './api.js';

const genres = [
  'All',
  'Sci-Fi',
  'Action',
  'Adventure',
  'Fantasy',
  'Drama',
  'Thriller'
];

const placeholder =
  'https://placehold.co/500x750/111827/f2c777?text=Movie+Poster';

const emptyMovie = {
  title: '',
  genre: 'Sci-Fi',
  releaseYear: 2026,
  rating: 7.5,
  duration: '',
  overview: '',
  posterUrl: '',
  backdropUrl: '',
  castNames: '',
  trailerUrl: ''
};

// Safely read the watchlist from localStorage.
function favoritesRead() {
  try {
    return JSON.parse(
      localStorage.getItem('cinematicHubFavorites') || '[]'
    );
  } catch {
    return [];
  }
}

// Reusable image component.
// If the original image fails, try the placeholder only once.
function MovieImage({ src, alt = '', className, ...props }) {
  function handleImageError(event) {
    const image = event.currentTarget;

    if (image.dataset.fallbackApplied === 'true') {
      image.style.visibility = 'hidden';
      return;
    }

    image.dataset.fallbackApplied = 'true';
    image.src = placeholder;
  }

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={className}
      onError={handleImageError}
      {...props}
    />
  );
}

// Navigation header.
function Header() {
  return (
    <header className="topbar">
      <Link className="brand" to="/">
        <b>C</b> CINEMATIC<span>HUB</span>
      </Link>

      <nav>
        <NavLink to="/" end>
          Discover
        </NavLink>

        <NavLink to="/favorites">
          My Watchlist
        </NavLink>

        <NavLink to="/manage">
          Manage Movies
        </NavLink>
      </nav>
    </header>
  );
}

// Reusable movie card.
function Card({ movie, favorites, toggle }) {
  return (
    <article className="card">
      <Link to={`/movie/${movie.id}`} className="poster">
        <MovieImage
          src={movie.posterUrl}
          alt={movie.title}
        />

        <b>★ {Number(movie.rating || 0).toFixed(1)}</b>
      </Link>

      <div className="card-info">
        <small>
          {movie.releaseYear} · {movie.genre}
        </small>

        <Link
          className="movie-title"
          to={`/movie/${movie.id}`}
        >
          {movie.title}
        </Link>

        <div className="card-bottom">
          <small>
            {movie.duration || 'Feature film'}
          </small>

          <button
            type="button"
            onClick={() => toggle(movie.id)}
            aria-label={
              favorites.includes(movie.id)
                ? 'Remove from watchlist'
                : 'Add to watchlist'
            }
          >
            {favorites.includes(movie.id) ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </article>
  );
}

// Discover page with search, genre filtering and sorting.
function Discover({
  movies,
  loading,
  error,
  favorites,
  toggle
}) {
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('All');
  const [sort, setSort] = useState('featured');

  const list = useMemo(() => {
    const filtered = movies.filter((movie) => {
      const searchableText =
        `${movie.title} ${movie.castNames || ''}`.toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase()
      );

      const matchesGenre =
        genre === 'All' ||
        (movie.genre || '').toLowerCase() === genre.toLowerCase();

      return matchesSearch && matchesGenre;
    });

    if (sort === 'rating') {
      filtered.sort(
        (a, b) => Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    if (sort === 'newest') {
      filtered.sort(
        (a, b) =>
          Number(b.releaseYear || 0) -
          Number(a.releaseYear || 0)
      );
    }

    return filtered;
  }, [movies, search, genre, sort]);

  return (
    <>
      <section className="hero">
        <div className="hero-bg"></div>

        <div className="hero-text">
          <p className="eyebrow">THE ART OF CINEMA</p>

          <h1>
            Stories that
            <br />
            <em>stay with you.</em>
          </h1>

          <p>
            Discover unforgettable worlds, legendary performances,
            and films that move us.
          </p>

          <a className="gold-button" href="#films">
            Explore the collection ↘
          </a>

          <div className="stats">
            <span>
              <b>{String(movies.length).padStart(2, '0')}</b>
              <small>FEATURED FILMS</small>
            </span>

            <span>
              <b>∞</b>
              <small>WORLDS TO EXPLORE</small>
            </span>
          </div>
        </div>
      </section>

      <main id="films" className="wrap">
        <div className="heading">
          <div>
            <p className="eyebrow">CURATED FOR YOU</p>
            <h2>
              Explore the <em>collection</em>
            </h2>
          </div>

          <p>
            From distant galaxies to unforgettable city streets.
          </p>
        </div>

        <div className="filters">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="⌕  Search films or cast..."
          />

          <div className="chips">
            {genres.map((item) => (
              <button
                type="button"
                className={genre === item ? 'active' : ''}
                key={item}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
          </select>
        </div>

        {loading ? (
          <p className="notice">
            Loading movies from Java backend…
          </p>
        ) : error ? (
          <p className="notice error">{error}</p>
        ) : (
          <>
            <p className="count">
              {list.length} FILMS FOUND ✦
            </p>

            <div className="grid">
              {list.map((movie) => (
                <Card
                  key={movie.id}
                  movie={movie}
                  favorites={favorites}
                  toggle={toggle}
                />
              ))}
            </div>

            {list.length === 0 && (
              <p className="notice">
                No movies found. Try another search.
              </p>
            )}
          </>
        )}
      </main>
    </>
  );
}

// Individual movie details page.
function Details({ favorites, toggle }) {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    getMovie(id)
      .then((data) => {
        if (active) {
          setMovie(data);
          setError('');
        }
      })
      .catch(() => {
        if (active) {
          setError('Movie not found. Return to Discover.');
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (error) {
    return (
      <main className="wrap page">
        <p>{error}</p>
        <Link className="gold-button" to="/">
          Back to movies
        </Link>
      </main>
    );
  }

  if (!movie) {
    return (
      <p className="notice">
        Loading movie details…
      </p>
    );
  }

  const trailerUrl =
    movie.trailerUrl ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      movie.title + ' trailer'
    )}`;

  return (
    <main
      className="detail"
      style={{
        backgroundImage: `linear-gradient(90deg, #080b12f5, #080b12bb), url("${movie.backdropUrl || movie.posterUrl || placeholder}")`
      }}
    >
      <div className="detail-inner">
        <Link to="/">← Back to collection</Link>

        <div className="detail-grid">
          <MovieImage
            src={movie.posterUrl}
            alt={movie.title}
          />

          <div>
            <p className="eyebrow">
              THE CINEMATIC COLLECTION
            </p>

            <h1>{movie.title}</h1>

            <p className="meta">
              ★ {Number(movie.rating || 0).toFixed(1)} / 10
              {' · '}
              {movie.releaseYear}
              {' · '}
              {movie.duration}
              {' · '}
              {movie.genre}
            </p>

            <p className="overview">
              {movie.overview}
            </p>

            <h3>Starring</h3>
            <p>{movie.castNames}</p>

            <div className="actions">
              <a
                className="gold-button"
                href={trailerUrl}
                target="_blank"
                rel="noreferrer"
              >
                ▶ Watch trailer
              </a>

              <button
                type="button"
                className="secondary"
                onClick={() => toggle(movie.id)}
              >
                {favorites.includes(movie.id)
                  ? '♥ In watchlist'
                  : '♡ Add to watchlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Saved movies page.
function Favorites({ movies, favorites, toggle }) {
  const saved = movies.filter((movie) =>
    favorites.includes(movie.id)
  );

  return (
    <main className="wrap page">
      <p className="eyebrow">SAVED FOR LATER</p>

      <h1>
        My <em>watchlist</em>
      </h1>

      <p className="sub">
        Movies you want to watch.
      </p>

      {saved.length > 0 ? (
        <div className="grid">
          {saved.map((movie) => (
            <Card
              key={movie.id}
              movie={movie}
              favorites={favorites}
              toggle={toggle}
            />
          ))}
        </div>
      ) : (
        <p className="notice">
          Your watchlist is empty. Tap ♡ on a movie to save it.
        </p>
      )}
    </main>
  );
}

// Add/edit movie form.
function MovieForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(
    () => ({ ...emptyMovie, ...(initial || {}) })
  );

  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function change(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function submit(event) {
    event.preventDefault();

    setSaving(true);
    setError('');

    try {
      await onSave({
        ...form,
        releaseYear: Number(form.releaseYear),
        rating: Number(form.rating)
      });
    } catch {
      setError(
        'Could not save the movie. Check the backend and MySQL.'
      );
    } finally {
      setSaving(false);
    }
  }

  const fields = [
    ['title', 'Movie title'],
    ['genre', 'Genre'],
    ['releaseYear', 'Release year'],
    ['rating', 'Rating 0–10'],
    ['duration', 'Duration'],
    ['castNames', 'Cast names'],
    ['posterUrl', 'Poster image URL'],
    ['backdropUrl', 'Backdrop image URL'],
    ['trailerUrl', 'Trailer URL']
  ];

  return (
    <form className="form" onSubmit={submit}>
      <div className="form-grid">
        {fields.map(([name, label]) => (
          <label key={name}>
            {label}

            {name === 'genre' ? (
              <select
                name={name}
                value={form[name] || 'Sci-Fi'}
                onChange={change}
              >
                {genres
                  .filter((item) => item !== 'All')
                  .map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                required={['title', 'releaseYear', 'rating'].includes(name)}
                name={name}
                type={
                  ['releaseYear', 'rating'].includes(name)
                    ? 'number'
                    : 'text'
                }
                value={form[name] ?? ''}
                onChange={change}
              />
            )}
          </label>
        ))}

        <label className="wide">
          Overview

          <textarea
            name="overview"
            rows="3"
            value={form.overview || ''}
            onChange={change}
          />
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="actions">
        <button
          type="submit"
          className="gold-button"
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save movie'}
        </button>

        <button
          type="button"
          className="secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// Movie database management.
function Manage({ movies, refresh }) {
  const [editing, setEditing] = useState(null);
  const [show, setShow] = useState(false);
  const [notice, setNotice] = useState('');

  async function save(movie) {
    if (editing) {
      await updateMovie(editing.id, movie);
    } else {
      await addMovie(movie);
    }

    setEditing(null);
    setShow(false);
    setNotice('Movie saved.');

    await refresh();
  }

  async function remove(movie) {
    if (!window.confirm(`Delete ${movie.title}?`)) {
      return;
    }

    try {
      await deleteMovie(movie.id);
      await refresh();
      setNotice('Movie deleted.');
    } catch {
      setNotice('Delete failed. Check backend connection.');
    }
  }

  return (
    <main className="wrap page">
      <p className="eyebrow">DATABASE MANAGEMENT</p>

      <h1>
        Manage <em>movies</em>
      </h1>

      <p className="sub">
        Add, edit, or delete movie records in MySQL.
      </p>

      {notice && <p className="notice">{notice}</p>}

      {show || editing ? (
        <MovieForm
          key={editing?.id || 'new'}
          initial={editing || emptyMovie}
          onSave={save}
          onCancel={() => {
            setEditing(null);
            setShow(false);
          }}
        />
      ) : (
        <button
          type="button"
          className="gold-button"
          onClick={() => setShow(true)}
        >
          ＋ Add a movie
        </button>
      )}

      <div className="manage-list">
        {movies.map((movie) => (
          <div className="manage-row" key={movie.id}>
            <MovieImage
              src={movie.posterUrl}
              alt={movie.title}
            />

            <div>
              <b>{movie.title}</b>
              <small>
                {movie.releaseYear}
                {' · '}
                {movie.genre}
                {' · '}
                ★ {movie.rating}
              </small>
            </div>

            <button
              type="button"
              className="secondary"
              onClick={() => {
                setEditing(movie);
                setShow(false);
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth'
                });
              }}
            >
              Edit
            </button>

            <button
              type="button"
              className="secondary danger"
              onClick={() => remove(movie)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

// Main application.
export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState(favoritesRead);

  async function refresh() {
    try {
      const data = await getMovies();

      setMovies(data);
      setError('');
    } catch {
      setError(
        'Cannot connect to Java backend at localhost:8080. Start MySQL and Spring Boot.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'cinematicHubFavorites',
      JSON.stringify(favorites)
    );
  }, [favorites]);

  function toggle(id) {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  }

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <Discover
              movies={movies}
              loading={loading}
              error={error}
              favorites={favorites}
              toggle={toggle}
            />
          }
        />

        <Route
          path="/movie/:id"
          element={
            <Details
              favorites={favorites}
              toggle={toggle}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites
              movies={movies}
              favorites={favorites}
              toggle={toggle}
            />
          }
        />

        <Route
          path="/manage"
          element={
            <Manage
              movies={movies}
              refresh={refresh}
            />
          }
        />

        <Route
          path="*"
          element={
            <main className="page wrap">
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </main>
          }
        />
      </Routes>

      <footer>
        <Link className="brand" to="/">
          CINEMATIC<span>HUB</span>
        </Link>

        <small>
          Made for movie lovers · Learning project
        </small>

        <a
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          }}
        >
          Back to top ↑
        </a>
      </footer>
    </div>
  );
}
