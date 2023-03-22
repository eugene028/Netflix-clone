import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../../api/axois";
import styled from 'styled-components';
import { useDebounce } from '../../hooks/useDebounce';

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);
    
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }
    let query  = useQuery();
    //const searchTerm = query.get("q");
    const searchTerm = useDebounce(query.get("q"), 500);
    const fetchSearchMovie = async(searchTerm) => {
        console.log(searchTerm);
        try {
            const request = await axios.get(`/search/multi?include_adult=false&query=${searchTerm}`)
            setSearchResults(request.data.results);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if(searchTerm) {
            fetchSearchMovie(searchTerm);
        }
    }, [searchTerm]);
    console.log(searchResults);

    const renderSearchResults = () => {
        return searchResults.length > 0 ? (
            <SearchContainer>
                {searchResults.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
                        return (
                            <Movie key ={movie.id}>
                                <MoviePosterCol onClick = {() => {navigate(`/${movie.id}`)}}>
                                    <MoviePoster src={movieImageUrl} 
                                    alt = "movie image"/>
                                </MoviePosterCol>
                            </Movie>
                        );
                    }
                })}
            </SearchContainer>
        ) : (
            <NoResults>
                <div className = "no-results__text">
                    <p>찾고자하는 검색어 "{searchTerm}"에 맞는 영화가 없습니다.</p>
                </div>
            </NoResults>
        )
    }

    return renderSearchResults();
};

const NoResults = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    color : #c5c5c5;
    height: 100%;
    padding : 8rem;
`;

const MoviePosterCol = styled.div`
    cursor: pointer;
    transition: transform 0.3s;
    -webkit-transition: transform 0.3s;
    &:hover {
        transform : scale(1.25);
    }
`;

const MoviePoster = styled.img`
    width: 90%;
    border-radius: 5px;
`;

const Movie = styled.div`
    flex : 1 1 auto;
    display: inline-block;
    padding: 0.5rem;
    padding-bottom: 7rem;
`;

const SearchContainer = styled.section`
    width: 100%;
    background-color: black;
    text-align: center;
    padding: 5rem 0;
`;

export default SearchPage;