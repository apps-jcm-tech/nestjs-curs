import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret:
        '5111f532d37633b71f4d8bea04b0bc8850a9408ce119073e312ceaf46c551991e064ed5bf08db78f6b85d84e4657cbc6696b711bda7f4f4e8caec61bc787089b121e11da09fc9f4e670d516594ef62c0eb13dcb193436343de5c3f84ff66d4edd99e25feea487dc6967bb9faa4d8c64a78cb54ec335b70c138859f99a75c40188fb9edde1b739955a07f4107514aeb5a48ac063c21b22b3de91247201967c1b4825a816f1a1dc18224a1a238d36434d6be87c5261ad7cd4aacc307425819a61ae265dba5a0b313eace46d962dfd14ce4a3396ba0c7ccecddafa6b3e2f861ee0d8fbf2d07dfe2dc6c0641492140294ad119eb7955cd5c166855d85a0f115b7fa7',
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class UserModule {}
