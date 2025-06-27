import { useState } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPEN_API_KEY

// OpenWeather 함수 정의
function OpenWeather() {
   // 1. useState 선언: state 변수 이름(weatherData)
   const [city, setCity] = useState('Seoul')
   // TypeScript 문법인 <WeatherData | null> 부분을 제거했습니다.
   const [weatherData, setWeatherData] = useState(null)

   // 2. 날씨 데이터 취득 부분
   const fetchWeatherData = async () => {
      try {
         // API 요청 URL에서 변수가 제대로 적용되도록 수정했습니다. ('{city}' -> `${city}`)
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`)
         setWeatherData(response.data)
      } catch (error) {
         console.error('데이터 취득 오류:', error)
      }
   }

   // 3. 취득 데이터 표시 부분
   return (
      <>
         <input type="text" placeholder="지역명 입력" value={city} onChange={(e) => setCity(e.target.value)} />
         <button onClick={fetchWeatherData}>날씨 가져오기</button>

         {/* 4. weatherData 변수명의 대소문자 오타를 수정했습니다 (WeatherData -> weatherData) */}
         {weatherData && (
            <div>
               <h2>{city}의 날씨예보</h2>
               {/* 날씨 아이콘을 더 큰 이미지로 가져오도록 URL을 수정했습니다. */}
               <p>
                  <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="날씨 아이콘" />
               </p>
               <p>날씨: {weatherData.weather[0].description}</p>
               <p>기온: {weatherData.main.temp} °C</p>
            </div>
         )}
      </>
   )
}

export default OpenWeather
