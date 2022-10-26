import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { FileSystemObject } from './Abstractions/FileSystemObject';
import { FileDTO } from './Dtos/FileSystemRequestDTO';
import { Folder } from './Implementations/Folder';
import { File } from './Implementations/File';
import { Content } from './Models/Content';
import { ElementType } from './Enums/ElementType';

@Injectable()
export class AppService {
  private _manager: EntityManager;
  constructor(private manager: EntityManager, private dataSource: DataSource) {
    this._manager = manager;
  }

  getHello(): string {
    return 'Hello World!';
  }

  async create(files: FileSystemObject[]) {
    console.log('conversión');
    console.log(files);
    files.forEach(async (file) => {
      console.log('next');
      console.log(file);
      const created = this._manager.create(Content, {
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        parent: file.parent ?? null,
      });
      await this.manager.save(created);
      console.log('guardado');
      if (file.isComposite() && (file as Folder).children.length > 0) {
        (file as Folder).children.forEach((child) => {
          child.parent = new Folder(created.id, created.name);
        });
        await this.create((file as Folder).children);
      }
    });
  }
}

export function mapper(body: FileDTO[]): FileSystemObject[] {
  const children: FileSystemObject[] = [];
  body.forEach(function (child) {
    switch (child.type) {
      case ElementType.DOCX:
      case ElementType.PDF:
      case ElementType.XLSX:
        const file = new File(
          child.id ?? 0,
          child.type,
          child.size,
          child.name,
        );
        children.push(file);
        break;
      case ElementType.FOLDER:
        const folder = new Folder(child.id ?? 0, child.name);
        if (Array.isArray(child.children)) {
          folder.children = mapper(child.children);
          folder.size = folder.getSize();
        }
        children.push(folder);
      default:
        break;
    }
  });

  return children;
}
