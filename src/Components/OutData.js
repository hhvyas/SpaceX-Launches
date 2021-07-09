import React from "react"

export default function OutData(props){
    return (
        <div className = "return_right_card">
            <div className = "mission_pic">
                <img src = {props.imageval ? props.imageval : props.defURL} alt="Not Available"/>
            </div>
            <div className = "mission_info">
                <div className = "mission_name">
                    {props.value} #{props.flinum}
                </div>
            <div className = "mission_id">
                <div className = "mission_id_name">
                    Mission Ids:
            </div>
            <div className = "mission_id_list">
                <ul><li>{props.id === null ? "Not Available": props.id}</li></ul>
            </div>
            </div>
            
            <div className = "mission_year">
            <span>Launch Year:</span> {props.curr_year}
            </div>
            <div className = "mission_launch">
            <span>Successful Launch:</span> {props.launch === undefined ? "Not Available" : (props.launch === true ? "true" : "false" )}
            </div>
            <div className = "mission_land">
                <span>Successful Landing:</span> {props.land === undefined ? "Not Available" : (props.land === true ? "true" : "false" )}
            </div>
            </div>
        </div>
    )
}