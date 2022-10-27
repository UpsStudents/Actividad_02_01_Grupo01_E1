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

  async findAll() {
    return this.dataSource.manager
      .getTreeRepository(Content)
      .findTrees({ depth: 5 });
  }

  async create(files: FileSystemObject[]) {
    files.forEach(async (file) => {
      const created = this._manager.create(Content, {
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        parent: file.parent ?? null,
      });
      await this.manager.save(created);
      if (file.isComposite() && (file as Folder).children.length > 0) {
        (file as Folder).children.forEach((child) => {
          child.parent = new Folder(created.id, created.name);
        });
        await this.create((file as Folder).children);
      }
    });
  }
}

export function mapperObjectToDto(
  objects: Content[],
  parent: FileSystemObject | undefined,
): FileSystemObject[] {
  const files: FileSystemObject[] = [];
  const childrenPrueba = objects.filter((obj) => {
    return (obj.parent as unknown as Content[]) === undefined;
  });

  const children = objects.filter((obj) => {
    if (parent == undefined) {
      return obj.parent === undefined;
    } else {
      return obj.parent !== undefined && obj.parent.id === parent.id;
    }
  });

  children.forEach((child) => {
    if (child.type == ElementType.FOLDER) {
      const folder = new Folder(child.id, child.name, child.size, parent);
      folder.children = mapperObjectToDto(objects, folder);
      files.push(folder);
    } else {
      const file = new File(
        child.id,
        ElementType[child.type],
        child.size,
        child.name,
      );
      files.push(file);
    }
  });

  return files;
}

export function mapperDtoToFileObject(body: FileDTO[]): FileSystemObject[] {
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
          folder.children = mapperDtoToFileObject(child.children);
          folder.size = folder.getSize();
        }
        children.push(folder);
      default:
        break;
    }
  });

  return children;
}
