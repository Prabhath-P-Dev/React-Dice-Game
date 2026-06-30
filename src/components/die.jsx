export default function Die(props){
    const style ={
        backgroundColor:props.isHeld ?"#59E391":"black"
    }
    return(
        <button 
        onClick={props.hold} 
        style={style} 
        >{props.value}</button>
    )
}