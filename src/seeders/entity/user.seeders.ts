// src/seeders/UserSeeder.ts
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/auth/entities/user.entity';
import { rolesEnum } from 'src/auth/enums/roles.enum';
import RoleEntity from 'src/auth/entities/role.entity';
export class UserSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(UserEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);
    const count = await userRepository.count();
    if (count > 0) {
      console.log('user table is not empty. Seeder will not run.');
      return;
    }
    const passwordAdmin = await bcrypt.hash('admin', 10).then((hash) => {
      return hash;
    });
    const passwordDefault = await bcrypt.hash('user', 10).then((hash) => {
      return hash;
    });

    const roleDefault = await roleRepository.findOneBy({
      key: rolesEnum.DEFAULT,
    });
    const roleAdmin = await roleRepository.findOneBy({ key: rolesEnum.ADMIN });
    const user: Partial<UserEntity>[] = [
      {
        name: 'Admin',
        email: 'admin@email.com',
        enabled: true,
        password: passwordAdmin,
        roleId: roleAdmin.id,
      },
      {
        name: 'Default User',
        email: 'user@email.com',
        enabled: true,
        password: passwordDefault,
        roleId: roleDefault.id,
      },
    ];

    const userSchema = userRepository.create(user);

    await userRepository.save(userSchema);
    console.log('user seeding completed.');
  }
}
