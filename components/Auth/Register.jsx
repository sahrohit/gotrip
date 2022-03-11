import {
	TextInput,
	PasswordInput,
	Container,
	Group,
	createStyles,
	Button,
} from "@mantine/core";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useForm, yupResolver } from "@mantine/form";
import { useRive, useStateMachineInput } from "rive-react";

import { BiAt } from "react-icons/bi";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().min(6, "Too Short!").required("Password is required"),
});

const useStyles = createStyles((theme) => ({
	input: {
		width: "100%",
	},
}));

const Login = () => {
	const { classes } = useStyles();
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},
		schema: yupResolver(LoginSchema),
	});

	const { errors } = form;

	useEffect(() => {
		if (errors.email || errors.password) {
			const onFailure = () => {
				trigFail.fire();
			};
			onFailure();
		}
	}, [errors, trigFail]);

	const STATE_MACHINE_NAME = "Login Machine";
	const { RiveComponent, rive } = useRive({
		src: "/rives/animated_login_screen.riv",
		stateMachines: STATE_MACHINE_NAME,
		artboard: "Teddy",
		autoplay: true,
	});

	const isChecking = useStateMachineInput(
		rive,
		STATE_MACHINE_NAME,
		"isChecking"
	);
	const eyeDirection = useStateMachineInput(
		rive,
		STATE_MACHINE_NAME,
		"numLook"
	);
	const isHandsUp = useStateMachineInput(rive, STATE_MACHINE_NAME, "isHandsUp");
	const trigFail = useStateMachineInput(rive, STATE_MACHINE_NAME, "trigFail");

	return (
		<Container fluid px="xl">
			<div
				style={{ height: "260px", width: "300px", margin: "0 auto" }}
				id="animationpane"
			>
				<RiveComponent />
			</div>
			<form
				onSubmit={form.onSubmit(async (values) => {
					console.log(values);
				})}
			>
				<Group
					direction="column"
					sx={(theme) => ({
						width: "100%",
						justifyContent: "center",
					})}
				>
					<TextInput
						size="md"
						type="email"
						className={classes.input}
						label="Email"
						icon={<BiAt />}
						placeholder="Your email"
						error={form.errors.email}
						{...form.getInputProps("email")}
						onFocus={() => {
							isChecking.value = true;
							eyeDirection.value = 30;
						}}
						onBlur={() => (isChecking.value = false)}
					/>
					<PasswordInput
						size="md"
						className={classes.input}
						icon={<BiAt />}
						placeholder="Your email"
						label="Password"
						{...form.getInputProps("password")}
						onFocus={() => (isHandsUp.value = true)}
						onBlur={() => (isHandsUp.value = false)}
					/>

					<Button mx={"auto"} type="submit">
						Submit
					</Button>
				</Group>
			</form>
		</Container>
	);
};

export default Login;
