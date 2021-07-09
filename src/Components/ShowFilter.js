export default function ShowFilter(props){
    return (
        <div className = "buttons">
          <button className = {props.value === props.curr_value ? "selected" : ""} onClick={() => props.onClick(props.value)} > 
              {JSON.stringify(props.value)} 
          </button>
        </div>
    )
}
