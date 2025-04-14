// src/seeders/UserSeeder.ts
import RoleEntity from 'src/auth/entities/role.entity';
import { TaskStatusEntity } from 'src/task/entities/taskStatus.entity';
import { DataSource } from 'typeorm';

export class TaskStatusSeeder {
  public static async run(dataSource: DataSource): Promise<void> {
    const taskStatusRepository = dataSource.getRepository(TaskStatusEntity);

    const count = await taskStatusRepository.count();
    if (count > 0) {
      console.log('task status table is not empty. Seeder will not run.');
      return; // Sai se a tabela já contiver registros
    }

    const taskStatus = [
      {
        name: 'Task is pending',
        key: 'pending',
      },
      {
        name: 'Task is in progress',
        key: 'in_progress',
      },

      {
        name: 'Task is completed',
        key: 'completed',
      },

      {
        name: 'Task is canceled',
        key: 'canceled',
      },
    ];

    // Lista de usuários para adicionar
    const taskStatusSchema = taskStatusRepository.create(taskStatus);

    // Salva os usuários no banco de dados
    await taskStatusRepository.save(taskStatusSchema);
    console.log('task status seeding completed.');
  }
}
