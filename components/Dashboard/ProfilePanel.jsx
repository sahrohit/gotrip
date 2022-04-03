import { Avatar, Text, Button, Paper, Group, Tooltip } from "@mantine/core";
import { showNotification, useNotifications } from "@mantine/notifications";
import { useModals } from "@mantine/modals";

import { useAuth } from "@contexts/AuthContext";

import { BsCheck2, BsX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { BiUnlink } from "react-icons/bi";
import { useRouter } from "next/router";
import { MdOutlineLogout } from "react-icons/md";
import to from "@components/helpers/to";

const ProfilePanel = () => {
	const modals = useModals();
	const router = useRouter();
	const {
		currentUser,
		providers,
		linkGoogleAccount,
		unLinkGoogleAccount,
		logOut,
	} = useAuth();
	const notifications = useNotifications();

	const openConfirmModal = () =>
		modals.openConfirmModal({
			title: "Unlink your account.",
			children: (
				<Text size="sm">
					Your account will be unlinked from the Google Account. You wont be
					able to login with the google account you are currently using.
				</Text>
			),
			labels: { confirm: "Confirm", cancel: "Cancel" },
			confirmProps: { color: "red" },
			onCancel: () => modals.closeAll(),
			onConfirm: () =>
				unLinkGoogleAccount()
					.then(() => {
						showNotification({
							radius: "md",
							icon: <BsCheck2 size={18} />,
							color: "teal",
							title: "Successfully Linked",
							message: "You can now login with Google Account.",
						});
						router.reload();
					})
					.catch((error) => {
						showNotification({
							radius: "md",
							icon: <BsX size={18} />,
							color: "red",
							title: "An Error Occured",
							message: error.message,
						});
					}),
		});

	return (
		<Paper
			radius="md"
			withBorder
			p="lg"
			sx={(theme) => ({
				backgroundColor:
					theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
			})}
		>
			<Avatar src={currentUser.photoURL} size={120} radius={120} mx="auto" />
			<Text align="center" size="lg" weight={500} mt="md">
				{currentUser.displayName}
			</Text>
			<Text align="center" color="dimmed" size="sm">
				{currentUser.email}
			</Text>

			{providers.includes("google.com") ? (
				<Group
					my={3}
					sx={(theme) => ({
						justifyContent: "center",
					})}
				>
					<Group positiion="center">
						<Avatar
							src={
								currentUser.providerData[providers.indexOf("google.com")]
									.photoURL
							}
						></Avatar>
						<Text>
							{
								currentUser.providerData[providers.indexOf("google.com")]
									.displayName
							}
						</Text>
						<Tooltip label={`Linked with Google`}>
							<BsCheck2 size={16} />
						</Tooltip>
					</Group>

					<Button leftIcon={<BiUnlink />} onClick={openConfirmModal}>
						Unlink
					</Button>
				</Group>
			) : (
				<Button
					leftIcon={<FcGoogle />}
					m={5}
					w="90%"
					onClick={async () => {
						await linkGoogleAccount()
							.then(() => {
								updateProfileDetails(
									currentUser,
									currentUser.displayName,
									currentUser.providerData[0].photoURL
										? currentUser.providerData[0].photoURL
										: currentUser.providerData[1].photoURL
								);
								showNotification({
									title: "Successfully Linked",
									description: "You Madre account is now linked with Google.",
									status: "success",
									duration: 4000,
									isClosable: true,
								});
								router.reload();
							})
							.catch((error) => {
								showNotification({
									title: "An Error Occured",
									description: error.message,
									status: "error",
									duration: 5000,
									isClosable: true,
								});
							});
					}}
				>
					Link with Google
				</Button>
			)}
			<Button
				mt={50}
				color="red"
				fullWidth
				variant="outline"
				leftIcon={<MdOutlineLogout size={14} />}
				onClick={async () => {
					const [data, error] = await to(
						logOut(),
						notifications,
						"Logged Out Successfully",
						"An Error Occured"
					);
				}}
			>
				Logout
			</Button>
		</Paper>
	);
};

export default ProfilePanel;
