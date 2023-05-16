import React, {useEffect, useRef} from "react";
import {max, scaleBand, scaleLinear, select, stack} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";

/**
 * Component that renders a StackedBarChart
 */

function LastSession({data, keys, colors}) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    const stackGenerator = stack().keys(keys)
    //  ensures consistent stack ordering
    //.order(stackOrderAscending)
    const layers = stackGenerator(data)

    // maty n\eed to flip this if horizontel is working
    const extent = [max(layers, layer =>
        max(layer, sequence => sequence[1])), 0]


    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const {width, height} =
        dimensions || wrapperRef.current.getBoundingClientRect();

        const yScale = scaleBand()
            .domain(data.map(d => d.date))
            .range([height, 0])
            .padding(0.25)

        const xScale = scaleLinear()
            .domain(extent)
            // will be called initially and on every data change
            .range([width, 0])

        /*
        // shows axis keys and ticks
        const yAxis = axisLeft(yScale)
        svg.select(".y-axis").call(yAxis)

        const xAxis = axisBottom(xScale)
        svg.select(".x-axis")
            .attr("transform", `translate(0, ${height} )`)
            .call(xAxis)
        */

        svg.selectAll('.layer')
            .data(layers)
            .join('g')
            .join('g')
            .attr('class', 'layer')
            .attr('fill', layer => {
                return colors[layer.key]
            })
            .selectAll('rect')
            .data(layer => layer)
            .join('rect')
            .attr('y', sequence => {
                return yScale(sequence.data.date)
            })
            .attr('height', yScale.bandwidth())
            .attr('x', sequence => xScale(sequence[0]))
            .attr('width', sequence => xScale(sequence[1]) - xScale(sequence[0]))


    }, [colors, data, dimensions, keys]);


    return (
        <React.Fragment>
            <div ref={wrapperRef} style={{marginBottom: "2rem"}}>
                <svg ref={svgRef}>
                    <g className="x-axis"/>
                    <g className="y-axis"/>
                </svg>
            </div>
        </React.Fragment>
    );
}

export default LastSession;