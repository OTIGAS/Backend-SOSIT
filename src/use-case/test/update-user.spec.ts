import { expect, describe, it, beforeEach } from 'vitest';
import { RegisterUserUseCase } from '../register-user';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '../errors/user-already-exists';
import { UpdateUserUseCase } from '../update-user';

let userRepository: InMemoryUsersRepository;
let updateUsersUseCase: UpdateUserUseCase;

beforeEach(() => {
	userRepository = new InMemoryUsersRepository();
	updateUsersUseCase = new UpdateUserUseCase(userRepository);
});

describe('Update User', () => {

	it('should be able to update', async () => {

		const userOriginal = await userRepository.create({
			nome: 'Nome',
			email: 'email@gmail.com',
			senha_hash: '123456',
			cpf: '000.000.000-00',
			telefone: '00 0 0000-0000',
			cep: '00000-000',
			estado: 'Estado',
			cidade: 'Cidade',
			rua: 'Rua',
			numero: '123',
			nascimento: '00/00/0000'
		});

		const userChanged = await updateUsersUseCase.execute({
			id: userOriginal.id,
			nome: 'Outro Nome',
			email: 'outro.email@gmail.com',
			senha_hash: '123456',
			cpf: '100.000.000-00',
			telefone: '10 0 0000-0000',
			cep: '10000-000',
			estado: 'Outro Estado',
			cidade: 'Outra Cidade',
			rua: 'Outra Rua',
			numero: 'Outro 123',
			nascimento: '10/00/0000'
		});

		expect(userChanged.user).toEqual(
			expect.objectContaining({ id: userOriginal.id, }),
		);
	});

});