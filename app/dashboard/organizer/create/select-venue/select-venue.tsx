"use client";
import { venues } from "@/lib/controller";
import { Venue, VenueInfo } from "@/lib/schema";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { useState } from "react";
import AddVenue from "./add-venue";

export default function SelectVenuePage(props: { venues: VenueInfo[] }) {
	const [value, setValue] = useState<(typeof top100Films)[number] | null>(null);
	const [showCreateVenue, setShowCreateVenue] = useState<boolean>(false);
	const [selectedVenue, setSelectedVenue] = useState<(typeof venuesToDisplay)[number] | null>(null);
	const venuesToDisplay = props.venues.map((venue) => {
		return {
			label:
				venue.name + " [" + venue.venue_type_name + "] - " + venue.city + ", " + venue.province,
			venue: venue,
		};
	});

	const {
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
		focused,
	} = useAutocomplete({
		id: "use-autocomplete-demo",
		options: venuesToDisplay,
		getOptionLabel: (option) => option.label,
		value: selectedVenue,
		onChange: (event, newValue) => setSelectedVenue(newValue),
	});

	return (
		<>
			<div className="flex flex-col">
				<div className="mb-3 text-4xl">Select a Venue</div>
				<div className="text-base font-medium text-stone-500">
					First thing&apos;s first, select a venue for your event
				</div>
				{/* SELECT CONTENT */}
				<label className="mb-1 block text-base" {...getInputLabelProps()}>
					Select a venue
				</label>

				<div className="inline-flex items-center">
					<div className="">
						<div
							{...getRootProps()}
							className={`focused:border-indigo-400 flex w-80 gap-1 overflow-hidden
					rounded-lg border-2 border-solid border-stone-700 bg-white pr-1 text-base font-normal text-stone-500 hover:border-indigo-400 focus-visible:outline-0 ${
						focused ? "focused" : ""
					}`}
						>
							<input
								className="flex w-80 flex-shrink-0 flex-grow basis-auto rounded-lg border-none px-2 py-2 text-sm font-normal outline-0 "
								{...getInputProps()}
							/>
						</div>
						{groupedOptions.length > 0 && (
							<ul
								className="absolute z-10 box-border  max-h-72 w-80 overflow-auto rounded-lg border-stone-200 bg-stone-100 p-3 text-sm text-stone-900 outline-0"
								{...getListboxProps()}
							>
								{(groupedOptions as typeof venuesToDisplay).map((option, index) => (
									<li
										key={option.venue.postal_code}
										className="cursor-default list-none rounded-lg p-2 last-of-type:border-b-0 hover:cursor-pointer hover:bg-indigo-50 aria-selected:bg-indigo-100 aria-selected:text-indigo-900 "
										{...getOptionProps({ option, index })}
									>
										{option.label}
									</li>
								))}
							</ul>
						)}
					</div>
					<button className={`btn rounded bg-indigo-500 px-3 py-2 ml-2 font-bold text-white`}>
						Continue
					</button>
				</div>

				<hr className="mb-3 mt-2" />
				<div className="inline-flex ">
					<div className="my-auto mr-3 text-base">Venue not there?</div>
					<button
						className="text-base font-bold underline text-indigo-500 inline-flex items-center "
						onClick={() => {
							setShowCreateVenue(!showCreateVenue);
						}}
					>
						<div>Add a Venue</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className={`h-4 w-4 ml-2 [transform:rotate(0deg)] [transition:transform_0.33s_linear] ${
								showCreateVenue
									? "[transition:transform_0.33s_linear] [transform:rotate(180deg)]"
									: ""
							}`}
						>
							<path
								fillRule="evenodd"
								d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</div>
				{showCreateVenue && <AddVenue />}
			</div>
		</>
	);
}

