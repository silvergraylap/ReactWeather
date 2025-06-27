//작동 불가
//배우지도 않은 것 너무 우겨넣었다. 나중에 확인 받고 시간 나실 때 따로 배울 것

import { useState } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPEN_API_KEY

function OpenWeather() {
   // 1. 상태(State) 변수들 정의
   const [city, setCity] = useState('Seoul')
   const [currentWeather, setCurrentWeather] = useState(null)
   const [forecast, setForecast] = useState(null)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState(null)

   // 2. 도시 이름으로 날씨 정보를 가져오는 함수
   const fetchWeatherByCity = async () => {
      setLoading(true) // 로딩 시작
      setError(null) // 이전 에러 메시지 초기화
      setCurrentWeather(null) // 이전 날씨 데이터 초기화
      setForecast(null) // 이전 예보 데이터 초기화

      try {
         // 3. 현재 날씨와 5일 예보를 동시에 요청
         const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
         const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`

         const [currentWeatherResponse, forecastResponse] = await Promise.all([axios.get(currentWeatherUrl), axios.get(forecastUrl)])

         // 4. 받아온 데이터를 상태에 저장
         setCurrentWeather(currentWeatherResponse.data)

         // 5. 5일 예보 데이터는 하루에 하나(정오 기준)만 필터링해서 저장
         const dailyForecast = forecastResponse.data.list.filter((item) => item.dt_txt.includes('12:00:00'))
         setForecast(dailyForecast)
      } catch (error) {
         // 6. 에러 발생 시 메시지 처리
         setError('도시를 찾을 수 없거나 데이터를 가져오는 데 실패했습니다.')
         console.error('데이터 취득 오류:', error)
      } finally {
         setLoading(false) // 로딩 종료
      }
   }

   // 7. 위도와 경도로 날씨 정보를 가져오는 함수
   const fetchWeatherByCoords = async (lat, lon) => {
      setLoading(true)
      setError(null)
      setCurrentWeather(null)
      setForecast(null)
      setCity('') // 도시 입력창 초기화

      try {
         const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
         const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`

         const [currentWeatherResponse, forecastResponse] = await Promise.all([axios.get(currentWeatherUrl), axios.get(forecastUrl)])

         setCurrentWeather(currentWeatherResponse.data)
         setCity(currentWeatherResponse.data.name) // API로부터 받은 도시 이름으로 업데이트

         const dailyForecast = forecastResponse.data.list.filter((item) => item.dt_txt.includes('12:00:00'))
         setForecast(dailyForecast)
      } catch (error) {
         setError('위치 정보를 가져오는 데 실패했습니다.')
         console.error('데이터 취득 오류:', error)
      } finally {
         setLoading(false)
      }
   }

   // 8. 현재 위치 가져오기 버튼 클릭 시 실행될 함수
   const handleCurrentLocation = () => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            (position) => {
               const { latitude, longitude } = position.coords
               fetchWeatherByCoords(latitude, longitude)
            },
            (err) => {
               setError('위치 정보 사용을 허용해주세요.')
               console.error('Geolocation 오류:', err)
            }
         )
      } else {
         setError('이 브라우저에서는 위치 정보가 지원되지 않습니다.')
      }
   }

   // 9. 화면에 보여줄 JSX
   return (
      <>
         {/* 10. 도시 입력 및 검색 부분 */}
         <input type="text" placeholder="도시명 입력 (예: Seoul)" value={city} onChange={(e) => setCity(e.target.value)} />
         <button onClick={fetchWeatherByCity}>날씨 검색</button>
         <button onClick={handleCurrentLocation}>현재 위치 날씨</button>

         {/* 11. 로딩 및 에러 메시지 표시 */}
         {loading && <p>날씨 정보를 가져오는 중...</p>}
         {error && <p style={{ color: 'red' }}>{error}</p>}

         {/* 12. 현재 날씨 정보 표시 */}
         {currentWeather && (
            <div>
               <h2>{currentWeather.name}의 현재 날씨</h2>
               <img src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`} alt={currentWeather.weather[0].description} />
               <p>날씨: {currentWeather.weather[0].description}</p>
               <p>기온: {currentWeather.main.temp.toFixed(1)} °C</p>
            </div>
         )}

         {/* 13. 5일 예보 정보 표시 */}
         {forecast && forecast.length > 0 && (
            <div>
               <h3>5일간의 날씨 예보 (정오 기준)</h3>
               <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {forecast.map((item) => (
                     <div key={item.dt} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
                        <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
                        <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} />
                        <p>{item.main.temp.toFixed(1)} °C</p>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </>
   )
}

export default OpenWeather
