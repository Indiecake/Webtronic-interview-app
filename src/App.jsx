import { useContext } from "react";
import { FileContext } from "./context/FileContext";
import Folder from "./components/Folder";
import { addNode, deleteNode, renameNode } from './actions/fileActions';
// import "./styles.css";

export default function App() {
  const { state, dispatch } = useContext(FileContext);

  const handleInsertNode = (folderId, itemName, isFolder) => {
    dispatch(addNode(folderId, itemName, isFolder));
  };

  const handleRenameNode = (nodeId, newName) => {
    dispatch(renameNode(nodeId, newName));
  };

  const handleDeleteNode = (nodeId) => {
    dispatch(deleteNode(nodeId));
  };

  return (
    <div className="App">
      <Folder
        explorer={state}
        handleInsertNode={handleInsertNode}
        handleRenameNode={handleRenameNode}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}
