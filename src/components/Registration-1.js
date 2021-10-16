import React, { useState } from "react"
import "../App.css";
import "./Registration.css";

import ContentBox from "./ContentBox";

var Now = {
    chosens: [],
    searched: ''
};

const CardCtn = (props) => {
    return ( <
        div className = "cardCtn"
        id = "cardCtn" > { props.content } <
        /div>
    )
}

const CourseCard = (props = { courseName: 'Cal I', courseNo: '23101', credits: 5 }) => {
    var [isChosen, setIsChosen] = useState(false)

    const whenChosen = () => {
        if (!isChosen) {
            Now.chosens.push(props);
            console.log(Now.chosens);
            setIsChosen(true)
        } else {
            Now.chosens.splice(Now.chosens.indexOf(props), 1); //deletew 1 items at the index
            console.log(Now.chosens);
            setIsChosen(false);
        }
    }

    return ( <
        div className = "card" >
        <
        div style = {
            { flexGrow: 3 } } >
        <
        p > { props.courseName } { props.courseNo } < /p> <
        /div> <
        div style = {
            { flexGrow: 3 } } >
        <
        p > { props.credits }
        หน่ วยกิต < /p> <
        /div> <
        div style = {
            { flexGrow: 6 } } >
        <
        label htmlFor = "sectSelect" > ตอนเรียน: < /label> <
        select name = "section"
        id = "sectSelect" >
        <
        option value = { 1 } > 1 < /option> <
        option value = { 2 } > 2 < /option> <
        option value = { 3 } > 3 < /option> <
        option value = { 4 } > 4 < /option> <
        /select> <
        /div> <
        div style = {
            { flexGrow: 1 } } >
        <
        button className = "btn1"
        onClick = { whenChosen } > { isChosen ? 'เลือกแล้ว' : 'เลือก' } <
        /button> <
        /div> <
        /div>
    )
}

const SelectedLabel = (props) => {
    var [chosens, setChosens] = useState(Now.chosens);
    return ( <
        p > เลือกแล้ วจำนวน { chosens.length } < /p>
    )
}

//-----------------------------------------------------------------//
//-------------------ลองข้อมูล----------------//
var received = {
    courses: [{
        name: 'Calculus I',
        credits: 6,
        No: '2301123'
    }, {
        name: 'Magic Spell I',
        credits: 5,
        No: '2309987'
    }, {
        name: 'Muggle Studies I',
        credits: 4,
        No: '2355566'
    }, {
        name: 'Alchemy I',
        credits: 6,
        No: '2356789'
    }]
}

var CourseCard_list = received.courses.map((course) =>
        <
        CourseCard courseName = { course.name }
        courseNo = { course.No }
        credits = { course.credits }
        />);

        const Registration = () => {
            return ( <
                >
                <
                div className = "heading" > ลงทะเบียนเรียน < /div>     <
                ContentBox title = "ลงทะเบียนเรียน"
                content = { <
                    >
                    <
                    CardCtn content = { CourseCard_list }
                    />  <
                    SelectedLabel / >
                    <
                    />
                }
                />


                <
                />
            )
        }

        export default Registration