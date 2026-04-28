import { Injectable, ConflictException } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UsersRepository) { }

    async findByEmail(email: string) {
        return this.userRepository.findByEmail(email);
    }

    async create(user: { 
        email: string; 
        passwordHash: string; 
        firstName: string; 
        lastName?: string 
    }) {
        const existingUser = await this.userRepository.findByEmail(user.email);
        if (existingUser) {
            throw new ConflictException('User with that email already exists');
        }

        return this.userRepository.create(user);
    }
}
