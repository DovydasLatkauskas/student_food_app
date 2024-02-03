import {Link, useNavigate} from "react-router-dom";
import {useEffect, useRef} from "react";
import {FlickerText} from "../components/FlickerText.jsx";
import {Cursor} from "../components/Cursor.jsx";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";
import {ReactiveLink} from "../components/ReactiveLink.jsx";

export const Signin = () => {
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const tokenRef = useRef(null);
	const navigate = useNavigate();
	const {setLinkOver} = queryLinkOver();

	useEffect(()=>{
		tokenRef.current = localStorage.getItem("token")
		// console.log(tokenRef.current)
	})

	return (
		<div style={{backgroundImage: 'url("https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-dark-wwdc-2020-3440x1440-1432.jpg")'}} className="w-full h-full">
		<div style={{background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))'}} className="w-full h-full bg-zinc-800 flex items-center justify-center text-white">
			<Cursor />
			<div className="w-1/3 h-2/5 backdrop-blur-xl bg-zinc-900 bg-opacity-30 rounded-xl drop-shadow-xl hover:drop-shadow-2xl transition duration-300">
				<form className="h-full w-full rounded-xl p-4 pt-0 grid grid-rows-[30%_25%_25%_20%]">
					<div className="flex items-center font-bold justify-center text-4xl"><FlickerText display_text="Alpha"/><ReactiveLink classes="font-light w-4/6 flex justify-end text-sm hover:underline" to="/signup">Not an Existing User? Signup</ReactiveLink></div>
					<input ref={emailRef} required placeholder="Enter email" className="transition-shadow duration-600 input-shadow p-3 text-2xl font-semibold focus:outline-none bg-zinc-900 bg-opacity-30 focus:bg-opacity-50 mb-2 rounded-lg" type="email"/>
					<input ref={passwordRef} required placeholder="Enter password" className="transition-shadow duration-600 input-shadow p-3 text-2xl font-semibold focus:outline-none bg-zinc-900 bg-opacity-30 focus:bg-opacity-50 mb-2 rounded-lg" type="password"/>
					<button className="bg-slate-900 hover:bg-slate-800 font-bold text-2xl rounded-lg cursor-none" type="submit" onClick={async (e)=>{
						e.preventDefault();

						const data = { email: emailRef.current.value, password: passwordRef.current.value };

						let response = await fetch('http://localhost:5116/login', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(data)
						})
						if(response.ok){
							let token = await response.json();
							localStorage.setItem("token", token.accessToken);
							navigate("/")
						} else {
							window.alert("incorrect login credentials");
						}
					}} onMouseEnter={()=>{
						setLinkOver(true);
					}} onMouseLeave={()=>setLinkOver(false)}>Submit
					</button>
				</form>
			</div>
		</div>
		</div>
	)
}