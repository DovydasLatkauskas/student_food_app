import {useEffect, useState} from "react";

export const Cafes = () => {
	const [cafes, setCafes] = useState([]);
	const [userLocation, setUserLocation] = useState(null);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			setUserLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});
		});
	}, []);

	useEffect(() => {
		const fetchCafes = async () => {
			try {
				const response = await fetch('http://localhost:5116/university-cafes-data');
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				const data = await response.json();
				setCafes(data.cafeData);
			} catch (error) {
				console.error('Failed to fetch cafes:', error);
			}
		};
		fetchCafes();
	}, []);

	const [sortedCafes, setSortedCafes] = useState([]);
	useEffect(() => {
			if (userLocation) {
				const newSortedCafes = [...cafes].sort((a, b) => {
					console.log(a)
					console.log(b)

					const distanceToA = calculateDistance(userLocation, a.cafeLocation);
					const distanceToB = calculateDistance(userLocation, b.cafeLocation);
					return distanceToA - distanceToB;
				});
				setSortedCafes(newSortedCafes);
			}
		}, [userLocation, cafes]);

		const calculateDistance = (location1, location2) => {
			const xDiff = location2.latitude - location1.latitude;
			const yDiff = location2.longitude - location1.longitude;
			const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
			return distance;
		}
	return (
		<div className="">
            <ul>
				{sortedCafes.map((cafe) => {
					const { name, address, openingTime, menuUrl, cafeLocation } = cafe;
					let distance = 0;
					if (cafeLocation) {
						distance = calculateDistance(userLocation, cafeLocation);
					}
						return (
						<li key={name}>
							<h2>{name}</h2>
							<p>{address}</p>
							<p>Term Opening Time: {openingTime.termTime}</p>
							<p>Non-Term Opening Time: {openingTime.nonTermTime}</p>
							<a href={menuUrl}>Menu</a>
							<p>Distance: {distance.toFixed(2)}</p>
						</li>
					);
				})}
            </ul>
		</div>
	)
}