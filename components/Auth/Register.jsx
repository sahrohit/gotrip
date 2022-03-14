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
import { setDoc, doc } from "firebase/firestore";

import { BiAt } from "react-icons/bi";
import { BsCheck2, BsX } from "react-icons/bs";
import { MdOutlinePassword } from "react-icons/md";
import to from "@components/helpers/to";
import { useNotifications } from "@mantine/notifications";
import { useAuth } from "@contexts/AuthContext";
import { db } from "../../firebase";
import { setToStorage } from "@components/helpers/localstorage";

const LoginSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
	password: Yup.string().min(6, "Too Short!").required("Password is required"),
	firstname: Yup.string().required("Firstname is required"),
	lastname: Yup.string(),
});

const useStyles = createStyles((theme) => ({
	input: {
		width: "100%",
	},
	nameinput: {
		marginTop: theme.spacing.md,
	},
}));

const Register = () => {
	const { classes } = useStyles();
	const notifications = useNotifications();
	const {
		signUp,
		signInWithGoogle,
		setAuthModalOpened,
		updateProfileDetails,
		sendVerificationEmail,
	} = useAuth();
	const form = useForm({
		initialValues: {
			email: "",
			password: "",
			firstname: "",
			lastname: "",
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
					signUp(values.email, values.password)
						.then((userCredential) => {
							const user = userCredential.user;
							updateProfileDetails(
								user,
								`${values.firstname} ${values.lastname}`
							);
							setDoc(doc(db, "users", user.uid), {});
							setToStorage(
								"resendVerificationTimeout",
								Math.ceil(Date.now() / 1000) + 60
							);

							notifications.showNotification({
								radius: "md",
								icon: <BsCheck2 size={18} />,
								color: "teal",
								title: "Account Created",
								message: "Welcome to our party!",
							});
							sendVerificationEmail(user).then(() => {
								setAuthModalOpened(false);
							});
						})
						.catch((error) => {
							notifications.showNotification({
								radius: "md",
								icon: <BsX size={18} />,
								color: "red",
								title: "An Error Occured",
								message: error.message,
							});
						});
				})}
			>
				<Group
					direction="column"
					sx={(theme) => ({
						width: "100%",
						justifyContent: "center",
					})}
				>
					<Group
						sx={(theme) => ({
							width: "100%",
						})}
						direction="row"
						position="apart"
						align="flex-start"
						noWrap
					>
						<TextInput
							size="md"
							type="text"
							className={classes.nameinput}
							label="First Name"
							placeholder="Joe"
							error={form.errors.firstname}
							{...form.getInputProps("firstname")}
							onFocus={() => {
								isChecking.value = true;
								eyeDirection.value = 10;
							}}
							onBlur={() => (isChecking.value = false)}
							autoComplete="given-name"
						/>
						<TextInput
							size="md"
							type="text"
							className={classes.nameinput}
							label="Last Name"
							placeholder="Mama"
							error={form.errors.lastname}
							{...form.getInputProps("lastname")}
							onFocus={() => {
								isChecking.value = true;
								eyeDirection.value = 60;
							}}
							onBlur={() => (isChecking.value = false)}
							autoComplete="family-name"
						/>
					</Group>
					<TextInput
						size="md"
						type="email"
						className={classes.input}
						label="Email"
						icon={<BiAt />}
						placeholder="Email"
						error={form.errors.email}
						{...form.getInputProps("email")}
						onFocus={() => {
							isChecking.value = true;
							eyeDirection.value = 30;
						}}
						onBlur={() => (isChecking.value = false)}
						autoComplete="email"
					/>

					<PasswordInput
						size="md"
						className={classes.input}
						icon={<MdOutlinePassword />}
						placeholder="Password"
						label="Password"
						{...form.getInputProps("password")}
						onFocus={() => (isHandsUp.value = true)}
						onBlur={() => (isHandsUp.value = false)}
						autoComplete="new-password"
					/>

					<Group
						sx={(theme) => ({
							width: "100%",
						})}
						position="apart"
					>
						<Button
							leftIcon={<GoogleIcon />}
							variant="default"
							color="gray"
							onClick={async () => {
								const [data, error] = await to(
									signInWithGoogle(),
									notifications,
									"Logged in Successfully",
									"Log in failed"
								);
								if (data) {
									setAuthModalOpened(false);
								}
								if (error) {
									trigFail.fire();
								}
							}}
						>
							Continue with Google
						</Button>
						<Button type="submit">Sign Up</Button>
					</Group>
				</Group>
			</form>
		</Container>
	);
};

export default Register;

const GoogleIcon = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			preserveAspectRatio="xMidYMid"
			viewBox="0 0 256 262"
			width={14}
			height={14}
		>
			<path
				fill="#4285F4"
				d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
			/>
			<path
				fill="#34A853"
				d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
			/>
			<path
				fill="#FBBC05"
				d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
			/>
			<path
				fill="#EB4335"
				d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
			/>
		</svg>
	);
};
