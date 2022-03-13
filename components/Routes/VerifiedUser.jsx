import FullPageLoadingSpinner from "@components/shared/FullPageLoadingSpinner";
import { useAuth } from "@contexts/AuthContext";
import { useRouter } from "next/router";
import React from "react";

const VerifiedUser = ({ children }) => {
	const router = useRouter();

	const { currentUser } = useAuth();

	if (!currentUser?.emailVerified) {
		router.push("/");
		return <FullPageLoadingSpinner />;
	}

	return <>{children}</>;
};

export default VerifiedUser;
