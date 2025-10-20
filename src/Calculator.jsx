import { useState } from 'react'
import { evaluate } from 'mathjs'

export const operations = ['+', '-', '*', '/']
const equalSign = '='

export const rows = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]]

export const Calculator = () => {
  const [value, setValue] = useState('')

  // Función para manejar el clic en botones (números u operaciones)
  const handleClick = (op) => {
    setValue(value.concat(op))
  }

  // Función para manejar el clic del botón igual
  const handleEqual = () => {
    try {
      setValue(evaluate(value).toString())
    } catch (e) {
      // Manejo básico de errores para evitar que la app se rompa
      setValue('Error')
    }
  }

  return (
    <div>
      <h1>Calculator</h1>
      <input value={value} readOnly />
      <div role='grid'>
        {rows.map((row, idx) => (
          // Usar 'idx' como key es aceptable si la lista no cambia de orden
          // Aunque una key más estable sería mejor si fuera posible
          <div key={idx} role='row'>
            {row.map((number) => (
              <button
                onClick={() => handleClick(number)} // Se pasa directamente la función 'handleClick' con el argumento
                key={number}
              >
                {number}
              </button>
            ))}
          </div>
        ))}

        {operations.map((operation) => (
          <button
            onClick={() => handleClick(operation)}
            key={operation}
          >
            {operation}
          </button>
        ))}

        <button onClick={handleEqual}>{equalSign}</button>
      </div>
    </div>
  )
}
