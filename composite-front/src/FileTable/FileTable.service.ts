export enum ElementType {
  DOCX = "DOCX",
  PDF = "PDF",
  XLSX = "XLSX",
  FOLDER = "FOLDER",
}

interface File {
  key: number;
  data: {
    name: string;
    size: string;
    type: ElementType;
  };
  children: File[];
}

export interface FileDTO {
  id: number;
  name: string;
  type: ElementType;
  size: number;
  children: FileDTO[] | null;
}

export const getFiles = async () => {
  const response = await fetch("http://localhost:3000/");
  const data = await response.json();
  return mapperDtoToFileObject(data.files);
};

export const searchNode = (
  nodeToSave: File,
  nodes: File[],
  idToSearch: number
) => {
  nodes.forEach((node) => {
    if (node.key === idToSearch) {
      node.children.push(nodeToSave);
    }
    if (node.children) {
      node.children = searchNode(nodeToSave, node.children, idToSearch);
    }
  });
  return nodes;
};

export const createFile = async (files: File[]) => {
  const body = {
    files: mapperObjectToFileDTO(files),
  };
  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response;
};

export function mapperDtoToFileObject(body: FileDTO[]): File[] {
  const children: File[] = [];
  body.forEach((child) => {
    const folder: File = {
      key: child.id,
      data: {
        name: child.name,
        size: String(child.size),
        type: child.type,
      },
      children: mapperDtoToFileObject(child.children ? child.children : []),
    };
    children.push(folder);
  });
  return children;
}

export function mapperObjectToFileDTO(files: File[]): FileDTO[] {
  const children: FileDTO[] = [];
  files.forEach((child) => {
    const folder: FileDTO = {
      id: child.key > 1000000 ? 0 : child.key,
      name: child.data.name,
      type: child.data.type as ElementType,
      size: +child.data.size,
      children: mapperObjectToFileDTO(child.children),
    };
    children.push(folder);
  });
  return children;
}
