import React, { useState, useEffect, useRef } from "react";
import Flower from "../../components/homepage/flower/Flower";
import Info from "../../components/homepage/Info";
import Noti from "../../components/homepage/Noti";
import { ReactComponent as EditIcon } from "../../assets/HomeAsset/edit.svg";
import styles from "./HomePage.module.css";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import GrowProgressBar from "../../components/homepage/GrowProgressBar";
import { gsap } from "gsap";
import rainObjectData from "../../assets/HomeAsset/53484-digital-clouds-rain.json";
import rainAnimationData from "../../assets/HomeAsset/81756-rain.json";
import sunObjectData from "../../assets/HomeAsset/22190-sunny-day.json";
import Lottie from "react-lottie";
import ChangeFlowerNamemodal from "../../components/homepage/ChangeFlowerNamemodal";
import DayBackground from "../../assets/HomeAsset/home-sample-background-img-day.jpg";
import NightBackground from "../../assets/HomeAsset/home-sample-background-img-night.png";
import "./HomePage.css";
import { motion } from "framer-motion"

const Title = styled.h1`
  color: #007bff;
  font-size: 32px;
  ${(props) =>
        `transform: translateY(${props.translateY}px); 
   opacity: ${props.opacity};
  `}
`;

const WeatherAnimation = styled.div`
  position: relative;
  width: 100%;
  hegiht: 100%;
`;

const HomePageDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 20px;
    gap: 8px;
    isolation: isolate;
    position: relative;
    
    background-image: url(${(p) => p.url});
    background-repeat:no-repeat;
    background-size: cover;
    overflow: hidden;
`;

const FlowerMessageText = styled.div`
position: absolute;
width: 235px;
height: 171px;
left: 0px;
top: 0px;

