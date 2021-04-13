/** @format */

import { useState, useEffect, useRef } from 'react';

export const useFetch = (url) => {
	const isMounted = useRef(true);

	const [state, setState] = useState({
		data: null,
		loading: true,
		error: null,
	});

	useEffect(() => {
		return () => {
			isMounted.current = false;
		};
	}, []);

	useEffect(() => {
		setState({ data: null, loading: true, error: null });
		fetch(url)
			.then((resp) => resp.json())
			.then((data) => {
				setTimeout(() => {
					if (isMounted.current) {
						setState({
							loading: false,
							error: null,
							data: data,
						});
					} else {
						console.log('setState no se llamo');
					}
				}, 1000);
			});
	}, [url]);

	return state;
};
