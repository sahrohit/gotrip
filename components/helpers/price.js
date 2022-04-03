const calculatePrice = (distance, trainClass) => {
	if (trainClass === "first_ac") {
		return distance * 2;
	} else if (trainClass === "second_ac") {
		return distance * 1.2;
	} else if (trainClass === "third_ac") {
		return distance * 1;
	} else if (trainClass === "sleeper") {
		return distance * 0.4;
	} else return null;
};

export default calculatePrice;
