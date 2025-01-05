import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { Company } from './company.model';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('company') private companyModel: Model<Company>,
  ) {}

  async getUser(req, res) {
    const user: any = await this.userModel.find({ _id: req.params.id });
    user[0].companies = await this.companyModel.find({ userId: req.params.id });
    res.status(200).json(user[0]);
  }

  async createUser(req, res) {
    if (!req.body.name) {
      res.status(400);
      return;
    }

    if (!req.body.email) {
      res.status(400);
      return;
    }

    const user = new this.userModel(req.body);
    await user.save();

    await sendHelloEmail(user);

    const company = new this.companyModel(req.body);
    await company.save();

    res.status(201).json(user);
  }
}

async function sendHelloEmail(user) {
  // this is a mock function that runs a long process
  console.log(user);
  await new Promise((resolve) => setTimeout(resolve, 3000));
}
