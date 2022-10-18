import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import{
    BsHourglassSplit,
    BsFillFileEarmarkTextFill
} from 'react-icons/bs';

import CardMovie from '../components/CardMovie';

import './Movie.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {

    const {id} = useParams();
    const [movie, setMovie] = useState(null);

    const getMovie = async (url) => {
        const resposta = await fetch(url);
        const data = await resposta.json();
        console.log(data);
        setMovie(data);
    }

    useEffect(() => {
        const movieUrl = `${moviesURL}${id}?${apiKey}`;
        getMovie(movieUrl);
    }, []);

    return(
        <div className="movie-page">
            {movie && (
        <>
            <CardMovie movie={movie} showLink={false} />
            <p className="tagline">{movie.tagline}</p>
            <div className="info">
                <h3>
                    <BsHourglassSplit /> Duração:
                </h3>
                <p>{movie.runtime} minutos</p>
            </div>
            <div className="info description">
                <h3>
                    <BsFillFileEarmarkTextFill /> Descrição:
                </h3>
                <p>{movie.overview}</p>
            </div>
        </>
            )}
        </div>
    );
};

export default Movie;