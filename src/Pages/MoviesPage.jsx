import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MoviesPageStyle.css";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

function MoviesPage() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // media controls
  const [embedUrl, setEmbedUrl] = useState(null);
  const [songList, setSongList] = useState([]);
  const [loadingMedia, setLoadingMedia] = useState(false);

  // ================= SEARCH MOVIES =================
  const searchMovies = async () => {
    if (!searchTerm.trim())
      return setMovies([{ Message: "!! Please Enter Movie Name !!" }]);

    setMovies([{ Message: "Loading..." }]);
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(
      searchTerm
    )}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") setMovies(data.Search);
      else
        setMovies([{ Message: `!! No Movies Found For "${searchTerm}" !!` }]);
    } catch {
      setMovies([{ Message: "!! Error fetching movies !!" }]);
    }
  };

  // ================= OMDB DETAILS (used by showMovieDetails) =================
  const showMovieDetails = async (id) => {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`;
    try {
      const res = await fetch(url);
      const movie = await res.json();
      setSelectedMovie(movie);
      // clear any media state
      setEmbedUrl(null);
      setSongList([]);
    } catch (e) {
      console.error(e);
    }
  };

  // ================= YOUTUBE SEARCH helper =================
  // returns raw items array from YouTube search (with snippet)
  const fetchYouTubeRaw = async (query, maxResults = 8) => {
    const base = "https://www.googleapis.com/youtube/v3/search";
    const params = new URLSearchParams({
      part: "snippet",
      type: "video",
      maxResults: String(maxResults),
      q: query,
      key: YOUTUBE_API_KEY,
    });
    const url = `${base}?${params.toString()}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data?.items || [];
    } catch (e) {
      return [];
    }
  };

  // helper: true if snippet contains the language word (case-insensitive)
  const snippetMentionsLanguage = (item, language) => {
    if (!language) return false;
    const lang = language.trim().toLowerCase();
    if (!lang) return false;
    const fields = [
      item.snippet.title || "",
      item.snippet.description || "",
      item.snippet.channelTitle || "",
    ];
    return fields.some((f) => f.toLowerCase().includes(lang));
  };

  // ================= TRAILER (uses only OMDB Language) =================
  const openTrailerInCard = async (title, omdbLanguage) => {
    setEmbedUrl(null);
    setLoadingMedia(true);

    // build prioritized queries - language-included ones first
    const lang = (omdbLanguage || "").split(",")[0].trim(); // take primary language
    const attempts = [];
    if (lang) {
      attempts.push(`${title} official trailer ${lang}`);
      attempts.push(`${title} trailer ${lang}`);
      attempts.push(`${title} teaser ${lang}`);
    }
    attempts.push(`${title} official trailer`);
    attempts.push(`${title} trailer`);
    attempts.push(`${title} teaser`);

    let finalItem = null;
    for (const q of attempts) {
      const items = await fetchYouTubeRaw(q, 6);
      // prefer items that explicitly mention the language in title/desc/channel
      const langMatch = items.find((it) => snippetMentionsLanguage(it, lang));
      if (langMatch) {
        finalItem = langMatch;
        break;
      }
      if (items.length) {
        // keep first as fallback if no lang match in this query
        finalItem = finalItem || items[0];
      }
    }

    setLoadingMedia(false);
    if (finalItem) {
      setEmbedUrl(`https://www.youtube.com/embed/${finalItem.id.videoId}`);
    } else {
      alert("Trailer not found (original language).");
    }
  };

  // ================= SONGS (uses only OMDB Language) =================
  const openSongsList = async (title, omdbLanguage) => {
    setEmbedUrl(null);
    setLoadingMedia(true);

    const lang = (omdbLanguage || "").split(",")[0].trim().toLowerCase();

    // Build search queries (language-first)
    const queries = [];
    if (lang) {
      queries.push(`${title} ${lang} songs`);
      queries.push(`${title} songs ${lang}`);
      queries.push(`${title} soundtrack ${lang}`);
      queries.push(`${title} jukebox ${lang}`);
    }
    queries.push(`${title} songs`);
    queries.push(`${title} jukebox`);
    queries.push(`${title} full songs`);
    queries.push(`${title} movie songs`);

    let langMatches = []; // Songs containing the language word
    let allMatches = []; // All songs (fallback)

    for (const q of queries) {
      const items = await fetchYouTubeRaw(q, 15);

      if (!items.length) continue;

      // collect all raw matches (these will be fallback)
      if (allMatches.length < 10) {
        allMatches = [...allMatches, ...items];
      }

      // high accuracy → lang-based ranking, NOT strict filtering
      const softMatches = items.filter((it) =>
        snippetMentionsLanguage(it, lang)
      );

      if (softMatches.length) {
        langMatches = [...langMatches, ...softMatches];
      }

      // stop early only if we already have enough good data
      if (langMatches.length >= 3 || allMatches.length >= 6) break;
    }

    setLoadingMedia(false);

    // FINAL SONG SELECTION LOGIC
    let finalList = [];

    // 1. Prefer language matches
    if (langMatches.length >= 3) {
      finalList = langMatches.slice(0, 4);
    } else {
      // 2. Fill with allMatches while trying to keep original language near top
      const merged = [
        ...langMatches,
        ...allMatches.filter((m) => !langMatches.includes(m)),
      ];

      if (!merged.length) {
        alert("Songs not found for this movie.");
        return;
      }

      finalList = merged.slice(0, 4);
    }

    // Map to required format
    const picked = finalList.map((it) => ({
      title: it.snippet.title,
      videoId: it.id.videoId,
    }));

    setSongList(picked);
    setEmbedUrl(`https://www.youtube.com/embed/${picked[0].videoId}`);
  };

  const playSongByVideoId = (videoId) => {
    setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
  };

  const logout = () => {
    localStorage.removeItem("session"); // clear encrypted session
    navigate("/");
  };

  return (
    <div className="main-wrapper">
      <div id="moviePage">
        <div className="movie-header">
          <h1>
            🎬 <span className="gold-title">Movie Explorer</span> 📽️
          </h1>

          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>

        {/* SEARCH / RESULTS */}
        {!selectedMovie && (
          <>
            <div className="search-bar">
              <div className="search-row">
                <input
                  id="searchInput"
                  placeholder="Enter movie name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") searchMovies();
                  }}
                />
                <button onClick={searchMovies}>🔍 Search</button>
                {/* Back next to search - clears input/results */}
                <button
                  className="back-search-btn"
                  onClick={() => {
                    setSearchTerm("");
                    setMovies([]);
                  }}
                >
                  ⬅ Back
                </button>
              </div>
            </div>

            <ul id="movieList">
              {movies.map((movie, i) =>
                movie.Message ? (
                  <p key={i} className="ms1">
                    {movie.Message}
                  </p>
                ) : (
                  <li
                    className="movie-card"
                    key={i}
                    onClick={() => showMovieDetails(movie.imdbID)}
                  >
                    <div className="poster-container">
                      <img
                        src={
                          movie.Poster !== "N/A"
                            ? movie.Poster
                            : "https://dummyimage.com/200x300/1e2a38/fff&text=No+Poster"
                        }
                        alt={movie.Title}
                      />
                    </div>
                    <h3>{movie.Title}</h3>
                    <p>Year: {movie.Year}</p>
                  </li>
                )
              )}
            </ul>
          </>
        )}

        {/* MOVIE DETAIL + MEDIA */}
        {selectedMovie && (
          <div className="movie-detail-card">
            <div className="poster-container">
              <img
                src={
                  selectedMovie.Poster && selectedMovie.Poster !== "N/A"
                    ? selectedMovie.Poster
                    : "https://dummyimage.com/280x420/1e2a38/ffffff&text=No+Poster"
                }
                alt={selectedMovie.Title}
              />
            </div>

            <div className="details">
              <h2>
                {selectedMovie.Title} ({selectedMovie.Year})
              </h2>
              <p>{selectedMovie.Plot}</p>
              <p>
                <b>Release Date:</b> {selectedMovie.Released}
              </p>
              <p>
                <b>Actors:</b> {selectedMovie.Actors}
              </p>
              <p>
                <b>Genre:</b> {selectedMovie.Genre}
              </p>
              <p>
                <b>Language:</b> {selectedMovie.Language}
              </p>
              <p className="rating">⭐ {selectedMovie.imdbRating}</p>

              <div className="media-buttons">
                <button
                  className="openTrailer"
                  onClick={() =>
                    openTrailerInCard(
                      selectedMovie.Title,
                      selectedMovie.Language
                    )
                  }
                >
                  ▶ Watch Trailer
                </button>

                <button
                  className="openTrailer"
                  onClick={() =>
                    openSongsList(selectedMovie.Title, selectedMovie.Language)
                  }
                >
                  ♫ Songs
                </button>

                <button
                  className="back-btn"
                  onClick={() => {
                    setEmbedUrl(null);
                    setSongList([]);
                    setSelectedMovie(null);
                  }}
                >
                  🔙 Back to Search
                </button>
              </div>

              <div className="media-area">
                {loadingMedia && <p className="ms1">Loading media...</p>}

                {songList?.length > 0 && (
                  <div className="songs-container">
                    <h4>Top Songs (attempting original language)</h4>
                    <div className="song-buttons">
                      {songList.map((s, idx) => (
                        <button
                          key={s.videoId}
                          className="song-item"
                          onClick={() => playSongByVideoId(s.videoId)}
                          title={s.title}
                        >
                          {idx + 1}.{" "}
                          {s.title.length > 56
                            ? s.title.slice(0, 56) + "…"
                            : s.title}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {embedUrl && (
                  <div className="iframe-wrap">
                    <iframe
                      title="media-player"
                      src={embedUrl + "?autoplay=1"}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    <div style={{ marginTop: 8 }}>
                      <button
                        className="close-btn"
                        onClick={() => {
                          setEmbedUrl(null);
                        }}
                      >
                        Close Player
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* FOOTER at bottom only when scrolled */}
      <footer className="footer-note page-footer">
        © 2025 Movie Explorer — Personal Project.
        <br />
        Not Affiliated with any Streaming Service.
      </footer>
    </div>
  );
}

export default MoviesPage;
