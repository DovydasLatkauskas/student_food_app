import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import {FlickerText} from "../components/FlickerText.jsx";
import {Cursor} from "../components/Cursor.jsx";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";
import {ReactiveLink} from "../components/ReactiveLink.jsx";

export const Signup = () => {
	const firstNameRef = useRef(null);
	const lastNameRef = useRef(null);
	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();
	const {setLinkOver} = queryLinkOver();
	return (
		<div style={{backgroundImage: 'url("https://4kwallpapers.com/images/wallpapers/macos-big-sur-apple-layers-fluidic-colorful-dark-wwdc-2020-3440x1440-1432.jpg")'}} className="w-full h-full">
		<div style={{background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))'}} className="w-full h-full bg-zinc-800 flex items-center justify-center text-white">
			<Cursor />
			<div  className="backdrop-blur-xl bg-opacity-30 w-1/3 h-[50%] bg-zinc-900 rounded-xl shadow-xl hover:shadow-2xl transition duration-300">
				<form className="h-full w-full rounded-xl p-4 pt-0 grid grid-rows-[25%_20%_20%_20%_15%]">
					<div  className="flex items-center font-bold justify-center text-4xl"><FlickerText display_text="Alpha"/><ReactiveLink classes="font-light w-4/6 flex justify-end text-sm hover:underline"  to="/Signin">Already a user? Signin</ReactiveLink></div>
					<div className="grid grid-cols-2 h-full w-full gap-2">
					<input required ref={firstNameRef} placeholder="Enter first name" className="transition-shadow duration-600 input-shadow bg-opacity-30 focus:bg-opacity-50 p-3 text-2xl font-semibold focus:outline-none bg-zinc-800 mb-2 rounded-lg" type="text"/>
					<input required ref={lastNameRef} placeholder="Enter last name" className="transition-shadow duration-600 input-shadow bg-opacity-30 focus:bg-opacity-50 p-3 text-2xl font-semibold focus:outline-none bg-zinc-800 mb-2 rounded-lg" type="text"/>
					</div>
					<input required ref={emailRef} placeholder="Enter email" className="transition-shadow duration-600 input-shadow bg-opacity-30 focus:bg-opacity-50 p-3 text-2xl font-semibold focus:outline-none bg-zinc-800 mb-2 rounded-lg" type="email"/>
					<input required ref={passwordRef} placeholder="Enter password" className="transition-shadow duration-600 input-shadow bg-opacity-30 focus:bg-opacity-50 p-3 text-2xl font-semibold focus:outline-none bg-zinc-800 mb-2 rounded-lg" type="password"/>
					<button className="bg-slate-900 hover:bg-slate-800 font-bold text-2xl rounded-lg cursor-none" type="submit" onClick={ (e)=>{
						e.preventDefault();

						const firstName = firstNameRef.current.value;
						const lastName = lastNameRef.current.value;
						const email = emailRef.current.value;
						const password = passwordRef.current.value;
						const repeatPassword = passwordRef.current.value;

						if (password !== repeatPassword){
							alert("Passwords do not match!");
							return;
						}

						fetch('http://localhost:5116/register?useCookies=true', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({ email: email, password: password })
						})
						.then(response => {
							if (response.ok) {
								fetch('/user-registered', {
											method: 'POST',
											headers: {
												'Content-Type': 'application/json',
											},
											body: JSON.stringify({firstName: firstName, lastName: lastName, email: email})
										})
									navigate("/Signin")
							} else {
								response.json().then(dt => {
									let errorString = "";
									for (const key in dt.errors) {
										dt.errors[key].forEach(e => {
											errorString += e + "\n";
										});
									}
									window.alert(errorString);
								})
							}
						})
						.catch((error) => {
							console.error('Error:', error);
						});
					}
					} onMouseEnter={()=>{
						setLinkOver(true);
					}} onMouseLeave={()=>setLinkOver(false)}>Submit</button>
				</form>
			</div>
		</div>
		</div>
	)
}