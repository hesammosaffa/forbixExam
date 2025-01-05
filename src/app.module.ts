import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { User } from './user.model';
import { Company } from './company.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/exam'),
    MongooseModule.forFeature([{ name: 'user', schema: User }]),
    MongooseModule.forFeature([{ name: 'company', schema: Company }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
