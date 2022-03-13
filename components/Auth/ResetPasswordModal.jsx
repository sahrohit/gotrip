import React, { useState, useEffect } from "react";
import {
	Modal,
	Title,
	Text,
	Group,
	Button,
	Center,
	Code,
	TextInput,
	createStyles,
	Container,
} from "@mantine/core";
import { BiAt } from "react-icons/bi";
import { PROTECTED_ROUTES } from "@config/routes";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { useAuth } from "@contexts/AuthContext";
import to from "@components/helpers/to";
import { useNotifications } from "@mantine/notifications";

const ResetSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email").required("Email is required"),
});

const useStyles = createStyles((theme) => ({
	input: {
		width: "100%",
	},
}));

const ResetPasswordModal = ({
	forgotPasswordModalOpen,
	setForgotPasswordModalOpen,
}) => {
	const { classes } = useStyles();
	const { resetPassword } = useAuth();
	const notifications = useNotifications();
	const form = useForm({
		initialValues: {
			email: "",
		},
		schema: yupResolver(ResetSchema),
	});

	return (
		<Container fluid>
			<Center>
				<Title
					sx={(theme) => ({
						fontSize: theme.fontSizes[3],
					})}
					order={2}
				>
					Reset Password
				</Title>
			</Center>
			<Text color={"gray"} align="center">
				An email will be sent to your email address containing a link to reset
				your password.
			</Text>

			<form
				onSubmit={form.onSubmit(async (values) => {
					const [data, error] = await to(
						resetPassword(values.email),
						notifications,
						"Email Sent Successfully",
						"An Error Occured"
					);
					if (data) {
						setForgotPasswordModalOpen(false);
					}
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
						label="Email"
						icon={<BiAt />}
						placeholder="Email"
						className={classes.input}
						error={form.errors.email}
						{...form.getInputProps("email")}
						autoComplete="email"
					/>

					<Button fullWidth type="submit">
						Send Reset Link
					</Button>
					<Text
						align="center"
						sx={(theme) => ({
							width: "100%",
						})}
						variant="link"
						component="a"
						onClick={() => {
							setForgotPasswordModalOpen(false);
						}}
					>
						Dont need a reset? Go Back
					</Text>
				</Group>
			</form>
		</Container>
	);
};

export default ResetPasswordModal;
