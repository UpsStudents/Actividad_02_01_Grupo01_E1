import { Column } from "primereact/column";
import TreeNode from "primereact/treenode";
import {
  TreeTable,
  TreeTableExpandedKeysType,
  TreeTableSelectionKeysType,
} from "primereact/treetable";
import { useEffect, useRef, useState } from "react";
import { ContextMenu } from "primereact/contextmenu";
import { MenuItem } from "primereact";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import {
  createFile,
  ElementType,
  getFiles,
  searchNode,
} from "./FileTable.service";

export const FileTable: React.FC = () => {
  const [nodes, setNodes] = useState<TreeNode[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<TreeTableExpandedKeysType>();
  const [selectedNodeKey, setSelectedNodeKey] =
    useState<TreeTableSelectionKeysType>();
  const [dialogVisible, setDialogVisible] = useState(false);
  const [name, setName] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [nodeKey, setNodeKey] = useState<number>(0);
  const [nodeType, setNodeType] = useState<ElementType>(ElementType.FOLDER);

  const cm = useRef<ContextMenu>(null);

  useEffect(() => {
    getFiles().then((nodes) => setNodes(nodes));
  });

  const menu: MenuItem[] = [
    {
      label: "Create Folder",
      icon: "pi pi-folder",
      command: () => {
        setNodeType(ElementType.FOLDER);
        setDialogVisible(true);
      },
    },
    {
      label: "Create Word Document",
      icon: "pi pi-file-word",
      command: () => {
        setNodeType(ElementType.DOCX);
        setDialogVisible(true);
      },
    },
    {
      label: "Create Excel Document",
      icon: "pi pi-file-word",
      command: () => {
        setNodeType(ElementType.XLSX);
        setDialogVisible(true);
      },
    },
    {
      label: "Create PDF Document",
      icon: "pi pi-file-pdf",
      command: () => {
        setNodeType(ElementType.PDF);
        setDialogVisible(true);
      },
    },
  ];

  return (
    <>
      <ContextMenu
        model={menu}
        ref={cm}
        onHide={() => setSelectedNodeKey(undefined)}
      />
      <TreeTable
        value={nodes}
        expandedKeys={expandedKeys}
        onToggle={(e) => setExpandedKeys(e.value)}
        contextMenuSelectionKey={selectedNodeKey?.toString()}
        onContextMenuSelectionChange={(e) => setSelectedNodeKey(e.value)}
        onContextMenu={(e) => {
          if (e.node.data.type === ElementType.FOLDER) {
            setNodeKey(e.node.key as number);
            cm.current!.show(e.originalEvent);
          }
        }}
      >
        <Column field="name" header="Name" expander />
        <Column field="size" header="Size" />
        <Column field="type" header="Type" />
      </TreeTable>
      <Dialog visible={dialogVisible} onHide={() => setDialogVisible(false)}>
        <h5>Name:</h5>
        <InputText value={name} onChange={(e) => setName(e.target.value)} />
        <h5>Size:</h5>
        <InputText value={size} onChange={(e) => setSize(e.target.value)} />
        <div className="flex justify-content-center gap-1 mt-4">
          <Button
            onClick={async () => {
              const res = searchNode(
                {
                  children: [],
                  data: { name, size, type: nodeType },
                  key: 10000000 + Math.random() * 10000,
                },
                nodes as any,
                nodeKey
              );
              await createFile(res);
              setNodes([]);
              setDialogVisible(false);
              setName("");
              setSize("");
            }}
          >
            Save
          </Button>
          <Button
            className="p-button-secondary"
            onClick={() => {
              setName("");
              setSize("");
              setDialogVisible(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
};
