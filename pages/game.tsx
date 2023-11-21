import React from 'react'
import { Provider } from 'inversify-react'
import { Container } from 'inversify'
import { BoardLogic, UseBoard } from '../hooks/UseBoard'
import Game from '../components/Game'
import { useBoardGame } from '../hooks/useBoardGame'

const container = new Container()
container.bind<UseBoard>(BoardLogic).toFunction(useBoardGame)

export default function GameBoard() {
  return (
    <Provider container={container}>
      <Game />
    </Provider>
  )
}
