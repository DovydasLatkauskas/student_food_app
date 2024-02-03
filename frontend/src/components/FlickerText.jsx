import {useState} from "react";
import PropTypes from "prop-types";

export const FlickerText = ({display_text, className}) => {
	const [text, setText] = useState(display_text)

	const text_gen = (length) => {
		let new_text = ""
		for (let i = 0; i < length; i++) {
			new_text += String.fromCharCode(Math.floor(Math.random() * 56) + 65)
		}
		return new_text
	}
	const flicker = async () => {
		const flicker_int = setInterval(() => {
			setText(text_gen(display_text.length))
		}, 50)

		setTimeout(() => {
			clearInterval(flicker_int)
			let i = 0;
			let new_interval = setInterval(() => {
				let new_text = ""
				new_text = display_text.slice(0, i) + text_gen(display_text.length - i)
				setText(new_text)
				i++;
				if(new_text === display_text) {
					i = 0;
					clearInterval(new_interval)
				}
			}, 50)
			setText(display_text)
		}, 200)
	}

	return (
		<div className={"h-full w-full p-3 flex items-center " + className}>
		<div style={{textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }} className="" onMouseEnter={async () => await flicker()}>
			{text}
		</div>
		</div>
	)
}

FlickerText.propTypes = {
	display_text: PropTypes.string.isRequired,
	className: PropTypes.string
}