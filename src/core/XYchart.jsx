import React, { useEffect, useRef } from 'react'
import { scaleLinear, line, select } from 'd3'

// Style
const svgStyle = {

}

const XYchart = (props) => {
    // Hooks
    const svgRef = useRef()
    useEffect(
        () => {
            const svg = select(svgRef.current)

            // Loop through data
            props.data.forEach(
                (dataItem, idx, arr) => {
                    // Axis
                    const xScale = scaleLinear()
                        .domain(props.xaxisDomain ? props.xaxisDomain : [0, dataItem.x.length - 1])
                        .range([0, props.width])

                    const yScale = scaleLinear()
                        .domain(props.yaxisDomain ? [props.yaxisDomain[1], props.yaxisDomain[0]] : [150, 0]) // El origen está arriba
                        .range([0, props.height])

                    const linea = line()
                        .x((val, idx) => xScale(val[0]))
                        .y((val) => yScale(val[1]))

                    if (dataItem.curve !== undefined) {
                        linea.curve(dataItem.curve)
                    }

                    svg.selectAll(".xychart" + idx)
                        .data([dataItem.y.map((val, idx) => ([dataItem.x[idx], val]))])
                        .join("path")
                        //.attr("class", "linea")
                        .attr("d", value => {
                            console.log(value)
                            return (linea(value))
                        })
                        .attr("fill", "none")
                        .attr("stroke", dataItem.color)
                    // Al ponerlo en corchetes, pasa a ser parte de la secuencia de "métodos"
                    // y por ende funciona el "value => linea(value)".

                }
            )
        },
        [props]
    )

    return (
        <svg ref={svgRef} width={props.width} height={props.height}>
            {props.data.map((val, idx) => (
                <path
                    className={"xychart" + idx}
                    id={idx}
                    key={idx}
                />
            ))}
            <g className="x-axis" />
            <g className="y-axis" />
        </svg>
    )
}

export default XYchart