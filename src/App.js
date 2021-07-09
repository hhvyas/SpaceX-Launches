import React, { useState, useEffect } from "react";
import ReactLoading from 'react-loading';
import axios from 'axios'
import OutData from './Components/OutData';
import ShowButtons from './Components/ShowButtons'
import ShowFilter from './Components/ShowFilter'
import './App.css'

 
let years = [];
for (let i=2006;i<=2020;i++){
  years.push(i);
}

export default function App() {
  const [SpaceXData, setData] = useState(null);
  const [SelectedYear, setYear] = useState(2006);
  const [launch_success, setlaunch] = useState(null);
  const [land_success, setland] = useState(null);
  const [isLoading, setLoading] = useState(false);
  
  let url = `https://api.spacexdata.com/v3/launches?limit=100&launch_year=${SelectedYear}`
  if (launch_success){
    url += `&launch_success=${launch_success}`
  }
  if (land_success){
    url += `&land_success=${land_success}`
  }

  useEffect (() => {
    console.log("Useffect Initiated");
    setLoading(true);
    axios.get(url)
      .then(response => {
        setData(response.data)
      })
      .finally(() => setLoading(false));
  }, [url])
  let Allobj = [];
  let defaultURL = "https://images2.imgbox.com/9a/96/nLppz9HW_o.png"
  if (SpaceXData){
   console.warn(SpaceXData);
      for (let i=0;i<SpaceXData.length;i++){
        Allobj.push({ mission_Name: SpaceXData[i].mission_name,
                    FNum: SpaceXData[i].flight_number, 
                    Land: SpaceXData[i].rocket.first_stage.cores[0].land_success,
                    Launch: SpaceXData[i].launch_success,
                    Image: SpaceXData[i].links.mission_patch_small,
                    Ids: SpaceXData[i].mission_id.length > 0 ? SpaceXData[i].mission_id[0] : "Not Available",
                  })
        }
  }
  // Case for Initial Rendering when content will be null
    return (
      <div>
        <div className = "heading">
          SpaceX Launch Programs
        </div>
        <div className = "Cards">
          <div className = "Left_card">
            <div className = "cont_left">
              <div className = "filter">
                Filters
              </div>
              <div className="filter_attributes">
                Launch Year
              </div>
              <div className = "button_list">
                {years.map(year => (
                  <ShowButtons curr_value = {SelectedYear} key={Math.random()} value={year} onClick={(e) => {
                    setYear(e);
                  }}/>
                ))}
              </div>
              <div className="filter_attributes">
                Successful Launch
              </div>
              <div className = "button_list">
                <ShowFilter curr_value = {launch_success} value={true} onClick={(e) => {
                  if (e === launch_success){
                    setlaunch(null);
                  }else{
                    setlaunch(e);
                  }
                 }}/>
                 <ShowFilter curr_value = {launch_success} value={false} onClick={(e) => {
                    if (e === launch_success){
                      setlaunch(null);
                    }else{
                        setlaunch(e);
                    }
                  }}/>
              </div>
              <div className="filter_attributes">Successful Landing</div>
              <div className = "button_list">
              <ShowFilter curr_value = {land_success} value={true} onClick={(e) => {
                if (e === land_success){
                  setland(null);
                }else{
                  setland(e);
                }
              }}/>
              <ShowFilter curr_value = {land_success} value={false} onClick={(e) => {
                if (e === land_success){
                  setland(null);
                }else{
                  setland(e);
                }
              }}/>
            </div>
          </div>
        </div>
      
        {isLoading === true ? (
          <div className = "Loading">
            <ReactLoading type={"bars"} color={"grey"} />
          </div>
        ):
        (
        <div className = "Right_card">
          {Allobj.map(mission => (
            <OutData key={Math.random()} defURL = {defaultURL} flinum = {mission.FNum} value={mission.mission_Name} curr_year={SelectedYear} imageval = {mission.Image} land={mission.Land} launch = {mission.Launch} id = {mission.Ids}/>
          ))}
        </div>
        )}
        </div>
      </div>
    )
}