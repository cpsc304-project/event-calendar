"use client";

import { Account } from "@/lib/schema";
import { useState, useTransition } from "react";
import { insertOrganizer } from "./actions";

export default function Organizer(props: { user: Account, organizerName: string | undefined}) {

	const [name, setName] = useState(props.organizerName);
	const [isPending, startTransition] = useTransition();

	// MIGHT NOT UPDATE NAME IMMEDIATELY AFTER INSERTING CHECK DURING BUILD
	function handleNameChange()
	{
		if(!name) return;
		startTransition(async () => {
			await insertOrganizer(props.user.account_id , name);
			setName(name);
		});

	}

	return (
		<>
			{/* Organizer Dashboard Container Start */}
			<div className="flex flex-col">
				<div className="mb-2 text-4xl">Organizer Dashboard</div>
				<hr className="mb-3" />
				{/* Dashboard Content */}
				<div className=" gap-3">
					<div className="container">
						<div className="my-1">
							<div className="text-2xl">Personal Info</div>
							<div className="mb-2 flex flex-row">
								<div className="basis-1/2">
									<div className="text-base">Name</div>
								</div>
								<div className="basis-1/3">
									<div>
										<input
											type="text"
											name="name"
											id="name"
											className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900  placeholder:text-gray-400 sm:text-sm sm:leading-6"
											onChange={(e) => setName(e.target.value)}
											value={name}
										></input>
									</div>
								</div>
								<div className="mx-2 basis-1/6">
									<button className="rounded bg-blue-500 px-3 py-1.5 font-bold text-white hover:bg-blue-700" onClick={handleNameChange}>
										Confirm
									</button>
								</div>
							</div>
						</div>
						<hr className="mb-2" />
					</div>

					<div>
						<div className="my-1 flex-col">
							<div className="text-2xl">Events</div>
							EVENTS GO HERE
						</div>
						<hr className="mb-2" />
					</div>
				</div>

				<div></div>
			</div>
			{/* Organizer Dashboard Container End */}
		</>
	);
	}