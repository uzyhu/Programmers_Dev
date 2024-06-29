import React from "react";

interface MyProps {
    weather : string;
    children : React.ReactNode; //컴포넌트의 자식요소 라는 뜻
}

const MyWeather : React.FC<MyProps>= ({children, weather}) => {
    // const {children, weather} = props;

    return(
        <div>
            {children}<p></p>
            오늘의 날씨는 {weather} 입니다.
        </div>
    )
}

export default MyWeather;