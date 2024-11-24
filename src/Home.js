import { useEffect, useState } from "react";

const Movies = () => {
    const [movieName, setMovieName] = useState('');
    const [movies, setMovies] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);
    const API_KEY = 'api_key=e40ff6e6db396aee2b98a40b320d0644';
    const BASE_URL = 'https://api.themoviedb.org/3/';
    const DISCOVER_URL = 'discover/movie?sort_by=popularity.desc&';
    const SEARCH_URL = BASE_URL + 'search/movie?' + API_KEY;
    const API_URL = BASE_URL + DISCOVER_URL + API_KEY;
    const IMG_URL = 'https://image.tmdb.org/t/p/w500';

    // Updated useEffect
    useEffect(() => {
        // Define the function inside useEffect to avoid recreating it unnecessarily
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(API_URL);
                if (!res.ok) throw new Error("Could not fetch data :(");
                const data = await res.json();
                setMovies(data.results);
                setErr(null);
            } catch (error) {
                setErr(error.message);
                setMovies(null);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovies();
    }, [API_URL]); // Include API_URL in the dependency array

    const getMovies = (url) => {
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Could not fetch data :(");
                }
                return res.json();
            })
            .then((data) => {
                setMovies(data.results);
                setIsLoading(false);
                setErr(null);
            })
            .catch((err) => {
                setErr(err.message);
                setIsLoading(false);
                setMovies(null);
            });
    };

    const handleColor = (rating) => {
        if (rating >= 8) {
            return "green";
        } else if (rating >= 5) {
            return "orange";
        } else {
            return "red";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (movieName) {
            getMovies(SEARCH_URL + '&query=' + movieName);
        } else {
            getMovies(API_URL);
        }
    };

    return (
        <div>
            <header>
                <form id="form" onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        placeholder="Search"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                        id="search"
                        className="search"
                    />
                </form>
            </header>
            <main id="main">
                {isLoading && <div className="loading">Loading....</div>}
                {err && <div className="error">{err}</div>}
                {movies &&
                    movies.map((movie) => {
                        const { id, poster_path, title, vote_average, overview } = movie;
                        return (
                            <div key={id} className="movie">
                                <img src={IMG_URL + poster_path} alt={title} />
                                <div className="movie-info">
                                    <h3>{title}</h3>
                                    <span className={handleColor(vote_average)}>
                                        {vote_average}
                                    </span>
                                </div>
                                <div className="overview">
                                    <h3>Overview</h3>
                                    {overview}
                                </div>
                            </div>
                        );
                    })}
            </main>
        </div>
    );
};

export default Movies;
