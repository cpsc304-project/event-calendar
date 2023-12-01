import TextField from "@/lib/components/form/TextField";
import { AddressAutofill } from "./mapbox";
import { InputArgs } from "@/lib/form/client";

interface Props {
	mapboxApiKey: string;
	args: InputArgs;
	address: string;
	setAddress: (address: string) => void;
}

export default function Autofill({ mapboxApiKey, args, address, setAddress }: Props) {
	return (
		<AddressAutofill accessToken={mapboxApiKey}>
			<TextField
				args={args}
				autoComplete="street-address"
				value={address}
				onChange={(e) => setAddress(e.target.value)}
			>
				Street address
			</TextField>
		</AddressAutofill>
	);
}
