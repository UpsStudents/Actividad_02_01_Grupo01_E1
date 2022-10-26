
import { Folder } from "./Implementations/Folder";
import { File } from "./Implementations/File";
import { ElementType } from './Enums/ElementType'


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
      let folderInterno = new File(element.type , element.size , element.name);
    }
    console.log(element);

  });


