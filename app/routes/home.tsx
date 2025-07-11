import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <div>
    <Link to="/context" className="text-blue-500 hover:underline">
      Context Example
    </Link>
    <br />
    <Link to="/redux" className="text-blue-500 hover:underline">
      Redux Example
    </Link>
    <br />  
    <Link to="/zustand" className="text-blue-500 hover:underline">
      Zustand Example
    </Link>
    <br />
    <Link to="/uses" className="text-blue-500 hover:underline">
      useSyncExternalStore Example
    </Link>
  </div>;
}
