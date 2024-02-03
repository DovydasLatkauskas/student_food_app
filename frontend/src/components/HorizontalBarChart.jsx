import {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
export const HorizontalBarChart = ({dataset}) => {
	const containerRef = useRef(null);
	let [height, setHeight] = useState(0);
	let [width, setWidth] = useState(0);
	const colors = ["bg-red-400", "bg-green-400", "bg-blue-400", "bg-yellow-400", "bg-pink-400", "bg-purple-400", "bg-indigo-400", "bg-gray-400", "bg-slate-400", "bg-emerald-400", "bg-cyan-400"]

	useEffect(()=>{
		if (containerRef.current) {
			setHeight(containerRef.current.clientHeight / (dataset.labels.length + 1));
			setWidth(containerRef.current.clientWidth * 0.8)
		}
	}, [containerRef])

	return (
		<div className="h-full w-full grid grid-cols-[20%_80%]">
			<div ref={containerRef} className="h-full w-full border-r-2 border-slate-400">
				{
					dataset.labels.map((label, index) => {
						return (
							<div key={index} style={{height: height + "px", marginBottom: (height/dataset.labels.length) + "px"}} className="text-gray-400 font-serif font-2xl w-full flex items-center justify-end pr-2">
								{label}
							</div>
						)
					})
				}
			</div>
			<div className="h-full w-full">
				{
					dataset.data.map((item, index) => {
						return (
						<div key={index} style={{height: height + "px", marginBottom: (height/dataset.labels.length) + "px"}} className="bg-slate-600 bg-opacity-80 border-2 border-slate-700">
						<div style={{width: (item * width) + "px"}} className={`w-full ${colors[index]} transition-all h-full hover:bg-opacity-80 bg-opacity-50 `}></div>
						</div>
						)
					})
				}
			</div>
		</div>
	)
}

HorizontalBarChart.propTypes = {
	dataset: PropTypes.object.isRequired
}