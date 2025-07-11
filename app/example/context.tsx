import React from "react";
import { RandomBackgroundColorBlock } from "./RandomBackgroundColorBlock";

interface SharedContext {
	themeValue: string;
	setThemeValue: (value: string) => void;
}

const Context = React.createContext<SharedContext | undefined>(undefined);

// Custom hook to use the shared context, we do this to ensure that the context is always used within a provider
export function useSharedContext() {
	const contextValue = React.useContext(Context);
	if (!contextValue) {
		throw new Error(
			"useSharedContext must be used within a SharedProvider, please wrap your component tree with <SharedProvider>.",
		);
	}
	return contextValue;
}

export function Parent() {
	const [themeValue, setThemeValue] = React.useState("light");
	
    return (
		<Context.Provider value={{ themeValue, setThemeValue }}>
			<RandomBackgroundColorBlock>
			    <h1>Parent - current value : {themeValue}</h1>
				<Child />
			</RandomBackgroundColorBlock>
		</Context.Provider>
	);
}

export function Child() {
	const [counter, setCounter] = React.useState(0);

	return (
		<RandomBackgroundColorBlock>
			<h1>Child Component</h1>
			<p>Counter: {counter}</p>
			<button onClick={() => setCounter(counter + 1)}>
				Increment Counter
			</button>
			<GrandChild />
		</RandomBackgroundColorBlock>
	);
}

export function GrandChild() {
	const { themeValue, setThemeValue } = useSharedContext();

	return (
		<RandomBackgroundColorBlock>
			<h1>GrandChild Component</h1>
			<p>Current Theme: {themeValue}</p>
			<button
				onClick={() =>
					setThemeValue(themeValue === "light" ? "dark" : "light")
				}
			>
				Toggle Theme
			</button>
		</RandomBackgroundColorBlock>
	);
}
