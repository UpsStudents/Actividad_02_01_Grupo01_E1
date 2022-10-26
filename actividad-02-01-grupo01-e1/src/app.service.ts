import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { fileURLToPath } from 'url';
import { FileSystemObject } from './Abstractions/FileSystemObject';
import { FileSystemRequestDTO } from './Dtos/FileSystemRequestDTO';
import { Folder } from './Implementations/Folder';
import { Content } from './Models/Content';

@Injectable()
export class AppService {
  constructor(private manager: EntityManager, private dataSource: DataSource) { }

  getHello(): string {
    return 'Hello World!';
  }

  mapper(objeto: FileSystemRequestDTO ): FileSystemObject {
    let rootFolder = new Folder("ROOT");
    
    return rootFolder;
  }

  async create(folder: Folder | FileSystemObject) {
    const created = this.manager.create(Content, {
      id: 0,
      name: folder.name,
      size: Number(folder.getSize()),
      type: folder.type,
      parent: folder.parent
    });

    await this.manager.save(created);

    if (folder.isComposite()) {
      (folder as Folder).children.forEach(async child => {
        child.parent.id = created.id;
          await this.create(child)        
      });

    }
  }
}
