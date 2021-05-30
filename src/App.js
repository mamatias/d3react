import { curveCardinal } from 'd3-shape'
import React, { useState } from 'react'
import './App.css'
import XYchart from './core/XYchart'

const App = () => {
  // Hooks
  const [data, setData] = useState([
    {
      y: [ 40,-40, 20,-20,  0],
      x: [-10, -5,  0,  5, 10],
      color: '#FFEEAA',
      curve: curveCardinal,
    },
    {
      y: [ 10,  8,  6,  4,  0],
      x: [ -5, -4,  3,  4,  5],
      color: '#22EE44',
      //curve: curveCardinal,
    },
  ])

  // Util Funcs
  const agregarPunto = () => {
    const data_tr = {...data}
    data_tr[0].y.push(Math.floor((Math.random() * 151)))
    data_tr[0].x.push(Math.floor((Math.random() * 151)))
    setData(data_tr)
  }

  const quitarPunto = () => {
    const data_tr = {...data}
    data_tr[0].y.splice(0, 1)
    data_tr[0].x.splice(0, 1)
    setData(data_tr)
  }

  return (
    <div className="wrapper">
      <div className="grafico">
        <XYchart
          data={data}
          width={300} height={200}
          xaxisEnabled={true}
          yaxisEnabled={true}
          xaxisDomain={[-10, 10]}
          yaxisDomain={[-40, 40]}
        />
      </div>
      <div className="panel">
        <div className="botonera">
          <button className="agregar" onClick={agregarPunto}>Agregar punto</button>
          <button className="quitar" onClick={quitarPunto}>Quitar punto</button>
        </div>
      </div>
    </div>
  )
}

export default App