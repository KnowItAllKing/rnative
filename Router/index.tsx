import React, { useState, useEffect, Component } from 'react';

const RegisterRoutes = ({ routes, defaultRoute }: Register) => {
	const [route, setRoute] = useState(defaultRoute);

	const ActiveRoute = () => <>routes[route]</>;

	return <ActiveRoute />;
};

type Register = { routes: Route; defaultRoute: string };

type Route = {
	[routeName: string]: Component;
};
