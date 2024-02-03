import {Cursor} from "../components/Cursor.jsx";
import {FlickerText} from "../components/FlickerText.jsx";
import {ReactiveLink} from "../components/ReactiveLink.jsx";
import {DynamicProgress} from "../components/DynamicProgress.jsx";
import {useState} from "react";
import {HoverDisplayBar} from "../components/HoverDisplayBar.jsx";
import {HorizontalBarChart} from "../components/HorizontalBarChart.jsx";

export const MyRecipes = () => {
	const [percentage, setPercentage] = useState(20);
	const [meals, setMeals] = useState(["Eggs Benedict"]);
	const daily_requirements = [55, 25, 250, 30, 2000]
	const dataset = {
		labels: ["Protein", "Fat", "Carbohydrates", "Sugar", "Sodium"],
		data: [25/55, 10/25, 20/250, 1/30, 1000/2000]
	}

	return (
		<div style={{backgroundImage: 'url("https://www.pixground.com/windows-11-abstract-grey-bloom-4k-wallpaper/?download-img=2k")'}} className="bg-cover h-full w-full bg-black grid grid-rows-[8%_92%] overflow-hidden">
			<Cursor />
			<div className="grid grid-rows-1 bg-slate-900 grid-cols-[15%_65%_20%]">
				<ReactiveLink to="/"><FlickerText className="text-white font-semibold text-3xl pl-8" display_text={"Alpha"}/> </ReactiveLink>
				<div className="bg-slate-700"></div>
				<div className="bg-slate-900 grid grid-cols-2">
					<ReactiveLink classes="hover:bg-slate-950 bg-slate-800 font-serif text-white text-2xl items-center flex justify-center w-full h-full" to="/signin">My recipes</ReactiveLink>
					<ReactiveLink classes="hover:bg-slate-950 font-serif text-white text-2xl items-center flex justify-center w-full h-full" to="/signin">
						Sign in
					</ReactiveLink>
				</div>
			</div>
			<div className="overflow-auto">
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
									</HoverDisplayBar>
								)
							})
						}
					</div>
					<div className="p-8">
						<HorizontalBarChart dataset={dataset}/>
					</div>
				</div>
			</div>
		</div>
	)
}