font-family: 'Inter';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
display: flex;
align-items: center;
text-align: center;
justify-content: center;
color: #000000;
padding: 20px;
`;


const makeNewSeed = () => { };

const flowering = () => {
    console.log("개화 시작");
    return (
        <>
            <button>개화</button>
        </>
    );
};


// 낮인지 확인하는 메소드
const isDay = (hour) => {
    if (hour >= 6 && hour < 18) {
        return true;
    }
    else {
        return false;
    }
}

const show = {
    opacity: 1,
    display: "block",
    scale: 1
  };
  
  const hide = {
    opacity: 0,
    transitionEnd: {
      display: "none"
    }
  };
  

const Home = () => {
    const sunBox = useRef();
    const rainBox = useRef();
    const sunshine = useRef();
    const rain = useRef();
    const [elementStatus, setElementStatus] = useState("");
    const [sunAnimation, setSunAnimation] = useState(null);
    const [rainAnimation, setRainAnimation] = useState(null);
    const [changeFlowerNamemodal, setChangeFlowerNamemodal] = useState(false);
    let backgroundImgUrl;

    const [elementImg, setElementImg] = useState(require("../../assets/HomeAsset/sun-img.png"));
    const [flowerInfo, setFlowerInfo] = useState({
        existence: "", // 존재 여부
        name: "", // 이름
        sunElementCount: 0,
        rainElementCount: 0,
        CurrentGrowthValue: 0,
        MaxGrowthValue: 100,
    });

    const flowerMessageArr = ["하하", "히히", "호호"];

    const [flowerMessage, setFlowerMessage] = useState(null);
    const [flowerMessageIsVisible, setFlowerMessageIsVisible] = useState(true);

    // ----------------------- 시간에 따른 배경화면 지정 -------------------------
    let currentHour = 20;
    if (isDay(currentHour)) {
        backgroundImgUrl = DayBackground;
    }
    else {
        backgroundImgUrl = NightBackground;
    }

    useEffect(() => {
        // --------------------- 꽃 상태 받아옴 (empty/ normal / fullfilled) 시작 ---------------------

        setFlowerInfo({
            existence: "fulfilled", // 존재 여부
            name: "명식이", // 이름
            sunElementCount: 20, // 태양 요소 개수
            rainElementCount: 20, // 빗물 요소 개수
            CurrentGrowthValue: 60, // 현재 고정 값
            MaxGrowthValue: 100, // 최대 값
        }); // flower 상태 일반 상태로 부여

        // --------------------- 꽃 상태 받아옴 (empty/ normal / fullfilled) 끝 ---------------------

        /*
                꽃 정보에 따른 추가 작업
            */
        if (flowerInfo.flowerExistence === "empty") {
            // 현재 키우고 있는 꽃이 없을 경우
            makeNewSeed(); // 새로운 꽃을 만든다.
        } else if (flowerInfo.flowerExistence === "fulfilled") {
            // 현재 키우고 있는 꽃이 있고 게이지가 가득 찬 경우
            flowering();
        }

        setInterval(function () {
            const value = Math.floor(Math.random() * 2);
            console.log(value);
            setFlowerMessageIsVisible(true);
            setFlowerMessage(
                <motion.div
                    className="flowerMessage"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={flowerMessageIsVisible ? show : hide}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <FlowerMessageText>
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.1 }}
                        >
                            {flowerMessageArr[value]}
                        </motion.span>
                    </FlowerMessageText>
                </motion.div>
            );

            setTimeout(() => { 
                console.log("닫혀라!");
                setFlowerMessageIsVisible(!flowerMessageIsVisible);
                setFlowerMessage(null);        
             }, 7000);
        }, 10000);


    }, []);

    const sunClick = () => {
        // 해 버튼을 클릭 했을 경우,
        console.log("clicked - sun");
        setElementImg(require("../../assets/HomeAsset/sun-img.png"));
        setElementStatus("sun");
        const sunObjectOptions = {
            autoplay: true,
            animationData: sunObjectData,
        };
        if (flowerInfo.sunElementCount < 1) {
            alert("햇빛의 양이 부족합니다.")
            return;
        }
        // 서버랑 통신해서 sun이 소진되었다고 전송
        flowerInfo.sunElementCount--;
        flowerInfo.CurrentGrowthValue++;
        setSunAnimation(
            <>
                <div ref={sunBox}>
                    <Lottie options={sunObjectOptions} height={1000} width={1000} />
                </div>
                <div className={styles.SunShine} ref={sunshine}></div>
            </>
        );
    };

    const rainClick = () => {
        // 비 버튼을 클릭 했을 경우,
        console.log("clicked - rain");
        setElementImg(require("../../assets/HomeAsset/rain-img.png"));
        setElementStatus("rain");
        const rainAnimationOptions = {
            // loop: true,
            autoplay: true,
            animationData: rainAnimationData,
        };
        // 서버랑 통신해서 rain이 소진되었다고 전송
        if (flowerInfo.rainElementCount < 1) {
            alert("빗물의 양이 부족합니다.")
            return;
        }
        flowerInfo.rainElementCount--;
        flowerInfo.CurrentGrowthValue++;
        const rainObjectOptions = {
            autoplay: true,
            animationData: rainObjectData,
        };
        setRainAnimation(
            <WeatherAnimation>
                {/* <div ref={rainBox} className={styles.raindrop}>
                <Lottie options={rainObjectOptions} height={600} width={600} />
            </div> */}
                <Lottie ref={rain} options={rainAnimationOptions} height={400} width={400} />
            </WeatherAnimation>
        );
    };

    const guideClick = () => {
        // info 버튼을 클릭 했을 경우,
        // 도움말 페이지로 라우팅
        console.log("clicked - info");
    };

    const notiClick = () => {
        // noti 버튼을 클릭 했을 경우,
        // 알림 페이지로 라우팅
        console.log("clicked - noti");
    };

    const flowerNameClick = () => {
        console.log("clicked - name");
        setSunAnimation(null);
        setRainAnimation(null);
        setChangeFlowerNamemodal(true);
    };

    const ChangeFlowerNameOnclick = (newName) => {
        console.log("바꾸기 시작");
        console.log("새로운 이름", newName);
        flowerInfo.name = newName;
        setChangeFlowerNamemodal(false);
    };

    const CancelChangingFlowerNameOnclick = () => {
        setChangeFlowerNamemodal(false);
    };

    useEffect(() => {
        if (elementStatus === "sun") {
            console.log("useEffect");
            setRainAnimation(null);
            let sunTimeLine = gsap.timeline();
            sunTimeLine.fromTo(
                sunBox.current,
                { y: "-2000" },
                {
                    y: "-600",
                }
            );
            sunTimeLine.fromTo(
                sunshine.current,
                { y: "-1000" },
                {
                    y: "0",
                    duration: 2,
                }
            );
            sunTimeLine.to(sunshine.current, {
                y: "-2000",
            });
            sunTimeLine.to(sunBox.current, { y: "-2000" });
            setElementStatus("");
            // setTimeout(function() {
            //     if(Animation !== null){
            //         setAnimation(null);
            //     }
            //   }, 10000);
        } else if (elementStatus === "rain") {
            setSunAnimation(null);
            let rainTimeLine = gsap.timeline();
            rainTimeLine.fromTo(
                rainBox.current,
                { y: "-1000" },
                {
                    y: "0",
                    duration: 2,
                }
            );
            rainTimeLine.to(rainBox.current, { y: "-2000" });
            // timeLine.fromTo(rain.current, {y: "0"}, {y: "-2000"});
            setElementStatus("");
        }
    }, [elementStatus]);

    return (
        <HomePageDiv url={backgroundImgUrl}>
            <div className={styles.HomeRoot}>
                {
                    changeFlowerNamemodal == true ? <ChangeFlowerNamemodal oldName={flowerInfo.name} changeOnclick={ChangeFlowerNameOnclick} cancelOnclick={CancelChangingFlowerNameOnclick} /> : null
                }
                {sunAnimation}
                {rainAnimation}
                <div className={styles.HomeHeader}>
                    <Link to="/guide">
                        <Info onClick={guideClick} />
                    </Link>
                    <Link to="/notification">
                        <Noti onClick={notiClick} />
                    </Link>
                </div>
                {flowerMessage}
                <div className={styles.FlowerInfo}>
                    <div className={styles.FlowerName}>
                        <span className={styles.FlowerNameText}>{flowerInfo.name}</span>
                        <EditIcon width={15} onClick={flowerNameClick} />
                    </div>
                    <GrowProgressBar
                        CurrentGrowthValue={flowerInfo.CurrentGrowthValue}
                        MaxGrowthValue={flowerInfo.MaxGrowthValue}
                    ></GrowProgressBar>
                </div>
                <div className={styles.FlowerItem}>
                    <div className={styles.RainDiv} onClick={rainClick}>
                        <img className={styles.SunRainImg} src={require("../../assets/HomeAsset/rain-img.png")} />
                        <div className={styles.SunRainText}>{flowerInfo.rainElementCount}</div>
                    </div>
                    <div className={styles.SunDiv} onClick={sunClick}>
                        <img className={styles.SunRainImg} src={require("../../assets/HomeAsset/sun-img.png")} />
                        <div className={styles.SunRainText}>{flowerInfo.sunElementCount}</div>
                    </div>
                </div>
                <div className={styles.Flowerpot}>
                    <Flower></Flower>
                </div>
            </div>
        </HomePageDiv>
    );
};

export default Home;
