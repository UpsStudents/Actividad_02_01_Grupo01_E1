import { Body, Controller, Get, Post, Redirect } from '@nestjs/common';
import { AppService, mapper } from './app.service';
import { FileSystemRequestDTO } from './Dtos/FileSystemRequestDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async Test() {
    console.log('hello world!');
  }

  @Post()
  @Redirect('/')
  async createAsset(@Body() body: FileSystemRequestDTO) {
    console.log(body);
    const files = mapper(body.files);
    await this.appService.create(files);
  }
}
