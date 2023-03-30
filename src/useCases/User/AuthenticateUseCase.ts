import { IUserRepository } from '@/repository/User/IUserRepository';
import { compare } from 'bcryptjs';

interface IAuthenticateUseCase {
    email: string;
    password: string;
}

export class AuthenticateUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute({ email, password }: IAuthenticateUseCase) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error('Invalid Credentials');
        }

        const doesPasswordMatches = await compare(password, user.password);

        if (!doesPasswordMatches) {
            throw new Error('Invalid Credentials');
        }

        return { user };
    }
}
