"use client";

import { useRef, useEffect, useImperativeHandle, ReactNode, forwardRef, ForwardedRef } from "react";

import "@mapbox/search-js-web";

import {
	AddressAutofillOptions,
	AddressAutofillSuggestionResponse,
	AddressAutofillRetrieveResponse,
} from "@mapbox/search-js-core";
import {
	MapboxAddressAutofill,
	Theme,
	MapboxHTMLEvent,
	AddressConfirmOptions,
	PopoverOptions,
} from "@mapbox/search-js-web";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"mapbox-address-autofill": any;
		}
	}
}

export interface AddressAutofillRefType {
	/**
	 * @see {@link MapboxAddressAutofill#focus}
	 */
	focus: typeof MapboxAddressAutofill.prototype.focus;
}

export interface AddressAutofillProps {
	/**
	 * The [Mapbox access token](https://docs.mapbox.com/help/glossary/access-token/) to use for all requests.
	 */
	accessToken: string;
	/**
	 * Options to pass to the underlying {@link AddressAutofillCore} interface.
	 * @example
	 * ```typescript
	 * <AddressAutofill options={{
	 *  language: 'en',
	 *  country: 'US',
	 * }}>
	 * ```
	 */
	options?: Partial<AddressAutofillOptions>;
	/**
	 * The {@link Theme} to use for styling the autofill and confirmation dialog
	 * components.
	 * @example
	 * ```typescript
	 * <AddressAutofill theme={{
	 *   variables: {
	 *     colorPrimary: 'myBrandRed'
	 *   }
	 * }}>
	 * ```
	 */
	theme?: Theme;
	/**
	 * The {@link PopoverOptions} to define popover positioning.
	 * @example
	 * ```typescript
	 * <AddressAutofill popoverOptions={{
	 *   placement: 'top-start',
	 *   flip: true,
	 *   offset: 5
	 * }}>
	 * ```
	 */
	popoverOptions?: Partial<PopoverOptions>;
	/**
	 * If true, forms autofilled by the browser will prompt the
	 * {@link confirmAddress} dialog for user confirmation.
	 * An {@link AddressConfirmOptions} object can also be passed
	 * to prompt {@link confirmAddress} with custom options.
	 * Defaults to false.
	 * @example
	 * ```typescript
	 * <AddressAutofill confirmOnBrowserAutofill={{
	 *   minimap: true,
	 *   skipConfirmModal: (feature) =>
	 *     ['exact', 'high'].includes(
	 *       feature.properties.match_code.confidence
	 *     )
	 * }}>
	 * ```
	 */
	confirmOnBrowserAutofill?: boolean | AddressConfirmOptions;

	/**
	 * Enables the browser's autocomplete popup to show during the first two typed characters while Mapbox results are suppressed. Defaults to false.
	 *
	 * **Note:** Due to varying specifications, efforts to suppress browser autocomplete behavior may not work on all browsers.
	 */
	browserAutofillEnabled?: boolean;

	/**
	 * Children to render inside the autofill component. This **must** include
	 * an [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text) element
	 * with either autocomplete type `"street-address"` or `"address-line1"`.
	 */
	children: ReactNode;
	/**
	 * Callback for when the `<input>` value changes.
	 */
	onChange?: (value: string) => void;
	/**
	 * Fired when the user is typing in the input and provides a list of suggestions.
	 * The underlying response from {@link AddressAutofillCore} is passed.
	 */
	onSuggest?: (res: AddressAutofillSuggestionResponse) => void;
	/**
	 * Fired when {@link AddressAutofillCore} has errored providing a list of suggestions.
	 * The underlying error is passed.
	 */
	onSuggestError?: (error: Error) => void;
	/**
	 * Fired when the user has selected a suggestion, before the form is autofilled.
	 * The underlying response from {@link AddressAutofillCore} is passed.
	 */
	onRetrieve?: (res: AddressAutofillRetrieveResponse) => void;

	/**
	 * A callback providing the opportunity to validate and/or manipulate the input text before it triggers a search, for example by using a regular expression.
	 * If a truthy string value is returned, it will be passed into the underlying search API. If `null`, `undefined` or empty string is returned, no search request will be performed.
	 */
	interceptSearch?: (value: string) => string;
}

