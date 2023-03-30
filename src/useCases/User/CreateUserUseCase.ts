import { IUserRepository } from '../../repository/User/IUserRepository';
import { hash } from 'bcryptjs';
interface ICreateInspectionUseCase {
    name: string;
    email: string;
    password: string;
}

class CreateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute({ name, email, password }: ICreateInspectionUseCase) {
        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new Error('User already exists');
        }

        const hashedPassword = await hash(password, 6);
        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return { user };
    }
}

export { CreateUserUseCase };
