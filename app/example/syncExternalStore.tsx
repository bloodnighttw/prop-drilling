import { useSyncExternalStore } from 'react'
import { RandomBackgroundColorBlock } from './RandomBackgroundColorBlock'

type Theme = 'light' | 'dark'

interface ThemeState {
    theme: Theme
    switchToLight: () => void
    switchToDark: () => void
    toggleTheme: () => void
}

// Create external store
class ThemeStore {
    private state: { theme: Theme } = { theme: 'light' }
    private listeners = new Set<() => void>()

    getState = () => this.state

    setState = (newState: Partial<{ theme: Theme }>) => {
        this.state = { ...this.state, ...newState }
        this.listeners.forEach(listener => listener())
    }

    subscribe = (listener: () => void) => {
        this.listeners.add(listener)
        // clean up the listener when it is no longer needed
        return () => this.listeners.delete(listener)
    }

    switchToLight = () => this.setState({ theme: 'light' })
    switchToDark = () => this.setState({ theme: 'dark' })
    toggleTheme = () => this.setState({ 
        theme: this.state.theme === 'light' ? 'dark' : 'light' 
    })
}

const themeStore = new ThemeStore()

// Custom hook using useSyncExternalStore
function useThemeStore<T>(selector: (state: ThemeState) => T): T {
    return useSyncExternalStore(
        themeStore.subscribe,
        () => selector({
            theme: themeStore.getState().theme,
            switchToLight: themeStore.switchToLight,
            switchToDark: themeStore.switchToDark,
            toggleTheme: themeStore.toggleTheme
        })
    )
}

export default function Parent() {
    return (
        <RandomBackgroundColorBlock>
            <h1>useSyncExternalStore Example</h1>
            <Child1 />
            <Child2 />
        </RandomBackgroundColorBlock>
    )
}

export function Child1() {
    const switchToLight = useThemeStore((state) => state.switchToLight)
    const switchToDark = useThemeStore((state) => state.switchToDark)
    const toggleTheme = useThemeStore((state) => state.toggleTheme)

    return (
        <RandomBackgroundColorBlock>
            <h1>Child1</h1>
            <div className="flex gap-2 *:p-2">
                <button onClick={switchToDark} className="bg-amber-950 rounded">Switch to Dark</button>
                <button onClick={switchToLight} className="bg-amber-200 rounded text-cyan-900">Switch to Light</button>
                <button onClick={toggleTheme} className="bg-amber-500 rounded text-cyan-900">Toggle Theme</button>
            </div>
        </RandomBackgroundColorBlock>
    )
}

export function Child2() {
    const theme = useThemeStore((state) => state.theme)
    const toggleTheme = useThemeStore((state) => state.toggleTheme)

    const cn = (theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white') + ' p-4'
    const randomColorHex = Math.random().toString(16).slice(2, 8)

    return (
        <div className={cn} style={{ borderColor: `#${randomColorHex}`, borderWidth: "8px", borderStyle: "solid" }}>
            <h1>Child2</h1>
            <p>Current Theme: {theme}</p>
            <button onClick={toggleTheme} className="bg-amber-500 rounded text-cyan-900 w-auto p-2">switch theme</button>
        </div>
    )
}