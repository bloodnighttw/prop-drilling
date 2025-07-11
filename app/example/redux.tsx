import { configureStore, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { RandomBackgroundColorBlock } from './RandomBackgroundColorBlock';

// theme state
interface ThemeState {
    themeValue: "light" | "dark";
}

const themeSlice = createSlice({
    name: "theme",
    initialState: { themeValue: "light" } as ThemeState,
    reducers: {
        switchTheme: (state) => {
            state.themeValue = state.themeValue === "light" ? "dark" : "light";
        },
        switchToLight: (state, actions: PayloadAction<number>) => {
            console.log("switchToLight action payload:", actions.payload);
            state.themeValue = "light";
        },
        switchToDark: (state) => {
            state.themeValue = "dark";
        }
    }
})

export const { switchTheme, switchToDark, switchToLight } = themeSlice.actions;


const store = configureStore({
    reducer: {
        theme: themeSlice.reducer
    }
})

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;


export default function Parent() {
    
    return <Provider store={store}>
        <RandomBackgroundColorBlock>
            <h1>a redux example</h1>
            <Child1 />
            <Child2 />
        </RandomBackgroundColorBlock>
    </Provider>
}

export function Child1() {

    const dispatch = useDispatch<AppDispatch>();

    return <RandomBackgroundColorBlock>
        <h1>Child1</h1>
        <div className="flex gap-2 *:p-2">
            <button onClick={()=>dispatch(switchToDark())} className="bg-amber-950 rounded">switch dark</button>
            <button onClick={()=>dispatch(switchToLight(5))} className="bg-amber-200 rounded text-cyan-900">switch light</button>
            <button onClick={()=>dispatch(switchTheme())} className="bg-amber-500 rounded text-cyan-900">switch theme</button>
        </div>
    </RandomBackgroundColorBlock>
}

export function Child2() {
    const themeValue = useSelector((state: RootState) => state.theme.themeValue);
    const dispatch = useDispatch<AppDispatch>();

    const cn = themeValue === "dark" ? "bg-gray-800 text-amber-50 p-4" : "bg-white text-gray-900 p-4";

    // generate a random color hex for the border
    // this is just for checking that the component is re-rendering or not.
    // when re-rendering, the border color will change.
    const randomColorHex = Math.random().toString(16).slice(2, 8);

    return <div className={cn} style={{ borderColor: `#${randomColorHex}`, borderWidth: "8px", borderStyle: "solid" }}>
        <h1>Child2</h1>
        <p>Current Theme: {themeValue}</p>
        <button onClick={()=>dispatch(switchTheme())} className="bg-amber-500 rounded text-cyan-900 w-auto p-2">switch theme</button>
    </div>
}