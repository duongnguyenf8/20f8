import React, { useCallback } from 'react'
import { Field } from '../models/Field'

function useGetStyle(field: Field) {
  const getBg = useCallback((value: number) => {
    const COLORS = [
      '#cbbfb3', // 0
      '#ece2d8', // 2
      '#e8dec6', // 4
      '#f1af7b', // 8
      '#f39368', // 16
      '#f67a5b', // 32
      '#f1593d', // 64
      '#eccb6e', // 128
      '#f0d149', // 256
      '#e3bd30', // 512
      '#edbf3f', // 1024
      '#e0ba12', // 2048
      '#5eda90', // 4096
      '#f797f6', // 8192
      '#aa61a3' // 16384
    ]
    return value ? COLORS[Math.log2(value)] : COLORS[0]
  }, [])

  const getGetTransformValue = useCallback((field: Field) => {
    if (!field.moveTo) {
      return 'translateX(0)'
    }

    const xDiff = field.moveTo.x - field.coordinates.x
    const yDiff = field.moveTo.y - field.coordinates.y

    return xDiff !== 0
      ? `translateX(${7 * xDiff + xDiff * 0.3}rem)`
      : yDiff !== 0
      ? `translateY(${7 * yDiff + yDiff * 0.3}rem)`
      : 'translateX(0)'
  }, [])

  const bg = {
    backgroundColor: getBg(field.displayedValue)
  }
  const transform = field.moveTo
    ? {
        transform: getGetTransformValue(field),
        transitionProperty: 'transform',
        transitionDuration: '.25s',
        zIndex: 100
      }
    : {}
  Object.assign(bg, transform)

  return bg
}

type PropTypes = {
  field: Field
}

export const FieldComponent: React.FC<PropTypes> = ({ field }) => {
  const getStyle = useGetStyle(field)
  return (
    <div className="relative w-28 h-28">
      <div
        className={`w-28 h-28 flex items-center justify-center font-bold text-4xl rounded-md z-1 absolute z-10
              ease-in-expo text-teal-700 shadow-gray-50 overflow-auto`}
        style={getStyle}
      >
        {!!field.displayedValue && field.displayedValue}
      </div>
      <div className="w-28 h-28 bg-base rounded-md absolute top-0 left-0 z-0" />
    </div>
  )
}
