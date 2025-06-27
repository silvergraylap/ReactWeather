import './css/Menu.css'
import { NavLink } from 'react-router-dom'

function Menu() {
   return (
      <header>
         <nav>
            <ul>
               <li>
                  <NavLink to="/">
                     <img src="/images/logo.svg" alt="로고" width="160" />
                  </NavLink>
               </li>
               <li>
                  <NavLink to="/popular">현재 날씨</NavLink>
               </li>
               <li>
                  <NavLink to="/now_playing">5일치 날씨예보</NavLink>
               </li>
               <li>
                  <NavLink to="/upcoming">도시 좌표 찾기</NavLink>
               </li>
               <li style={{ float: 'right' }} className="login">
                  <NavLink to="/login">수정</NavLink>
               </li>
               <li style={{ float: 'right' }} className="login">
                  <NavLink to="/login">삭제</NavLink>
               </li>
            </ul>
         </nav>
      </header>
   )
}

export default Menu
