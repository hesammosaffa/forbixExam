import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { Company } from './company.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Company') private companyModel: Model<Company>,
  ) {}

  async getUser(id: string) {
    this.logger.log(`Fetching user with id: ${id}`);
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user['companies'] = await this.companyModel.find({ userId: id }).exec();
    return user;
  }

  async createUser(createUserDto: CreateUserDto) {
    this.logger.log(`Creating user with email: ${createUserDto.email}`);
    const { name, email } = createUserDto;
    if (!name || !email) {
      throw new BadRequestException('Name and email are required');
    }

    const user = new this.userModel(createUserDto);
    await user.save();

    await this.sendHelloEmail(user);

    const company = new this.companyModel({ userId: user._id, name });
    await company.save();

    return user;
  }

  async deleteUser(id: string) {
    this.logger.log(`Deleting user with id: ${id}`);
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.companyModel.deleteMany({ userId: id }).exec();
    return { message: 'User and associated companies deleted successfully' };
  }

  async updateUser(id: string, updateUserDto: Partial<CreateUserDto>) {
    this.logger.log(`Updating user with id: ${id}`);
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUsers() {
    this.logger.log('Fetching all users');
    const users = await this.userModel.find().exec();
    for (const user of users) {
      user['companies'] = await this.companyModel.find({ userId: user._id }).exec();
    }
    return users;
  }

  private async sendHelloEmail(user: User) {
    this.logger.log(`Sending hello email to user: ${user.email}`);
    console.log(user);
    await new Promise((resolve) => setTimeout(resolve, 3000));
  }
}
