import axios from 'axios'
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const AUTH_KEY = import.meta.env.VITE_OPEN_API_KEY

const tmdbApi = axios.create({
   baseURL: BASE_URL,
})

// 현재날씨, 5일치 날씨예보, 도시 좌표 찾기
export const nowWeather = async (category = 'popular', page = 1) => {
   const response = await tmdbApi.get(`/movie/${category}`, {
      params: {
         language: 'ko-KR',
         page,
         region: 'KR',
      },
   })

   return response
}

// 현재 날씨 불러오기
export const getMovieDetails = async (movieId) => {
   const response = await tmdbApi.get(`/movie/${movieId}`, {
      params: {
         language: 'ko-KR',
      },
   })

   return response
}

//5일치 날씨예보 불러오기
export const getMovieCredits = async (movieId) => {
   //https://api.themvio
   const response = await tmdbApi.get(`/movie/${movieId}/credits`, {
      params: {
         language: 'ko-KR',
      },
   })
   return response
}

//도시 좌표 검색 결과 불러오기
export const searchMovie = async (query, page = 1) => {
   //query = 검색어

   //https://api.themoviedb.org/3/search/movie?query=검색어&include_adult=false&language=ko-KR&page=1&region=KR
   const response = await tmdbApi.get('', {
      params: {
         query: query,
         page: page,
         language: ko - KR,
         include_adult: false,
         region: 'KR',
      },
   })

   return response
}

export default tmdbApi
