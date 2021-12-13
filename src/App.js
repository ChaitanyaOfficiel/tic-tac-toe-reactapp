import React from "react"
import Box from '@mui/material/Box';
import {useEffect,useState} from 'react';
import {connect, Provider} from 'react-redux';
import {createStore} from 'redux';
import Typography from '@mui/material/Typography';

// declaring initial state
const initial_state ={
  symbols: [0,0,0,0,0,0,0,0,0],
  player: 1,
  gameOver: false
};
// declaring reducer
const reducer = (state=initial_state,action) =>{
  switch(action.type){
    case 'SET_PLAYER':
      return{...state, player:action.payload}
    case 'SET_SYMBOLS':
      return {...state, symbols:action.payload}
    case 'SET_GAMEOVER':
      return {...state, gameOver:action.payload}
      
    default:
      return state;
  }
}

// declaring store value 
const store = createStore(reducer);

// function Application
function App() {
  
  return(
  
     
     <div className="Game">
     <Provider store={store}>
   <BoardContainer>
   </BoardContainer>
      </Provider>
     </div>
  
   
  )
}
// declaring mapstateto props
const mapStateToProps = (state)=> {
return {
 symbols : state.symbols,
 player : state.player,
 gameOver: state.gameOver

}
}
// declaring map dispatch to props
const mapDispatchToProps = (dispatch)=> {
  return{
    setSymbols: (symbols)=>{
      dispatch({type:'SET_SYMBOLS',payload:symbols})
    }, 
    setPlayer: (player)=>{
      dispatch({type:'SET_PLAYER',payload:player})
    },
    setGameOver : (status) => {
      dispatch({type:'SET_GAMEOVER',payload:status})
    }
  }
}
// declaring function Block
function Block({symbol, changeSymbol, position,xIsNext}){
  return (
  <>
    <Box  sx={{
      width:80,
      height:80,
      margin:2,
      border:'2px solid #cfe8fc',
      backgroundColor:'white',
      display: 'inline-block'
    }} 
    className={`Box symbol${symbol}`}
    onClick={e =>changeSymbol(position)}
    
    >
    </Box>
    
    </>
   
  )
    
}
// 

// declaring boardcontaier and connect to Board function
const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(Board);
// declaring Board function
function Board({symbols, setSymbols,gameOver, setGameOver, player, setPlayer}){
  // changing the player 
  const[xIsNext, setXisNext] = useState(true);
  // calculating winner combinations
  useEffect(() => {
    const combinations = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,8],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for(let s of combinations){
      if(symbols[s[0]]===1 && symbols[s[1]] ===1 && symbols[s[2]] ===1){
        alert('Player 1 wins');
        setGameOver(true)
      }
      if(symbols[s[0]]===2 && symbols[s[1]] ===2 && symbols[s[2]] ===2){
        alert('Player 2 wins');
        setGameOver(true)
      }
    }

  }, [symbols])
  // declaring change symbol 
  const changeSymbol = (i) =>{
    const s = [...symbols];
    // condition of notequal gameover
  if(!gameOver){
    if(s[i] === 0){
      s[i] = player;
      setSymbols(s);
      setPlayer(player === 1 ? 2:1);
     player = xIsNext ? "Player1" : "Player2";
     setXisNext(!xIsNext);
     }
    //  condition for empty blocks
     else{
     
      alert('please click on empty blocks');
     }
    //  condition for gameOver to start new game
  } else{
    alert('GameOver Please start a new game');
  }}

  // ouput of array 
  
 

  return (
   
    <div className='board'>
    <Typography variant="h6" mt={6} 
      style={{ fontWeight: 600,color:'black' }}
     >
       Tic-tac-toe Game
      </Typography>
      <div>
      <Block symbol={symbols[0]} position={0} changeSymbol={changeSymbol} ></Block>
      <Block symbol={symbols[1]} position={1} changeSymbol={changeSymbol}></Block>
      <Block symbol={symbols[2]} position={2}changeSymbol={changeSymbol} ></Block>
      </div>
      <div>
      <Block symbol={symbols[3]} position={3}changeSymbol={changeSymbol} ></Block>
      <Block symbol={symbols[4]} position={4} changeSymbol={changeSymbol} ></Block>
      <Block symbol={symbols[5]} position={5} changeSymbol={changeSymbol} ></Block>
      </div>
      <div>
      <Block symbol={symbols[6]} position={6} changeSymbol={changeSymbol} ></Block>
      <Block symbol={symbols[7]} position={7} changeSymbol={changeSymbol} ></Block>
      <Block symbol={symbols[8]} position={8} changeSymbol={changeSymbol} ></Block>
      </div>
      {/* declaring changing player turns */}
     <p>
      {xIsNext ? "Player 1 Move" : "Player 2 Move"}
      </p>
     
    </div>
   
  )
}


  

export default App