/**
 * `<AddressAutofill>` is a React component that wraps an address
 * [`<input>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/text) element with intelligent, location-aware autocomplete functionality.
 *
 * To use this element, you must have a [Mapbox access token](https://www.mapbox.com/help/create-api-access-token/).
 *
 * This component must be a descendant of a [`<form>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form), and the form
 * must have inputs with proper HTML `autocomplete` attributes. If your application works with browser autofill, you may already have
 * this functionality.
 * - [The HTML autocomplete attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete)
 * - [Autofill](https://web.dev/learn/forms/autofill/)
 *
 * Internally, this wraps the [`<mapbox-address-autofill>`](https://docs.mapbox.com/mapbox-search-js/api/web/autofill/#mapboxaddressautofill) element.
 *
 * @function AddressAutofill
 * @param {AddressAutofillProps} props
 * @example
 * ```typescript
 * export function Component() {
 *   const [value, setValue] = React.useState('');
 *   return (
 *     <form>
 *       <AddressAutofill accessToken={<your access token here>}>
 *         <input
 *           autoComplete="shipping address-line1"
 *           value={value}
 *           onChange={(e) => setValue(e.target.value)}
 *         />
 *       </AddressAutofill>
 *     </form>
 *   );
 * }
 * ```
 */
function AddressAutofillInner(
	props: AddressAutofillProps,
	ref: ForwardedRef<AddressAutofillRefType>,
) {
	const {
		accessToken,
		options,
		theme,
		popoverOptions,
		confirmOnBrowserAutofill,
		browserAutofillEnabled,
		children,
		onChange,
		onSuggest,
		onSuggestError,
		onRetrieve,
		interceptSearch,
	} = props;

	const autofillRef = useRef<MapboxAddressAutofill>(null);

	useImperativeHandle(ref, () => ({
		focus: () => {
			autofillRef.current?.focus();
		},
	}));

	// Update options.
	useEffect(() => {
		if (autofillRef.current && options) {
			autofillRef.current.options = options;
		}
	}, [autofillRef, options]);

	// Update intercept search.
	useEffect(() => {
		if (autofillRef.current && interceptSearch) {
			autofillRef.current.interceptSearch = interceptSearch;
		}
	}, [autofillRef, interceptSearch]);

	// Update theme.
	useEffect(() => {
		if (autofillRef.current && theme) {
			autofillRef.current.theme = theme;
		}
	}, [autofillRef, theme]);

	// Update popoverOptions
	useEffect(() => {
		if (autofillRef.current && popoverOptions) {
			autofillRef.current.popoverOptions = popoverOptions;
		}
	}, [autofillRef, popoverOptions]);

	// Update confirmOnBrowserAutofill
	useEffect(() => {
		if (autofillRef.current && confirmOnBrowserAutofill) {
			autofillRef.current.confirmOnBrowserAutofill = confirmOnBrowserAutofill;
		}
	}, [autofillRef, confirmOnBrowserAutofill]);

	// Update browserAutofillEnabled
	useEffect(() => {
		if (autofillRef.current && browserAutofillEnabled) {
			autofillRef.current.browserAutofillEnabled = browserAutofillEnabled;
		}
	}, [autofillRef, browserAutofillEnabled]);

	// Update onSuggest.
	useEffect(() => {
		const node = autofillRef.current;
		if (!node) return;
		if (!onSuggest) return;

		const fn = (e: MapboxHTMLEvent<AddressAutofillSuggestionResponse>) => onSuggest(e.detail);

		node.addEventListener("suggest", fn);
		return () => {
			node.removeEventListener("suggest", fn);
		};
	}, [autofillRef, onSuggest]);

	// Update onSuggestError.
	useEffect(() => {
		const node = autofillRef.current;
		if (!node) return;
		if (!onSuggestError) return;

		const fn = (e: MapboxHTMLEvent<Error>) => onSuggestError(e.detail);

		node.addEventListener("suggesterror", fn);
		return () => {
			node.removeEventListener("suggesterror", fn);
		};
	}, [autofillRef, onSuggestError]);

	// Update onRetrieve.
	useEffect(() => {
		const node = autofillRef.current;
		if (!node) return;
		if (!onRetrieve) return;

		const fn = (e: MapboxHTMLEvent<AddressAutofillRetrieveResponse>) => onRetrieve(e.detail);

		node.addEventListener("retrieve", fn);
		return () => {
			node.removeEventListener("retrieve", fn);
		};
	}, [autofillRef, onRetrieve]);

	// Update onChange.
	useEffect(() => {
		const node = autofillRef.current;
		if (!node) return;
		if (!onChange) return;

		const fn = (e: MapboxHTMLEvent<unknown>) => {
			if (e.target !== e.currentTarget) return; // ignore child input event
			if (typeof e.detail !== "string") return; // ignore non-string values
			onChange(e.detail);
		};

		node.addEventListener("input", fn);
		return () => {
			node.removeEventListener("input", fn);
		};
	}, [autofillRef, onChange]);

	// Update accessToken.
	useEffect(() => {
		if (autofillRef.current) {
			autofillRef.current.accessToken = accessToken;
		}
	}, [autofillRef, accessToken]);

	return <mapbox-address-autofill ref={autofillRef}>{children}</mapbox-address-autofill>;
}

export const AddressAutofill = forwardRef(AddressAutofillInner);