const top100Films = [
	{ label: "The Shawshank Redemption", year: 1994 },
	{ label: "The Godfather", year: 1972 },
	{ label: "The Godfather: Part II", year: 1974 },
	{ label: "The Dark Knight", year: 2008 },
	{ label: "12 Angry Men", year: 1957 },
	{ label: "Schindler's List", year: 1993 },
	{ label: "Pulp Fiction", year: 1994 },
	{
		label: "The Lord of the Rings: The Return of the King",
		year: 2003,
	},
	{ label: "The Good, the Bad and the Ugly", year: 1966 },
	{ label: "Fight Club", year: 1999 },
	{
		label: "The Lord of the Rings: The Fellowship of the Ring",
		year: 2001,
	},
	{
		label: "Star Wars: Episode V - The Empire Strikes Back",
		year: 1980,
	},
	{ label: "Forrest Gump", year: 1994 },
	{ label: "Inception", year: 2010 },
	{
		label: "The Lord of the Rings: The Two Towers",
		year: 2002,
	},
	{ label: "One Flew Over the Cuckoo's Nest", year: 1975 },
	{ label: "Goodfellas", year: 1990 },
	{ label: "The Matrix", year: 1999 },
	{ label: "Seven Samurai", year: 1954 },
	{
		label: "Star Wars: Episode IV - A New Hope",
		year: 1977,
	},
	{ label: "City of God", year: 2002 },
	{ label: "Se7en", year: 1995 },
	{ label: "The Silence of the Lambs", year: 1991 },
	{ label: "It's a Wonderful Life", year: 1946 },
	{ label: "Life Is Beautiful", year: 1997 },
	{ label: "The Usual Suspects", year: 1995 },
	{ label: "Léon: The Professional", year: 1994 },
	{ label: "Spirited Away", year: 2001 },
	{ label: "Saving Private Ryan", year: 1998 },
	{ label: "Once Upon a Time in the West", year: 1968 },
	{ label: "American History X", year: 1998 },
	{ label: "Interstellar", year: 2014 },
	{ label: "Casablanca", year: 1942 },
	{ label: "City Lights", year: 1931 },
	{ label: "Psycho", year: 1960 },
	{ label: "The Green Mile", year: 1999 },
	{ label: "The Intouchables", year: 2011 },
	{ label: "Modern Times", year: 1936 },
	{ label: "Raiders of the Lost Ark", year: 1981 },
	{ label: "Rear Window", year: 1954 },
	{ label: "The Pianist", year: 2002 },
	{ label: "The Departed", year: 2006 },
	{ label: "Terminator 2: Judgment Day", year: 1991 },
	{ label: "Back to the Future", year: 1985 },
	{ label: "Whiplash", year: 2014 },
	{ label: "Gladiator", year: 2000 },
	{ label: "Memento", year: 2000 },
	{ label: "The Prestige", year: 2006 },
	{ label: "The Lion King", year: 1994 },
	{ label: "Apocalypse Now", year: 1979 },
	{ label: "Alien", year: 1979 },
	{ label: "Sunset Boulevard", year: 1950 },
	{
		label: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
		year: 1964,
	},
	{ label: "The Great Dictator", year: 1940 },
	{ label: "Cinema Paradiso", year: 1988 },
	{ label: "The Lives of Others", year: 2006 },
	{ label: "Grave of the Fireflies", year: 1988 },
	{ label: "Paths of Glory", year: 1957 },
	{ label: "Django Unchained", year: 2012 },
	{ label: "The Shining", year: 1980 },
	{ label: "WALL·E", year: 2008 },
	{ label: "American Beauty", year: 1999 },
	{ label: "The Dark Knight Rises", year: 2012 },
	{ label: "Princess Mononoke", year: 1997 },
	{ label: "Aliens", year: 1986 },
	{ label: "Oldboy", year: 2003 },
	{ label: "Once Upon a Time in America", year: 1984 },
	{ label: "Witness for the Prosecution", year: 1957 },
	{ label: "Das Boot", year: 1981 },
	{ label: "Citizen Kane", year: 1941 },
	{ label: "North by Northwest", year: 1959 },
	{ label: "Vertigo", year: 1958 },
	{
		label: "Star Wars: Episode VI - Return of the Jedi",
		year: 1983,
	},
	{ label: "Reservoir Dogs", year: 1992 },
	{ label: "Braveheart", year: 1995 },
	{ label: "M", year: 1931 },
	{ label: "Requiem for a Dream", year: 2000 },
	{ label: "Amélie", year: 2001 },
	{ label: "A Clockwork Orange", year: 1971 },
	{ label: "Like Stars on Earth", year: 2007 },
	{ label: "Taxi Driver", year: 1976 },
	{ label: "Lawrence of Arabia", year: 1962 },
	{ label: "Double Indemnity", year: 1944 },
	{
		label: "Eternal Sunshine of the Spotless Mind",
		year: 2004,
	},
	{ label: "Amadeus", year: 1984 },
	{ label: "To Kill a Mockingbird", year: 1962 },
	{ label: "Toy Story 3", year: 2010 },
	{ label: "Logan", year: 2017 },
	{ label: "Full Metal Jacket", year: 1987 },
	{ label: "Dangal", year: 2016 },
	{ label: "The Sting", year: 1973 },
	{ label: "2001: A Space Odyssey", year: 1968 },
	{ label: "Singin' in the Rain", year: 1952 },
	{ label: "Toy Story", year: 1995 },
	{ label: "Bicycle Thieves", year: 1948 },
	{ label: "The Kid", year: 1921 },
	{ label: "Inglourious Basterds", year: 2009 },
	{ label: "Snatch", year: 2000 },
	{ label: "3 Idiots", year: 2009 },
	{ label: "Monty Python and the Holy Grail", year: 1975 },
];
