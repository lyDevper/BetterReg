import React, { createContext, useContext, useState } from "react"
import"../App.css";
import"./Registration.css";

import ContentBox from "./ContentBox";

var q = (id) => document.getElementById(id)

var Now = {
    chosens: [],
    searched: ''
};

//-------------------ลองข้อมูล----------------//
var received = {
    courses: [{
        name: 'Calculus I',
        credits: 6,
        No: '2301123',
        sects: [1, 2, 3, 4, 5, 'any']
    }, {
        name: 'Magic Spell I',
        credits: 5,
        No: '2309987',
        sects: [1, 2, 3, 4, 5, 6, 7, 8]
    }, {
        name: 'Muggle Studies I',
        credits: 4,
        No: '2355566',
        sects: [1, 2, 3, 'only', 'any']
    }, {
        name: 'Alchemy I',
        credits: 6,
        No: '2356789',
        sects: [1, 2, 3, 4]
    }, {
        name: 'Astrology I',
        credits: 3,
        No: '2398765',
        sects: ['only']
    }]
}

const nowChosensCtx = createContext();
const Registration=()=>{ //-----------main-------------------------------------------------------------//
    var [nowChosens, setNowChosens] = useState([]); // global in this app for list of chosen courses

    var CourseCard_list = received.courses.map((course) => 
        <CourseCard courseName={course.name} courseNo={course.No} credits={course.credits} sects={course.sects}/>);

    return(
    <nowChosensCtx.Provider value={{get: nowChosens, set: setNowChosens}}>
        <div className="heading">ลงทะเบียนเรียน</div>    
        <ContentBox title="ลงทะเบียนเรียน" content={
            <>
            <CardCtn content={CourseCard_list}/>             
            <BasketLabel/>
            </>
        }/>
            
    </nowChosensCtx.Provider>
    )
}

//--------------------------------------------------------------//
const CardCtn = (props) =>{
    return(
        <div className="cardCtn" id="cardCtn">
            {props.content}
        </div>
    )
}

const CourseCard = (props={courseName:'Cal I', courseNo:'23101', credits:5}) =>{
    var [isChosen, setIsChosen] = useState(false);
    const nowChosens = useContext(nowChosensCtx).get;
    const setNowChosens = useContext(nowChosensCtx).set;
    console.log('nowChosens', nowChosens)

    const [cardData, setCardData] = useState({
        courseName: props.courseName,
        courseNo: props.courseNo,
        credits: props.credits,
        selectedSect: props.sects[0]
    });

    const whenChosen = () => {
        if(!isChosen){ //adding--------------------
            Now.chosens.push(props);            
            console.log(Now.chosens);

            setNowChosens([...nowChosens, cardData]);
            //console.log('nowChosens from ctx', nowChosens);

            setIsChosen(true);
        }
        else{ //removing-----------------
            Now.chosens.splice(Now.chosens.indexOf(props), 1); //deletew 1 items at the index
            console.log(Now.chosens);

            let newChosensList = [...nowChosens] // ทำ arr ใหม่เพื่อลบออก //.splice ลบในตัวเอง ส่งกลับค่าที่ถูกลบ
            newChosensList.splice(nowChosens.indexOf(cardData), 1);
            setNowChosens(newChosensList);
            //console.log('nowChosens from ctx', nowChosens);

            setIsChosen(false);
        }
    }

    const setSect = (event) => { 
        //whenChosen();
        setCardData({...cardData, selectedSect: event.target.value});        
        //whenChosen();
    }

    var cardColor = isChosen ? '#fff5f8' : '#ffffff'
    var cardTransform = isChosen ? 'scale(1.02) translate(10px, 0)' : 'scale(1) translate(0, 0)'
    return(
    <div className="card" style={{backgroundColor: cardColor, transform: cardTransform}}>
        <div style={{width: '25%'}}>
            <p>{props.courseName} {props.courseNo}</p>
        </div>
        <div style={{width: '15%', color:"#898989"}}>
            <p>[{props.credits} หน่วยกิต]</p>
        </div>
        <div style={{width: '45%'}}>
            <label htmlFor="sectSelect">ตอนเรียน : &nbsp;</label>
            <form>
                <select name="section" id="sectSelect" className="sectSelect" onChange={setSect}>
                    {props.sects.map((sect) => <option value={sect}>{sect}</option>)}                
                </select>
            </form>
        </div>
        <div style={{width: '15%'}}>
            <button className="btn1" onClick={whenChosen}>
                {isChosen ? 'เลือกแล้ว' : 'เลือก'}
            </button>
        </div>
    </div>
    )
}

const BasketLabel = (props) => {
    //var [chosens, setChosens] = useState(Now.chosens);
    const nowChosens = useContext(nowChosensCtx).get;    
    const setNowChosens = useContext(nowChosensCtx).set;

    const whenFinished = () => {
        localStorage.setItem('chosenCourses', JSON.stringify(nowChosens)); //เก็บลงเครื่องก่อน
        window.location.href='/Subject/RegistConfirm'
    }

    return(
        <div className="basKetDiv">
            <p>เลือกแล้วจำนวน {nowChosens.length} วิชา</p>
            <button className="finishBtn" onClick={whenFinished}>วิชาที่เลือก {'>'}</button>
        </div>
    )
}

//-----------------------------------------------------------------//


export default Registration