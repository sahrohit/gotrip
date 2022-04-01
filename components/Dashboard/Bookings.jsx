import React from "react";
import {
	Avatar,
	Table,
	Group,
	Text,
	ActionIcon,
	Menu,
	ScrollArea,
	Center,
} from "@mantine/core";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

export default function Bookings() {
	const rows = data.map((item) => (
		<tr key={item.name}>
			<td>
				<Group spacing="sm">
					<Avatar size={40} src={item.avatar} radius={40} />
					<div>
						<Text size="sm" weight={500}>
							{item.name}
						</Text>
						<Text color="dimmed" size="xs">
							{item.job}
						</Text>
					</div>
				</Group>
			</td>
			<td>
				<Text size="sm">{item.email}</Text>
				<Text size="xs" color="dimmed">
					Email
				</Text>
			</td>
			<td>
				<Text size="sm">${item.rate.toFixed(1)} / hr</Text>
				<Text size="xs" color="dimmed">
					Rate
				</Text>
			</td>
			<td>
				<Group spacing={0} position="right">
					<ActionIcon>
						<BsPencilSquare size={16} />
					</ActionIcon>
					<Menu transition="pop" withArrow placement="end">
						<Menu.Item icon={<BsTrash size={16} />}>Send message</Menu.Item>
						<Menu.Item icon={<BsTrash size={16} />}>Add note</Menu.Item>
						<Menu.Item icon={<BsTrash size={16} />}>Analytics</Menu.Item>
						<Menu.Item icon={<BsTrash size={16} />} color="red">
							Terminate contract
						</Menu.Item>
					</Menu>
				</Group>
			</td>
		</tr>
	));

	return (
		<>
			<ScrollArea offsetScrollbars={true}>
				<Table sx={{ minWidth: 800 }} verticalSpacing="md">
					<tbody>{rows}</tbody>
				</Table>
			</ScrollArea>
		</>
	);
}

const data = [
	{
		avatar:
			"https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Robert Wolfkisser",
		job: "Engineer",
		email: "rob_wolf@gmail.com",
		rate: 22,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jill Jailbreaker",
		job: "Engineer",
		email: "jj@breaker.com",
		rate: 45,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Henry Silkeater",
		job: "Designer",
		email: "henry@silkeater.io",
		rate: 76,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Bill Horsefighter",
		job: "Designer",
		email: "bhorsefighter@gmail.com",
		rate: 15,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
	{
		avatar:
			"https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
		name: "Jeremy Footviewer",
		job: "Manager",
		email: "jeremy@foot.dev",
		rate: 98,
	},
];
