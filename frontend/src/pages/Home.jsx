import {Cursor} from "../components/Cursor.jsx";
import {FlickerText} from "../components/FlickerText.jsx";
import {ReactiveLink} from "../components/ReactiveLink.jsx";

export const Home = () => {
	return (
		<div className="h-full w-full bg-black grid grid-rows-[8%_92%]">
			<Cursor />
			<div className="grid grid-rows-1 bg-slate-900 grid-cols-[15%_65%_20%]">
				<FlickerText className="text-white font-semibold text-3xl pl-8" display_text={"Alpha"} />
				<div className="bg-slate-700"></div>
				<div className="bg-slate-900 grid grid-cols-2">
					<ReactiveLink classes="hover:bg-slate-950 bg-slate-800 font-serif text-white text-2xl items-center flex justify-center w-full h-full" to="/my_recipes">My recipes</ReactiveLink>
					<ReactiveLink classes="hover:bg-slate-950 font-serif text-white text-2xl items-center flex justify-center w-full h-full" to="/signin">
						Sign in
					</ReactiveLink>
				</div>
			</div>
			<div className=""></div>
		</div>
	)
}