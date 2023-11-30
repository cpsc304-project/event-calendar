export default function AddVenue() {
	return (
		<>
			<div className="mt-2 h-auto p-3 w-full border-2 border-dashed">
				<div className="grid grid-cols-2 gap-4">
					<div className="col-span-2 grid grid-cols-10 gap-3 sm:col-span-1">
						<div className="col-span-10 mb-2 text-2xl">Venue Info</div>
						<div className="col-span-3">Name</div>
						<input
							className="col-span-7 rounded-lg border-2 border-solid border-stone-300 bg-white px-2 text-small font-normal text-stone-500 hover:border-indigo-400"
							inputMode="text"
						></input>
						<div className="col-span-3">Seats</div>
						<input
							className="col-span-7 rounded-lg border-2 border-solid border-stone-300 bg-white px-2 text-small font-normal text-stone-500 hover:border-indigo-400 "
							inputMode="numeric"
						></input>
						<div className="col-span-10">Description</div>
						<input
							className="col-span-10 w-full rounded-lg border-2 border-solid border-stone-300 bg-white px-2 text-small font-normal text-stone-500 hover:border-indigo-400"
							inputMode="text"
						></input>
					</div>
					<div className="col-span-2 grid grid-cols-10 gap-y-3 gap-x-2 sm:col-span-1">
						<div className="col-span-10 mb-2 text-2xl">Venue Address:</div>
						<div className="col-span-7">Street Number:</div>
						<input
							className="col-span-3 rounded-lg border-2 border-solid border-stone-300 bg-white px-2 text-small font-normal text-stone-500 hover:border-indigo-400"
							inputMode="numeric"
						></input>
						<div className="col-span-5">Street Name:</div>
						<input
							className="col-span-5 rounded-lg border-2 border-solid border-stone-300 bg-white px-2 text-small font-normal text-stone-500 hover:border-indigo-400 "
							inputMode="text"
						></input>
						<div className="col-span-3">Province:</div>
						<input
							className="col-span-2 rounded-lg border-2 border-solid border-stone-300 bg-white px-2 text-small font-normal text-stone-500 hover:border-indigo-400"
							inputMode="text"
							name="province"
							id="province"
						></input>
						<div className="col-span-3">Postal Code:</div>
						<input
							className="col-span-2 rounded-lg border-2 border-solid border-stone-300 bg-white px-2 text-small font-normal text-stone-500 hover:border-indigo-400"
							inputMode="text"
							name="postalCode"
							id="postalCode"
						></input>
						<div className="col-span-4">Country:</div>
						<input
							className="col-span-6 rounded-lg border-2 border-solid border-stone-300 bg-white px-2 text-small font-normal text-stone-500 hover:border-indigo-400"
							inputMode="text"
							name="country"
						></input>
					</div>
				</div>
				<button className={` ml-auto mt-2 justify-end btn col-span-3 rounded bg-indigo-500 px-3 py-2 font-bold text-white`}>
						Add Venue
					</button>
			</div>
		</>
	);
}
