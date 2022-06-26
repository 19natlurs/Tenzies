import { useState, useEffect } from 'react'
import Die from './Die'
import Roll from './Roll'
import Reset from './Reset'
export default function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(
    () => {
      const firstValue = dice[0].value
      const allHeld = dice.every(die => die.held)
      const sameValue = dice.every(die => die.value === firstValue)
      if (allHeld && sameValue) {
        setTenzies(true)
      }
    }, [dice]
  )

  function allNewDice() {
    const newArray = []
    for (let i = 0; i < 10; i++) {
      const newDie = {
        value: Math.floor(Math.random() * 7),
        held: false,
        id: i + 1,
      }

      newArray.push(newDie)
    }

    return newArray
  }


  function rollUnheldDice() {



    const temp = dice.map((item) => {

      if (!item.held) {
        item.value = Math.floor(Math.random() * 7)

      }
      return item
    })
    setDice(temp)
  }

  function holdDice(id) {
    const item = dice.find(box => box.id === id)
    const temp = dice.map((item) => {

      if (item.id === id) {
        item.held = !item.held
      }
      return item
    })
    setDice(temp)
  }

  function resetGame() {



    const temp = dice.map((item) => {

      return {
        ...item,
        value: Math.floor(Math.random() * 7),
        held: false,

      }

    })
    setDice(temp)

  }

  const diceElement = dice.map((die) => <Die key={die.id} {...die} hold={() => holdDice(die.id)} />)


  return (
    <div>
      <div className="container">
        <div className="conatiner">
          <div className="content">
            <h2>Tenzies</h2>
            <p>Roll untill all dice are the same.Click each die to freeze it at its current value between rolls</p>
            <div className="overall-ctn">
              {diceElement}
            </div>




            {tenzies ? <Reset reset={() => resetGame()} />
              : <Roll unrolled={() => rollUnheldDice()} />}

          </div>
        </div>
      </div>
    </div>




  )
}

