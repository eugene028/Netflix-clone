import axios from 'axios';

const instance = axios.create({
    baseURL:"https://api.themoviedb.org/3",
    params : {
        api_key: "57714d9483d800f407ee906a39c8fa26",
        language : "ko-KR",
    },
});

export default instance;