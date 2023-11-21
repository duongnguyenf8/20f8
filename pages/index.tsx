'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

export const MAX_GRID_SIZE = 12
export const MIN_GRID_SIZE = 2
export const DEFAULT_GRIND_SIZE = 4

export default function Home() {
  const router = useRouter()

  const [gridSize, setGridSize] = useState(DEFAULT_GRIND_SIZE)
  const [error, setError] = useState('')
  const inputRef = useRef(null as HTMLInputElement | null)

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setError('')
      const regex = new RegExp(`^[0-9]{0,${(MAX_GRID_SIZE + '').length}}$`)
      const value = event.currentTarget.value
      if (!regex.test(value)) {
        setError('Invalid grid size')
        return setGridSize(Number(value.slice(0, -1)) as number)
      }
      if (Number(value) > MAX_GRID_SIZE || Number(value) < MIN_GRID_SIZE) {
        setError(
          `Grid size must be between ${MIN_GRID_SIZE} and ${MAX_GRID_SIZE}`
        )
      }
      setGridSize(Number(value))
    },
    []
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (Number.isNaN(gridSize) || gridSize < MIN_GRID_SIZE) {
      setError('Grid size must be bigger than 1')
      return
    }
    if (gridSize > MAX_GRID_SIZE) {
      setError('Max grid size is 12')
      return
    }
    router.push('/game?grid=' + gridSize)
  }
  function getText() {
    if (error) {
      return { msg: error, type: 'error' }
    }
    if (!gridSize || isNaN(gridSize)) {
      return {
        msg: 'Please enter the number',
        type: 'error'
      }
    }
    return {
      msg: `${gridSize} X ${gridSize}`,
      type: 'success'
    }
  }
  const handleKeydown = useCallback((e: KeyboardEvent) => {
    if (inputRef.current)
      switch (e.code) {
        case 'ArrowUp': {
          setError('')
          setGridSize((prev) => {
            if (Number(prev) < MAX_GRID_SIZE && Number(prev) >= MIN_GRID_SIZE) {
              return Number(prev) + 1
            }
            return MAX_GRID_SIZE
          })
          break
        }
        case 'ArrowDown': {
          setError('')
          setGridSize((prev) => {
            if (Number(prev) > MIN_GRID_SIZE && Number(prev) <= MAX_GRID_SIZE) {
              return Number(prev) - 1
            }
            return MIN_GRID_SIZE
          })
          break
        }
        case 'Enter':
        case 'Process':
        case 'Backspace':
          inputRef.current.focus()
          break
        default:
          if (isFinite(Number(e.key))) {
            setGridSize(0)
            inputRef.current.focus()
          }
          break
      }
  }, [])
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    return () => {
      document.removeEventListener('keydown', handleKeydown)
    }
  }, [handleKeydown])
  const { msg, type } = getText()
  return (
    <div className="bg-[#FBF6F3] w-screen h-screen flex justify-center items-center flex-col gap-2">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col gap-2"
      >
        <label htmlFor="grid_size" className="text-4xl">
          Grid size
        </label>
        <input
          type="text"
          id="grid_size"
          name="grid_size"
          autoComplete="off"
          autoCorrect="off"
          autoFocus
          onChange={handleOnChange}
          value={Number(gridSize)}
          ref={inputRef}
          min={MIN_GRID_SIZE}
          max={MAX_GRID_SIZE}
          className="w-48 text-4xl h-12 border border-[#1b315b] pl-2 rounded text-center"
        />
        {!error && (
          <button className="w-48 h-12 hover:bg-teal-500 text-white text-2xl rounded-md bg-teal-600 transition opacity-70 hover:opacity-100 border-teal-300 hover:border-teal-700 border-2">
            Go!
          </button>
        )}
      </form>

      <p
        className={
          type === 'error'
            ? 'ml-2 text-red-700 text-center text-2xl'
            : 'text-teal-600 text-2xl ml-2 text-center'
        }
      >
        {msg}
      </p>
    </div>
  )
}
