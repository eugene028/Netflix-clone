import React from 'react';
import { useEffect, useState } from 'react';
import axios from '../api/axois';
import requests from '../api/requests';
import styled from'styled-components';
import PlayBanner from './PlayBanner';

//axios instance 생성한 거 잘 보기
const Banner = () => {
    const [movie, setMovie] = useState([]);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        //현재 상영중인 여러 영화 정보 가져오기
        const request = await axios.get(requests.fetchNowPlaying);

        //여러 영화 중 하나의 Id를 가져오기 
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;
        // 특정 영화의 더 상세한 정보 가져오기 (비디오 정보 포함)
        const {data : movieDetail } = await axios.get(`movie/${movieId}`, {
            params: { append_to_response: 'videos' },
        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + '...' : str;
    }

    if (!isClicked) {
        return (
            <>     
                <BannerHeader movieimg = {`${movie.backdrop_path}`}>
                    <BannerContent>
                        <h1 className='banner__title'>{movie.title || movie.name || movie.original_name}</h1>
                        <BannerButtons>
                            <button className ="banner__button play" onClick = {() => setIsClicked(true)}>Play</button>
                            <button className ="banner__button info">More Information</button>
                        </BannerButtons>
                        <BannerDescrip>{truncate(movie.overview, 130)}</BannerDescrip>
                    </BannerContent>
                    <FadeBottom/>
                </BannerHeader>
            </>
        );  
    }
    else {
        return (
            <PlayBanner movie ={movie}/>
        )
    }
    
};


//이새기 갑자기 왜되는지 확인
const BannerHeader = styled.div`
    background-image : ${(props) => `url(${`https://image.tmdb.org/t/p/original/${props.movieimg}`})`}; 
    background-size: cover;
    background-position: top center;
    color: white;
    object-fit: contain;
    height: 448px;
    @media (min-width: 1500px) 
    {
        position: relative;
        height: 600px;
    }
`;

const BannerButtons = styled.div`
    display: flex;
    flex-direction: row;
    .banner__button {
        display: flex;
        flex-direction: row;
        justify-content: start;
        align-items: center;
        cursor: pointer;
        outline: none;
        border: none;
        font-size: 1rem;
        font-weight: 700;
        border-radius: 0.2vw;
        padding: 0.4rem 1.8rem 0.4rem 1rem;
        margin-right: 1rem;
        &:hover{
            color: #000;
            background-color: rgba(170, 170, 170, 0.9);
            transition: all 0.2s;
        }
    }
    .play {
        background-color: white;
        color: black;
    }
    .info {
        background-color: rgba(109, 109, 110, 0.7);
        color: white;
        &:hover{
            background-color: rgb(74, 74, 74);
            color: white;
        }
    }

    @media (max-width: 768px) {
        .info {
            text-align: start;
            padding-right: 1.2rem;
        }
        .banner__button {
            font-size: 0.8rem !important;
            border-radius: 4px !important;
        }
    }
`;

const BannerDescrip = styled.h1`
    width: 45rem;
    line-height: 1.3;
    padding-top: 1rem;
    font-weight: 500;
    font-size: 1rem;
    max-width: 400px;
    height: 80px;
    @media (max-width: 768px) {
        font-size: 0.8rem !important;
        width: auto !important;    
    }
`;

const BannerContent = styled.div`
    margin-left: 40px;
    padding-top: 140px;
    height: 190px;
    @media (max-width: 768px) {
      width: min-content !important;
      padding-left: 2.3rem;
      margin-left: 0px !important;
    }

    .banner__title{
        font-size: 3rem;
        font-weight: 800;
        padding-bottom: 0.5rem;
    }
`;

const FadeBottom = styled.div`
    height: 7.4rem;
    background-image: linear-gradient(
      180deg,
      transparent,
      rgba(37, 37, 37, 0.61),
      #111
    );
    @media (min-width: 1500px) {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 15rem;
    }
`;


export default Banner;