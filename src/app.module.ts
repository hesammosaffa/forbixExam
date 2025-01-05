import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSchema } from './user.model';
import { CompanySchema } from './company.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/exam'),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: CompanySchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
