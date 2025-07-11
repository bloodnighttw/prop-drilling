import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("/context", "routes/context.tsx"),
    route("/redux", "example/redux.tsx"),
    route("/zustand", "example/zustand.tsx")
] satisfies RouteConfig;
