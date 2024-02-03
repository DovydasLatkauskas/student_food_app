export const HoverDisplayBar = ({children, left_val}) => {
	return (
		<div className="bg-slate-400 shadow-lg hover:shadow-2xl transition-shadow h-1/5 rounded-xl w-full ml-3 mr-3 mt-3 bg-opacity-20 grid grid-cols-[10%_70%_20%]">
			<div className="bg-yellow-400 m-1 rounded-l-lg">

			</div>
			<div className="flex items-center text-white text-2xl ml-3 mt-2 mb-2 border-r-2 font-serif">
				{children}
			</div>
			<div className="items-center justify-center h-full w-full grid grid-rows-[60%_40%] text-white text-2xl font-serif">
				<div className="h-full w-full flex justify-center items-end">
					{left_val}
				</div>
				<div className="text-sm h-full w-full flex text-slate-400 items-start justify-center">
					Calories
				</div>
			</div>

		</div>
	)
}