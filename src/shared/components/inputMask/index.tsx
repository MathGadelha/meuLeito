import * as React from "react";
import ReactInputMask, { Props } from "react-input-mask";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		Props {}

const InputMask = React.forwardRef<ReactInputMask, InputProps>(
	({ type, ...props }, ref) => {
		return (
			<ReactInputMask
				type={type}
				className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-800"
				ref={ref}
				{...props}
			/>
		);
	}
);
InputMask.displayName = "InputMask";

export { InputMask };
