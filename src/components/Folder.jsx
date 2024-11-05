import { useState } from "react";
import { DeleteIcon, EditIcon, FileIcon, FolderIcon } from "./icons";

const Folder = ({
  handleInsertNode,
  handleRenameNode,
  handleDeleteNode,
  explorer
}) => {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });
  const [renameMode, setRenameMode] = useState(false);
  const [newName, setNewName] = useState(explorer.name);

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({ visible: false, isFolder: showInput.isFolder });
    }
  };

  const onRenameNode = (e) => {
    if (e.key === "Enter" && e.target.value) {
      handleRenameNode(explorer.id, e.target.value);
      setRenameMode(false);
    }
  };

  return (
    <div style={{ marginTop: 5 }}>
      {explorer.isFolder ? (
        <div onClick={() => setExpand(!expand)} className="folder">
          <span>
            <FolderIcon />
            {renameMode ? (
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={onRenameNode}
                autoFocus
              />
            ) : (
              explorer.name
            )}
          </span>
          <div>
            <button onClick={(e) => handleNewFolder(e, true)}>
              <FolderIcon /> +
            </button>
            <button onClick={(e) => handleNewFolder(e, false)}>
              <FileIcon /> +
            </button>
            <button onClick={() => setRenameMode(!renameMode)}>
              <EditIcon />
            </button>
            <button onClick={() => handleDeleteNode(explorer.id)}>
              <DeleteIcon />
            </button>
          </div>
        </div>
      ) : (
        <span className="file">
          <FileIcon /> {renameMode ? (
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={onRenameNode}
                autoFocus
              />
            ) : (
              explorer.name
            )}
        </span>
      )}

      {expand && (
        <div style={{ paddingLeft: 25 }}>
          {showInput.visible && (
            <div className="inputContainer">
              <input
                type="text"
                onKeyDown={onAddFolder}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
              />
            </div>
          )}
          {explorer.items?.map((child) => (
            <Folder
              key={child.id}
              explorer={child}
              handleInsertNode={handleInsertNode}
              handleRenameNode={handleRenameNode}
              handleDeleteNode={handleDeleteNode}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Folder;
