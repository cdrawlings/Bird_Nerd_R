import React, {useEffect, useRef} from "react";
import {select} from "d3";
import useResizeObserver from "../hooks/useResizeObserver";

/**
 * Component that renders a StackedBarChart
 */

function LastSession({data}) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);

    // will be called initially and on every data change
    useEffect(() => {
        const svg = select(svgRef.current);
        const {width, height} =
        dimensions || wrapperRef.current.getBoundingClientRect();


    }, [data, dimensions]);

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