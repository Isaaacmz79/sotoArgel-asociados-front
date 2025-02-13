export interface MenuMobileProps {
	handleMenu: () => void;
	isOpen?: boolean;
}

type ContactMethod = "Correo" | "WhatsApp";

export interface UserMetadata {
	expIdentifier: string;
	fullName: string;
	documentId: string;
	email: string;
	phone: string;
	problemDescription: string;
	town: string;
	contactMethod: ContactMethod;
}

export interface FormValues extends UserMetadata {
	privacyPolicy: boolean;
}
