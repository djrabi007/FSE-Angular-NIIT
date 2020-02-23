export class User{
	userId: string;
	firstName?: string;
	lastName?: string;
	userPassword: string;
	userRole?: string;
	userAddedDate?: string
}

export class UserServiceRequest{
	userDetails: User;
}

export class UserServiceResponse {
	code?: string;
	status?: string
	message?: string;
	token?: string;
}