// src/seeders/UserSeeder.ts
import RoleEntity from 'src/auth/entities/role.entity';
import { DataSource } from 'typeorm';

export class RoleSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const roleRepository = dataSource.getRepository(RoleEntity);

    const count = await roleRepository.count();
    if (count > 0) {
      console.log('role table is not empty. Seeder will not run.');
      return; // Sai se a tabela já contiver registros
    }

    const role = [
      {
        name: 'Default User Role',
        key: 'default',
      },
      {
        name: 'Admin User Role',
        key: 'admin',
      },
    ];

    // Lista de usuários para adicionar
    const roleSchema = roleRepository.create(role);

    // Salva os usuários no banco de dados
    await roleRepository.save(roleSchema);
    console.log('role seeding completed.');
  }
}
