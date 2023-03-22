import React from 'react';
import Banner from '../../components/Banner'
import Row from '../../components/Row'
import requests from '../../api/requests'

const MainPage = () => {
    return (
        <div>
            <Banner/>
                <Row
                    title = "NETFLIX ORIGINALS"
                    id = "NO"
                    fetchUrl ={requests.fetchNetflixOriginals}
                    isLargeRow = {true}
                />
                <Row
                    title = "Trending Now"
                    id = "TN"
                    fetchUrl ={requests.fetchTrending}
                    isLargeRow = {false}
                />
                <Row
                    title = "Top Rated"
                    id = "TR"
                    fetchUrl ={requests.fetchTopRated}
                    isLargeRow = {false}
                />
                <Row
                    title = "Action Movies"
                    id = "AM"
                    fetchUrl ={requests.fetchActionMovies}
                    isLargeRow = {false}
                />
                <Row
                    title = "Comedy Movies"
                    id = "CM"
                    fetchUrl ={requests.fetchComedyMovies}
                    isLargeRow = {false}
                />
        </div>
    );
};

export default MainPage;