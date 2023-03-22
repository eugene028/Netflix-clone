import React from 'react';
import styled from 'styled-components';

const PlayBanner = ({movie}) => {
    console.log(movie)
    return (
        <Container>
            <HomeContainer>
                <Iframe 
                    width="640" 
                    height="360" 
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
                    frameborder="0" 
                    allow="autoplay; fullscreen" 
                ></Iframe>
            </HomeContainer>
        </Container>
    );
};

const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:100%;
    height:100vh;
`;

const HomeContainer = styled.div`
    width:100%;
    height:100%;
`;

const Iframe = styled.iframe`
    width:100%;
    height:100%;
    z-index:-1;
    opacity:0.65;
    border:none;

    &::after{
        content:'';
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
    }
`;

export default PlayBanner;