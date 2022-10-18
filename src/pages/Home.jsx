import { useState, useEffect } from 'react';
import CardMovie from '../components/CardMovie';

import './MovieGrid.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {

    const [topMovies, setTopMovies] = useState([]);

    const getTopRateMovie = async (url) => {
        const resposta = await fetch(url);
        const data = await resposta.json();

        setTopMovies(data.results);
    };

    useState(() => {

        const topRateUrl = `${moviesURL}top_rated?${apiKey}`;

        getTopRateMovie(topRateUrl);
    }, [])

    return(
        <div className="container">
            <h2 className="title">Melhores Filmes:</h2>
            <div className="movies-container">
                {topMovies.length === 0 && <p>Carregando...</p>}
                {topMovies.length > 0 && 
                topMovies.map((movie) => <CardMovie key={movie.id} movie={movie} />)}
            </div>
        </div>
    )
}

export default Home;