import React, {useState} from 'react';
import Nav from "../../components/BottomNavigation";
import Feed from "./FeedPage";
/* 프로필 페이지 import */
import ProfilePage from "./ProfilePage";

function Main() {
    const [position, setPosition] = useState('home')

    const getPosition = (position) =>{
        setPosition(position);
    }
    let currentPage;
    if(position==='feed'){
        currentPage = <Feed />
    } else if(position==='global'){
        currentPage = <div>global</div>
    } else if(position==='home'){
        currentPage = <div>home</div>
    } else if(position==='garden'){
        currentPage = <div>garden</div>
    } else if(position==='profile'){
        currentPage = <ProfilePage></ProfilePage>
    } else{
        currentPage = <div>404</div>
    }
    return(
        <div>
           {currentPage} 
            <Nav position = {position} getPosition = {getPosition}></Nav>
        </div>
    )
}

export default Main;