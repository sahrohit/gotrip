import { NAVBAR_LINKS } from "./navbar";

export const FOOTER_LINKS = [
	{
		title: "Quick Links",
		links: [...NAVBAR_LINKS],
	},
	{
		title: "Project",
		links: [
			{
				label: "Contribute",
				link: "#",
			},
			{
				label: "Media assets",
				link: "#",
			},
			{
				label: "Changelog",
				link: "#",
			},
			{
				label: "Releases",
				link: "#",
			},
		],
	},
	{
		title: "Community",
		links: [
			{
				label: "Join Discord",
				link: "#",
			},
			{
				label: "Follow on Twitter",
				link: "#",
			},
			{
				label: "Email newsletter",
				link: "#",
			},
			{
				label: "GitHub discussions",
				link: "#",
			},
		],
	},
];
