import type React from "react";

export function RandomBackgroundColorBlock({ children }: { children: React.ReactNode; }) {
    const colors = ["bg-red-900", "bg-green-900", "bg-blue-900", "bg-yellow-900", "bg-purple-900", "bg-pink-900", "bg-indigo-900", "bg-teal-900"];
    const cn = colors[Math.floor(Math.random() * colors.length)] + " *:my-2 border p-4 *:h1:text-4xl";

    return <div className={cn}>
        {children}
    </div>;
}
