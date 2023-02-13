/* import react */
import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

/* import lib */
import dayjs from "dayjs";

/* import img */

/* import compoents */

/* import module */

/* import css */
import "./LetterStep2Component.css";

const LetterStep2Component = ({ step2Obj }) => {
  const user = useSelector((state) => state.user.userData);
  const [dateObj, setDateObj] = useState(["", ""]);

  useEffect(() => {
    let endDate = dayjs(step2Obj.blossomAt, "YYYY-MM-DD HH:mm:ss").format("YYYY년 MM월 DD일");
    let createDate = dayjs(step2Obj.createdAt, "YYYY-MM-DD HH:mm:ss").format("YYYY년 MM월 DD일");
    setDateObj([createDate, endDate]);
  }, []);

  return (
    <>
      <div className="letter-step2-component">
        <div className="letter-user-nickname-div">
          <p>TO. {user.nickname}</p>
        </div>
        <div className="lettter-content-div">
          <p>
            안녕! {user.nickname}! 그동안 내 성장을 지켜봐주고 많은 도움을 줘서 고마웠어! 나는 {dateObj[0]} 부터 자라기
            시작해서 {dateObj[1]}에 다 자랐어! 너는 나를 키우는 동안 많은 사람들과 [총 소통 횟수]번 소통을 해서 나를
            키워줬구나! 그 중에서 너는 [제일 많이 소통한 사람]와 제일 많은 [소통횟수] 회의 소통을 했구나! 나는 햇빛은 총{" "}
            {step2Obj.light} 번, 빗물은 총 {step2Obj.water} 번 받았어! 나는 지난 시간동안 너와 함께 지내면서 정말
            행복했어. 너도 나와 같은 마음이었으면 좋겠다. 가끔 가든으로 놀러와서 나를 추억해줘! 정말 고마워!
          </p>
        </div>
        <div className="letter-flower-name-div">
          <p>FROM. {step2Obj.name}</p>
        </div>
      </div>
    </>
  );
};

export default LetterStep2Component;