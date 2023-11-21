import { useRouter } from 'next/router'
import { useGameLogic } from '../hooks/useGameLogic'
import { FieldComponent } from './FieldComponent'
import React from 'react'
import { DEFAULT_GRIND_SIZE, MAX_GRID_SIZE, MIN_GRID_SIZE } from '../pages'

function GameBoard() {
  const router = useRouter()
  let gridSize = router.query?.grid
    ? parseInt(router.query.grid as string)
    : DEFAULT_GRIND_SIZE
  if (gridSize > MAX_GRID_SIZE || gridSize < MIN_GRID_SIZE) {
    gridSize = DEFAULT_GRIND_SIZE
  }
  const { onReset, fields, gameOver, handlers } = useGameLogic(gridSize)

  return (
    <div className="bg-[#FBF6F3] w-screen h-screen pt-2 " {...handlers}>
      <h1 className="text-3xl text-slate-900 text-center">2048 game</h1>
      <section
        className={`grid grid-cols-${gridSize} grid-rows-${gridSize} relative
        gap-1.5 border-2 rounded border-blue-50 w-fit mx-auto my-1.5 p-1.5 `}
      >
        {fields.map((f) => (
          <FieldComponent key={f.id} field={f} />
        ))}
        {gameOver && (
          <div
            className="absolute top-0 left-0 w-full h-full z-10 flex justify-center items-center text-white bold
           bg-gray-700 bg-opacity-70 rounded-2xl font-bold text-2xl"
          >
            Game Over
          </div>
        )}
      </section>
      <section className="flex justify-center gap-2">
        <button
          className=" mt-6 border border-blue-400 rounded-md px-3 py-1 text-2xl
          bg-blue-100 hover:bg-blue-200 active:bg-blue-300 transition-colors duration-200"
          onClick={() => router.push('/')}
        >
          Back
        </button>
        <button
          className=" mt-6 border border-amber-400 rounded-md px-3 py-1 text-2xl
          bg-amber-100 hover:bg-amber-200 active:bg-amber-300 transition-colors duration-200"
          onClick={onReset}
        >
          Reset
        </button>
      </section>
    </div>
  )
}

export default function Game() {
  const router = useRouter()
  if (!router.isReady) {
    return (
      <div className="fixed inset-0 text-4xl text-center translate-y-1/2">
        Loading
      </div>
    )
  }
  return <GameBoard />
}
