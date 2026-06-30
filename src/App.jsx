import React from "react"
import Die from "./components/die"
import ReactConfetti from "react-confetti"


export default function App2(){

    const [dice, setDice]=React.useState(()=> generateAllNewDice())
    const [count, setCount] = React.useState(10)
    const buttonRef =React.useRef(null)

   const gamewon= dice.every(die=>die.isHeld) &&
    dice.every(die=>die.value===dice[0].value)
    const gameLost = count ===0 && dice.some(die => !die.isHeld)

    React.useEffect(() =>{
        if(gamewon || gameLost){
            buttonRef.current.focus()
        }
    },[gamewon,gameLost])

    function generateAllNewDice(){
        return new Array(10)
        .fill(0)
        .map(()=>({
            value:Math.ceil(Math.random()*6),
            isHeld:false,
            id:crypto?.randomUUID?.() || Math.random().toString(36).slice(2)
        }))
      return setCount(10);
    }
    
    function rollDice(){
        
        if(!gamewon && !gameLost){
        setDice(oldDice=> oldDice.map(die=>
            die.isHeld? die : {...die, value:Math.ceil(Math.random()*6)}
        ))
        setCount(prevCount=>{
            if(prevCount>0){
                return prevCount-1
            }
            else{
                return 0;
            }
        })
        }
        else{
            setDice(generateAllNewDice())
            setCount(10);
        }
        
        
    
        
    }
    function hold(id){
        setDice(oldDice=> oldDice.map(die=>
                 die.id===id ?
                 {...die, isHeld: !die.isHeld} :die
            
        ))
        
}
    
    const diceElements = dice.map(random=> 
    <Die 
    key={random.id} 
    value={random.value} 
    isHeld={random.isHeld} 
    hold={()=>hold(random.id)}  
    id={random.id} />)
    
    return(
        <>
        <main>
            {gamewon && <ReactConfetti className="confetti" />}
            {count === 0 && !gamewon && <p className="looseClass" >You Loose 😫</p>}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until are dice are the same.Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div className={count >5 ? "counter1" :"counter2"}>
                <>
                 {count}
                 
                 </>
            </div>
            <button  ref={buttonRef} className="roll-dice" onClick={rollDice}>{gamewon || gameLost ? "New Game" : "Roll"}</button>
    
        </main>
        </>
    )
    }