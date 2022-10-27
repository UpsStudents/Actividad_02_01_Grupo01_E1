import { Body, Controller, Get, Post, Redirect } from '@nestjs/common';
import {
  AppService,
  mapperDtoToFileObject,
  mapperObjectToDto,
} from './app.service';
import { FileSystemRequestDTO } from './Dtos/FileSystemRequestDTO';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async Test() {
    const files = await this.appService.findAll();
    return { files: files };
  }

  @Post()
  async createAsset(@Body() body: FileSystemRequestDTO) {
    const files = mapperDtoToFileObject(body.files);
    await this.appService.create(files);
  }
}
