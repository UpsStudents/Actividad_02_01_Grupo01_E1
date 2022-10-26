import { Body, ClassSerializerInterceptor, Controller, Get, Post, Redirect } from '@nestjs/common';
import { AppService } from './app.service';
import { FileSystemRequestDTO } from './Dtos/FileSystemRequestDTO';
import { ElementType } from './Enums/ElementType';
import {File} from './Implementations/File'
import {Folder} from './Implementations/Folder'


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/')
  async  Test(){
  let folder = new Folder("Root");

    let exampleObject = {
      name: "Archivo1",
      type: ElementType.DOCX,
      size: 1200,
    }

    let exampleFolder = [{
      name: "Archivo1",
      type: ElementType.FOLDER,
      size: 0,
      children: [exampleObject],
    }]
    exampleFolder.forEach(element => {
      if (element.type == ElementType.FOLDER) {
        let folderInterno = new Folder(element.name)
      }
      else {
        let folderInterno = new File(element.type, element.size, element.name);
      }
      console.log(element);

    });
    return "Hola Mundo"

}

  @Post()
  @Redirect('/')
  async createAsset(@Body() body: FileSystemRequestDTO) {

    body.FileSystemObject.forEach(element => {
      console.log(element);
    });

  }
}
