import {useD3} from '../hooks/useD3';
import React from 'react';
import * as d3 from 'd3';

function LastSession({data}) {

    const ref = useD3(() => {


            console.log("D3 Chart", data)

            // Dimensions
            let dimensions = {
                width: 1000,
                height: 600,
                margins: 20,
            };

            dimensions.ctrWidth = dimensions.width - dimensions.margins * 2
            dimensions.ctrHeight = dimensions.height - dimensions.margins * 2

// Draw Image
            const svg = d3.select('#chart')
                .append("svg")
                .attr("width", dimensions.width)
                .attr("height", dimensions.height)

            const ctr = svg.append("g")
                .attr(
                    "transform",
                    `translate(${dimensions.margins}, ${dimensions.margins})`
                )
        },
        [data.length]
    )

    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: "100%",
                marginRight: "0px",
                marginLeft: "0px",
            }}
        >
            <g className="plot-area"/>
            <g className="x-axis"/>
            <g className="y-axis"/>
        </svg>
    );
}
export default LastSession;