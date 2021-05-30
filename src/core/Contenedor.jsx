import React, { useEffect, useRef, useState } from 'react'
import { axisBottom, axisLeft, curveCardinal, line, scaleLinear, select } from 'd3'

const Contenedor = () => {
    // Hooks
    const [datos, setDatos] = useState([150, 10, 20, 0, 40, 150, 60, 70, 80, 90, 150]);
    const svgRef = useRef();
    useEffect(() => {

        const svg = select(svgRef.current)

        const xScale = scaleLinear()
            .domain([0, datos.length - 1])
            .range([0, 300])

        const yScale = scaleLinear()
            .domain([150, 0]) // El origen está arriba
            .range([0, 150])

        const linea = line()
            .x((val, idx) => xScale(idx))
            .y((val) => yScale(val))
            .curve(curveCardinal)

        const xAxis = axisBottom(xScale)
            .tickFormat(index => index + 1)
            .ticks(datos.length)

        const yAxis = axisLeft(yScale)
            .tickPadding(18)

        svg.selectAll(".linea")
            .data([datos])
            .join("path")
            .attr("class", "linea")
            .attr("d", value => linea(value))
            .attr("fill", "none")
            .attr("stroke", "green")
        // Al ponerlo en corchetes, pasa a ser parte de la secuencia de "métodos"
        // y por ende funciona el "value => linea(value)".

        svg.selectAll(".x-axis")
            .call(xAxis)

        svg.selectAll(".y-axis")
            .call(yAxis)

    }, [datos])

    // Util Funcs
    const agregarPunto = () => {
        const datos_tr = [...datos]
        datos_tr.push(Math.floor((Math.random() * 151)))
        setDatos(datos_tr)
    }

    const quitarPunto = () => {
        const datos_tr = [...datos]
        datos_tr.splice(0, 1)
        setDatos(datos_tr)
    }

    return (

        <div className="wrapper">
            <div className="grafico">
                <svg ref={svgRef}>
                    <path className="linea" />
                    <g className="x-axis" />
                    <g className="y-axis" />
                </svg>
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

export default Contenedor