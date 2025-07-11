import { create } from 'zustand'
import { RandomBackgroundColorBlock } from './RandomBackgroundColorBlock'

type Theme = 'light' | 'dark'

interface ThemeState {
    theme: Theme
    switchToLight: () => void
    switchToDark: () => void
    toggleTheme: () => void
}

const useThemeStore = create<ThemeState>((set) => ({
    theme: 'light',
    switchToLight: () => set({ theme: 'light' }),
    switchToDark: () => set({ theme: 'dark' }),
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light'
    })),
}))

export default function Parent() {

    return (
        <RandomBackgroundColorBlock>
            <h1>Zustand Example</h1>
            <Child1 />
            <Child2 />
        </RandomBackgroundColorBlock>
    );
}

export function Child1() {

    const switchToLight = useThemeStore((state) => state.switchToLight);
    const switchToDark = useThemeStore((state) => state.switchToDark);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    return (
        <RandomBackgroundColorBlock>
            <h1>Child1</h1>
            <div className="flex gap-2 *:p-2">
                <button onClick={switchToDark} className="bg-amber-950 rounded">Switch to Dark</button>
                <button onClick={switchToLight} className="bg-amber-200 rounded text-cyan-900">Switch to Light</button>
                <button onClick={toggleTheme} className="bg-amber-500 rounded text-cyan-900">Toggle Theme</button>
            </div>
        </RandomBackgroundColorBlock>
    );
}


export function Child2() {
    const theme = useThemeStore((state) => state.theme);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);

    const cn = (theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white') + ' p-4';

    const randomColorHex = Math.random().toString(16).slice(2, 8);

    return <div className={cn} style={{ borderColor: `#${randomColorHex}`, borderWidth: "8px", borderStyle: "solid" }}>
        <h1>Child2</h1>
        <p>Current Theme: {theme}</p>
        <button onClick={toggleTheme} className="bg-amber-500 rounded text-cyan-900 w-auto p-2">switch theme</button>
    </div>

}
