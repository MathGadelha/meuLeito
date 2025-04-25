import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing, which is a technique used to limit the execution rate of a function.
 * @param {string} value The value that will be debounced.
 * @param {number} [delay=750] The time in milliseconds that the function should wait before executing. Default is 750ms.
 * @returns {object} An object containing the value debouncedValue: string, valueChanged: boolean indicating whether the value has changed, setValueChanged to update this valueChanged.
 *
 * @example
 * const MyComponent = () => {
 *   const [searchTerm, setSearchTerm] = useState('');
 *   const { debouncedValue, valueChanged } = useDebounce(searchTerm, 500);
 *
 *   useEffect(() => {
 *     if (valueChanged) {
 *       // Make API call or perform some action with the debounced value
 *       console.log(`Searching for: ${debouncedValue}`);
 *     }
 *   }, [debouncedValue, valueChanged]);
 *
 *   return (
 *     <div>
 *       <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
 *       <p>Debounced value: {debouncedValue}</p>
 *     </div>
 *   );
 * };
 */
function useDebounce(value: string, delay: number = 750) {
	const [debouncedValue, setDebouncedValue] = useState(value);
	const [valueChanged, setValueChanged] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedValue(value);
			setValueChanged(true);
		}, delay);

		return () => {
			clearTimeout(timer);
		};
	}, [value, delay]);

	return {
		debouncedValue,
		valueChanged,
		setValueChanged,
	};
}

export { useDebounce };
