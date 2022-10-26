import { Body, ClassSerializerInterceptor, Controller, Get, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { FileSystemRequestDTO } from './Dtos/FileSystemRequestDTO';
import {File} from './Implementations/File'
import {Folder} from './Implementations/Folder'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    const folder = new Folder('carpeta 1');
    const subfolder = new Folder('subcarpeta 1');

    //id , parentID, name, size, type
    //transformar a Class 
    //transformar a entidad de bdd

    //id , parentID, name, size, type
    //buscar entidad parent
    //transformar a Class 
    //transformar a Class la entrada
    //agregar child al parent
    //transformar a tabla para persistir

    const pdf1 = new File("pdf", 200, 'pdf1');
    const pdf2 = new File("pdf", 300, 'pdf2');
    const pdf3 = new File("pdf", 400, 'pdf3');
    const pdf4 = new File("pdf", 500, 'pdf4');

    subfolder.add(pdf3);
    subfolder.add(pdf4);

    folder.add(pdf1);
    folder.add(pdf2);
    folder.add(subfolder);
    
    await this.appService.create(folder);    

    return this.appService.getHello();
  }

  @Post()
  @Redirect('/')
  async createAsset(@Body() body: FileSystemRequestDTO) {
    
    await this.appService.create(vehicle as any);
  }
}
