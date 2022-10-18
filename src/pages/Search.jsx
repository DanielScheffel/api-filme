import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CardMovie from '../components/CardMovie';

const searchURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

import './MovieGrid.css';

const Search = () => {

    const [searchParams] = useSearchParams();

    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");

    const getSearchMovie = async (url) => {
        const resposta = await fetch(url);
        const data = await resposta.json();

        setMovies(data.results);
    };

    useEffect(() => {

        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`;

        getSearchMovie(searchWithQueryURL);
    }, [query])

    return(
        <div className="container">
            <h2 className="title">Resultados para: <span className="query-text">{query}</span></h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && 
                movies.map((movie) => <CardMovie key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Search;