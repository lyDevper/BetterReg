import React, { createContext, useContext, useState } from "react"
import"../App.css";
import"./Registration.css";
import"./RegistConfirm.css";

import ContentBox from "./ContentBox";

var q = (id) => document.getElementById(id)

//-------------------ลองข้อมูล-- แสดงวิชาที่เลือก--------------//
var chosenCourses = [ //ตัวลอง ไม่ใช้แล้ว ดึงจากหน้าก่อนได้แล้ว
    {
        "courseName": "Magic Spell I",
        "courseNo": "2309987",
        "credits": 5,
        "selectedSect": "1"
    },
    {
        "courseName": "Alchemy I",
        "courseNo": "2356789",
        "credits": 6,
        "selectedSect": 3
    },
    {
        "courseName": "Astrology I",
        "courseNo": "2398765",
        "credits": 3,
        "selectedSect": "only"
    }    
]

chosenCourses = JSON.parse(localStorage.getItem('chosenCourses'));
console.log('Received chosenCourses !!', chosenCourses);

const nowChosensCtx = createContext();
const RegistConfirm=()=>{ //-----------main-------------------------------------------------------------//
    var [nowChosens, setNowChosens] = useState(chosenCourses); // global in this app for list of chosen courses
    console.log('init state', nowChosens);
    var CourseRow_list = nowChosens.map((courseData, index) => <CourseRow courseData={courseData} index={index+1}/>);

    return(
    <nowChosensCtx.Provider value={{get: nowChosens, set: setNowChosens}}>
        <div className="heading">ลงทะเบียนเรียน</div>    
        <ContentBox title="รายวิชาที่ต้องการลงทะเบียนเรียน" content={
            <>
            <TableCtn content={CourseRow_list}/>             
            <BackBtn/>
            </>
        }/>
            
    </nowChosensCtx.Provider>
    )
}

//--------------------------------------------------------------//
const TableCtn = (props) =>{
    return(
        <div className="cardCtn" id="cardCtn">
            <table className="table1">
                <tr>
                    <th className="cell1" style={{width:'8%'}}>ลำดับที่</th>
                    <th style={{width:'30%'}}>รหัสรายวิชา</th>
                    <th style={{width:'32%'}}>ชื่อย่อรายวิชา</th>
                    <th style={{width:'10%'}}>ตอนเรียน</th>
                    <th style={{width:'10%'}}>หน่วยกิต</th>
                    <th style={{width:'10%'}} className="invisCell"></th>
                </tr>
                {props.content}
            </table>
            
        </div>
    )
}

const CourseRow = (props) => {    
    const courseData = props.courseData;
    const nowChosens = useContext(nowChosensCtx).get;
    const setNowChosens = useContext(nowChosensCtx).set;

    const removeCourse = () => {
        let newChosensList = [...nowChosens] // ทำ arr ใหม่เพื่อลบออก //.splice ลบในตัวเอง ส่งกลับค่าที่ถูกลบ
        newChosensList.splice(nowChosens.indexOf(courseData), 1);
        setNowChosens(newChosensList);
        console.log(nowChosens);
    }

    return(
        <tr>
            <td>{props.index}</td>
            <td>{courseData.courseNo}</td>
            <td>{courseData.courseName}</td>
            <td>{courseData.selectedSect}</td>
            <td>{courseData.credits}</td>
            <td className="invisCell"><button className="removeBtn" onClick={removeCourse}>ลบ</button></td>
        </tr>
    )
}

const BackBtn = () => {
    const goBack = () => {
        window.location.href = '/Subject/Registration';
    }
    
    return(    
        <button className="btn2" onClick={goBack}>แก้ไข</button>
    )
}

//-----------------------------------------------------------------//

export default RegistConfirm