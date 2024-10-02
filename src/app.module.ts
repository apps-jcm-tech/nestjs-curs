import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestcurs',
      synchronize: true,
      autoLoadEntities: true,
    }),
    TaskModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
