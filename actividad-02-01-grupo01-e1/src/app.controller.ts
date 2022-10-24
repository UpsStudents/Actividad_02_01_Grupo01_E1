import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {Docx} from './Entities/Docx'
import {Pdf} from './Entities/Pdf'
import {Xlxs} from './Entities/Xlsx'
import {Folder} from './Entities/Folder'
import { Console } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const folder = new Folder('carpeta 1');
    const subfolder = new Folder('subcarpeta 1');

    const pdf1 = new Pdf(200, 'pdf1');
    const pdf2 = new Pdf(300, 'pdf2');
    const pdf3 = new Pdf(400, 'pdf3');
    const pdf4 = new Pdf(500, 'pdf4');

    subfolder.add(pdf3);
    subfolder.add(pdf4);

    folder.add(pdf1);
    folder.add(pdf2);
    folder.add(subfolder);

    console.log(folder.getName());
    console.log(folder.getSize());
    
    

    return this.appService.getHello();
  }
}
