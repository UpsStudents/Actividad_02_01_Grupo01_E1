import { Body, ClassSerializerInterceptor, Controller, Get, Post, Redirect } from '@nestjs/common';
import e from 'express';
import { domainToASCII, fileURLToPath } from 'url';
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
    let rootFolder = new Folder("Root");
    let exampleObject =  new File(ElementType.DOCX, 1200, "Archivo1");
    let exampleFolder = new Folder('Folder1')
    exampleFolder.add(exampleObject);
    
    let newFileSystemObject = new Folder("dato");  
    
    rootFolder.add(exampleFolder)
    rootFolder.children.forEach(element  => { 
      if (element.type == ElementType.FOLDER) {
        let folderInterno = new Folder(element.name)
        newFileSystemObject.add(folderInterno);
      }
      else {
        let FileInterno = new File(element.type, element.size, element.name);
        newFileSystemObject.add(FileInterno);
      }      
    });
    console.log(newFileSystemObject);
    

}

  @Post()
  @Redirect('/')
  async createAsset(@Body() body: FileSystemRequestDTO) {
    let rootFolder = new Folder("Root");
    let folder = FileSystemRequestDTO.mapper(body);
    rootFolder.add(folder);
    body.FileSystemObject.forEach(element => {
      console.log(element);
    });

  }

  
}
