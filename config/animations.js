const DURATIONS = {
	VeryFast: 0.3,
	Fast: 0.6,
	Normal: 0.8,
	Slow: 1.2,
	VerySlow: 1.8,
};
const easing = [0.6, -0.05, 0.01, 0.99];

export const staggerParent = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.4,
			staggerChildren: 0.2,
		},
	},
};

export const staggerChild = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};

export const fadeInUpSlower = {
	initial: {
		y: 100,
		opacity: 0,
	},
	animate: {
		y: 0,
		opacity: 100,
		transition: {
			duration: DURATIONS.Normal,
			ease: easing,
		},
	},
};
