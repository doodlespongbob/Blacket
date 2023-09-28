import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { config } from "@stores/config";
import pages from "./pages";

function App() {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => config !== null && setLoaded(true), []);

	return (<>
		{!loaded && <pages.Loading />}
		{loaded && (<>
			{typeof config == "string" ? (<pages.Error403 reason={config} />) : config === 1 ? (<pages.Error502 />) : (
				<RouterProvider router={createBrowserRouter([
					{ path: "*", element: <pages.Error404 /> },
					{ path: "/", element: <pages.Home /> },
					/*{ path: "/login", element: <pages.Authentication type="Login" /> },
					{ path: "/register", element: <pages.Authentication type="Register" /> }*/
				])} />
			)}
		</>)}
	</>);
}

createRoot(document.getElementById("app")).render(<App />);