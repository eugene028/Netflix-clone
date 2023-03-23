import React, { useEffect, useState } from 'react';
import axios from '../api/axois';
import styled from'styled-components';
import MovieModal from './MovieModal/MovieModal';

const Row = ({title, id, fetchUrl, isLargeRow}) => {
    const [movies, setMovies] = useState([]);
    const [modal, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState({});
    useEffect(() => {
        fetchMovieData();
    }, [fetchUrl]);

    const fetchMovieData= async() => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
    }

    const handleClick = (movie) => {
        setModalOpen(true);
        setMovieSelected(movie);
    }
    console.log(movieSelected);

    return (
        <>
            <RowList>
                <RowHeader>{title}</RowHeader>
                <Slider>
                    <ArrowLeft className = "left">
                        <Arrow onClick ={() => {
                            document.getElementById(id).scrollLeft -= window.innerWidth - 80;
                        }}>{"<"}</Arrow>
                    </ArrowLeft>
                    <RowPosters id ={id}>
                        {movies.map((movie) => (
                            <img key = {movie.id} className = {`row__poster ${isLargeRow && "row__posterLarge"}`}
                            src={`https://image.tmdb.org/t/p/original/${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name} 
                            onClick = {() => handleClick(movie)}/>
                        ))}
                    </RowPosters>
                    <ArrowRight className = "right" >
                            <Arrow onClick={() => {
                                document.getElementById(id).scrollLeft += window.innerWidth - 80;
                            }}>{">"}</Arrow>
                    </ArrowRight>
                </Slider>
                {
                    modal&& (
                        <MovieModal {...movieSelected} setModalOpen = {setModalOpen} />
                    )
                }
            </RowList>

        </>
    );
};

const RowHeader = styled.h2`
    padding-left: 20px;
`

const RowList = styled.section`
    margin-left: 20px;
    color: white;
`;

const ArrowLeft = styled.div`
    background-clip: content-box;
    padding: 20px 0;
    box-sizing: border-box;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 1000;
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    &:hover{
        background: rgba(20, 20, 20, 0.5);
        transition: 400ms all ease-in-out;
    }
`;

const ArrowRight = styled.div`
    padding: 20px 0;
    background-clip: content-box;
    box-sizing: border-box;
    transition: 400ms all ease-in-out;
    cursor: pointer;
    width: 80px;
    z-index: 1000;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    &:hover{
        background: rgba(20, 20, 20, 0.5);
        transition: 400ms all ease-in-out;
    }
`;

const Slider = styled.div`
    position: relative;
    &:hover .left{
        transition: 400ms all ease-in-out;
        visibility: visible;
    }
    &:hover .right{
        transition: 400ms all ease-in-out;
        visibility: visible;
    }

`

const RowPosters = styled.div`
    display: flex;
    overflow-y: hidden;
    overflow-x: scroll;
    padding: 20px 0 20px 20px;
    scroll-behavior: smooth;
    &::-webkit-scrollbar{
        display: none;
    }
    .row__poster {
        object-fit: contain;
        width: 100%;
        max-height: 144px;
        margin-right: 10px;
        transition: transform 450ms;
        border-radius: 4px;
        &:hover{
            transform: scale(1.08);
        }
    }
    .row__posterLarge{
        max-height: 320px;
        &:hover{
            transform: scale(1.1);
            opacity: 1;
        }
    }

    @media screen and (min-width: 1200px) {
        .row__poster {
            max-height: 160px;
        }
        .row__posterLarge {
            max-height: 360px;
        }
    }
        @media screen and (max-width: 768px) {
        .row__poster {
            max-height: 100px;
        }
        .row__posterLarge {
            max-height: 280px;
        }
    }

`
const Arrow = styled.span`
    transition: 400ms all ease-in-out;
    &:hover {
        transition: 400ms all ease-in-out;
        transform: scale(1.5);
    }
`;

export default Row;