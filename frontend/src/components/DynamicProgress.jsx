import {useEffect, useRef, useState} from "react";

export const DynamicProgress = ({percentage}) => {
	const circleRef = useRef(null);
	const [circumference, setCircumference] = useState(20);
	useEffect(()=>{
		setCircumference(circleRef.current.r.baseVal.value * 2 * Math.PI);
	}, [circleRef])

	return (
		<svg className="progress-ring h-full w-full">
			<circle style={{strokeDashoffset: circumference - percentage / 100 * circumference, strokeDasharray: `${circumference} ${circumference}`}} ref={circleRef} className="progress-ring__circle fill-transparent" stroke="white" strokeWidth="12" r="120" cx="160" cy="150"/>
		</svg>
	)
}