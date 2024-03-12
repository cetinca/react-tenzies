import React from 'react'
import { useId } from 'react'
import './App.css'
import Dice from './components/Dice'
import { nanoid } from 'nanoid'
import ReactConfetti from 'react-confetti'

function App() {

  function generateDices() {
    const dices = []
    for (let i = 0; i < 10; i++) {
      const maxNumber = 6;
      const randomInteger = Math.ceil(Math.random() * maxNumber);
      dices.push({ value: randomInteger, isHeld: false, id: nanoid() })
    }
    return dices
  }



  const [dices, setDices] = React.useState(generateDices())
  const [tenzies, setTenzies] = React.useState(false)
  const [score, setScore] = React.useState(0)

  React.useEffect(() => {
    const allDicesAreHeld = dices.every(dice => dice.isHeld)
    const allValuesAreSame = dices.every(dice => dices[0].value == dice.value)
    if (allDicesAreHeld && allValuesAreSame) {
      setTenzies(true)
    }
  }, [dices])

  const id = useId()

  const mappedDices = dices.map(dice =>
    <Dice
      hold={() => hold(dice.id)}
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      className={dice.isHeld && "dice isheld" || "dice"} />
  )

  function hold(id) {
    setDices(dices => {
      return dices.map(item => item.id == id && { ...item, isHeld: !item.isHeld } || item)
    })
  }

  function roll() {
    setScore(score + 1)
    if (tenzies) {
      setTenzies(false)
      setScore(0)
      setDices(generateDices())
    } else {
      const maxNumber = 6;
      setDices(dices => dices.map(dice => dice.isHeld && dice || { ...dice, value: Math.ceil(Math.random() * maxNumber) }))
    }
  }



  return (
    <>
      {tenzies && < ReactConfetti />}
      <main className='main'>
        <div className='board'>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='board--up'>
            {mappedDices.slice(0, 5)}
          </div>
          <div className='board--down'>
            {mappedDices.slice(5, 10)}
          </div>
          <button className='board--button' onClick={roll}>{tenzies && "New game" || "Roll"}</button>
          {tenzies && <p>Your score is {score}.</p>}
          <div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
