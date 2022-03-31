import React from "react";
import {
	Avatar,
	Badge,
	Table,
	Group,
	Text,
	ActionIcon,
	Anchor,
	ScrollArea,
	useMantineTheme,
} from "@mantine/core";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

const jobColors = {
	engineer: "blue",
	manager: "cyan",
	designer: "pink",
};

const Bookings = () => {
	const theme = useMantineTheme();
	const rows = data.map((item) => (
		<>
			<tr key={item.name}>
				<td>
					<Group spacing="sm">
						<Avatar size={30} src={item.avatar} radius={30} />
						<Text size="sm" weight={500}>
							{item.name}
						</Text>
					</Group>
				</td>

				<td>
					<Badge
						color={jobColors[item.job.toLowerCase()]}
						variant={theme.colorScheme === "dark" ? "light" : "outline"}
					>
						{item.job}
					</Badge>
				</td>
				<td>{item.email}</td>
				<td>
					<Text size="sm" color="gray">
						{item.phone}
					</Text>
				</td>
				<td>
					<Group spacing={0} position="right">
						<ActionIcon>
							<BsPencilSquare size={16} />
						</ActionIcon>
						<ActionIcon color="red">
							<BsTrash size={16} />
						</ActionIcon>
					</Group>
				</td>
			</tr>
		</>
	));

	return (
		<ScrollArea>
			<Table
				sx={(theme) => ({ minWidth: 800, width: "100%" })}
				verticalSpacing="sm"
			>
				<thead>
					<tr>
						<th>PNR</th>
						<th>Job title</th>
						<th>Email</th>
						<th>Phone</th>
						<th />
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</Table>
		</ScrollArea>
	);
};

export default Bookings;

const data = [
	{
		avatar:
			"https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Robert Wolfkisser",
		job: "Engineer",
		email: "rob_wolf@gmail.com",
		phone: "+44 (452) 886 09 12",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jill Jailbreaker",
		job: "Engineer",
		email: "jj@breaker.com",
		phone: "+44 (934) 777 12 76",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Henry Silkeater",
		job: "Designer",
		email: "henry@silkeater.io",
		phone: "+44 (901) 384 88 34",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Bill Horsefighter",
		job: "Designer",
		email: "bhorsefighter@gmail.com",
		phone: "+44 (667) 341 45 22",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		phone: "+44 (881) 245 65 65",
	},
];
