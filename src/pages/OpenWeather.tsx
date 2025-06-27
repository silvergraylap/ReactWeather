import { useState } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPEN_API_KEY

// 2. json 데이터용 인터페이스
//type Script 문법, 확장명을 ts로 해도 tsx로 해도 작동이 안된다. 나중에 꼭 확인하고 해결 못하면 선생님께 물어볼 것
interface WeatherData {
   weather: [
      {
         description: String //날씨 설명
         icon: String //아이콘 번호
      }
   ]
   main: {
      temp: Number //기온(C,섭씨, 화씨에서 변경)
   }
}

// 3. OpenWeather 함수 정의
function OpenWeather() {
   // 4. useState 선언
   const [city, setCity] = useState('Seoul')
   const [weaterData, setWeatherData] = (useState < WeatherData) | (null > null)

   // 5. 날씨 데이터 취득 부분
   const fetchWeatherData = async () => {
      try {
         const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q={city}&appid=${API_KEY}&units=metric&lang=kr`)
         setWeatherData(response.data)
      } catch (error) {
         console.error('데이터 취득 오류:', error)
      }
   }
   // 6. 취득 데이터 표시 부분
   return (
      <>
         <input type="text" placeholder="지역명 입력" value={city} onChange={(e) => setCity(e.target.value)}></input>

         <button onClick={fetchWeatherData}>날씨 가져오기</button>

         {WeatherData && (
            <div>
               <h2>{city}의 날씨예보</h2>
               <p>
                  <img src={'http://openweathermap.org/img/w' + WeatherData.weather[0].icon + '.png'} alt="날씨예보" />
               </p>
               <p>날씨: {weatherData.weather[0].description}</p>
               <p>기온: {weatherData.main.temp} C</p>
            </div>
         )}
      </>
   )
}

export default OpenWeather
