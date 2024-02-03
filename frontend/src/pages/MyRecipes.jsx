import {Cursor} from "../components/Cursor.jsx";
import {FlickerText} from "../components/FlickerText.jsx";
import {ReactiveLink} from "../components/ReactiveLink.jsx";
import {DynamicProgress} from "../components/DynamicProgress.jsx";
import {useEffect, useState} from "react";
import {HoverDisplayBar} from "../components/HoverDisplayBar.jsx";
import {HorizontalBarChart} from "../components/HorizontalBarChart.jsx";
import {queryLinkOver} from "../context/LinkOverTrigger.jsx";
import {useNavigate} from "react-router-dom";

export const MyRecipes = () => {
	const [percentage, setPercentage] = useState(20);
	const [user, setUser] = useState(null);
	const [openLiked, setOpenLiked] = useState(true);
	const [meals, setMeals] = useState(["Eggs Benedict"]);
	const navigate = useNavigate()
	const [liked, setLiked] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null);
	const daily_requirements = [55, 25, 250, 30, 2000];
	const {setLinkOver} = queryLinkOver();
	``
	const dataset = {
		labels: ["Protein", "Fat", "Carbohydrates", "Sugar", "Sodium"],
		data: [25/55, 10/25, 20/250, 1/30, 1000/2000]
	}

	useEffect(() => {
		async function getUser() {
			const token = localStorage.getItem('token')
			if(!token) {
				navigate("/Signin")
			}
			let response = await fetch("http://localhost:5116/user-info", {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authentication: `Bearer ${token}`
				}
			})
			let resp = await response.json()
			console.log(resp)
			if(!response.ok) {
				navigate("/Signin")
			} else {
				setUser(resp.user)
			}}
		getUser()
	}, [])

	// useEffect(() => {
	// 	fetch('http://localhost:5116/get-user-recipes', {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		}
	// 	}).then(response => response.json())
	// 		.then(response => setMeals(response))
	// 		.catch(err => {console.log(err)})
	// }, [])

	const handleUpload = () => {
		if (!selectedFile) {
			alert('Please select a file first');
			return;
		}
		const formData = new FormData();
		formData.append('image', selectedFile);

		fetch('YOUR_API_ENDPOINT', {
			method: 'POST',
			body: formData,
		})
			.then(response => response.json())
			.then(data => {
				console.log('Image uploaded successfully:', data);
			})
			.catch(error => {
				console.error('Error uploading image:', error);
			});
	};

	return (
		<div style={{backgroundImage: 'url("https://www.pixground.com/windows-11-abstract-grey-bloom-4k-wallpaper/?download-img=2k")'}} className="bg-cover h-full w-full bg-black grid grid-rows-[8%_92%] overflow-hidden">
			<Cursor />
			<div className="grid grid-rows-1 bg-slate-900 grid-cols-[15%_65%_20%]">
				<ReactiveLink to="/"><FlickerText className="font-serif text-white hover:bg-slate-950 font-semibold text-3xl pl-8" display_text={"Adahack"}/> </ReactiveLink>
				<div className="bg-slate-700"></div>
				<div className="bg-slate-900 grid grid-cols-2">
					<ReactiveLink classes="hover:bg-slate-950 bg-slate-800 font-serif text-white text-2xl items-center flex justify-center w-full h-full" to="/signin">My recipes</ReactiveLink>
					<ReactiveLink classes="hover:bg-slate-950 font-serif text-white text-2xl items-center flex justify-center w-full h-full" to="/signin">
						Sign in
					</ReactiveLink>
				</div>
			</div>
			<div className="overflow-y-auto overflow-x-hidden scrollbar">
				<div className="grid grid-cols-[20%_45%_35%] h-2/5 backdrop-blur-2xl m-8 bg-opacity-20 bg-slate-500 rounded-2xl transition-shadow duration-500 shadow-lg hover:shadow-xl">
					<div className="flex h-full w-full items-center justify-center">
						<DynamicProgress percentage={percentage}/>
						<div onClick={()=> setPercentage(percentage + 5)} className="fixed h-full w-[20%] grid-rows-[50%_50%] grid items-center justify-center text-white text-5xl font-serif">
							<div className="h-full w-full flex items-end justify-center">{percentage}%</div>
							<div className="h-full w-full flex items-start text-sm pt-2 text-gray-400">Of daily calorific requirement</div>

						</div>
					</div>
					<div style={{boxShadow: 'inset 0px 0px 80px rgba(0, 0, 0, 0.2), inset 0px 0px 40px rgba(0, 0, 0, 0.2)'}} className="flex overflow-auto bg-slate-900 bg-opacity-40">
						{
							meals.map((meal, index) => {
								return (
									<HoverDisplayBar key={index} left_val={220} className="bg-slate-400 shadow-lg hover:shadow-2xl transition-shadow h-1/5 rounded-xl w-full ml-3 mr-3 mt-3 bg-opacity-20">
										{meal}
										<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" onMouseEnter={()=>{setLinkOver(true)}} onMouseLeave={()=>{setLinkOver(false)}}
											 strokeWidth="1.5" stroke="currentColor" className="hover:fill-green-400 w-6 h-6">
											<path strokeLinecap="round" strokeLinejoin="round"
												  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
										</svg>

									</HoverDisplayBar>
								)
							})
						}
					</div>
					<div className="p-8">
						<HorizontalBarChart dataset={dataset}/>
					</div>
				</div>
				<div className="h-[10%] m-8 rounded-xl bg-red-400 bg-opacity-40 transition-all hover:bg-opacity-60 backdrop-blur-xl p-2" onMouseEnter={()=>{setLinkOver(true)}} onMouseLeave={()=>{setLinkOver(false)}}>
					<div className="h-full border-dashed rounded-lg border-2 flex items-center justify-center text-white text-xl font-serif">
						Upload New Images
					</div>
				</div>

				<div className={`h-[8%] p-4 justify-between font-serif text-3xl text-white flex items-center rounded-t-xl ${openLiked ? '' : "rounded-b-xl"} backdrop-blur-3xl shadow-lg hover:shadow-xl transition-colors transition-shadow ml-8 mr-8 mt-8 ${openLiked ? "bg-opacity-40" : "bg-opacity-20"} bg-slate-500`}
					 onClick={()=>{setOpenLiked((init)=> !init)}}
					 onMouseEnter={()=>{setLinkOver(true)}} onMouseLeave={()=>{setLinkOver(false)}}>
					Liked Recipes
					<svg xmlns="http://www.w3.org/2000/svg" fill={openLiked ? "white" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
					</svg>
				</div>
				{openLiked &&
					liked.map((item, index)=>(
						<div key={index} className=" rounded-b-xl justify-center flex flex-wrap backdrop-blur-3xl shadow-lg hover:shadow-xl transition-shadow ml-8 mr-8 mb-8 pl-4 pr-4 pb-4 bg-opacity-20 bg-slate-500">
							<div className="rounded-lg font-serif text-xl text-slate-300 p-3 mr-2 mt-4 w-[19%] bg-slate-950 shadow-lg hover:text-white transition-all bg-opacity-60">Eggs Benedict</div>
						</div>
					))
				}
			</div>
		</div>
	)
}