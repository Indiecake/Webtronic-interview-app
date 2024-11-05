import { ADD_NODE, DELETE_NODE, RENAME_NODE } from '../actions/fileActions';

const addNodeHelper = (tree, folderId, itemName, isFolder) => {
  const newTree = JSON.parse(JSON.stringify(tree));
  const newItem = {
    id: Date.now().toString(),
    name: itemName,
    isFolder,
    items: isFolder ? [] : undefined,
  };

  function addHelper(node) {
    if (node.id === folderId && node.isFolder) {
      node.items = [newItem, ...(node.items || [])];
      return;
    }
    node.items?.forEach(addHelper);
  }

  addHelper(newTree);
  return newTree;
};

const deleteNodeHelper = (tree, nodeId) => {
  const newTree = JSON.parse(JSON.stringify(tree));
  function deleteHelper(node) {
    if (!node.items) return;
    node.items = node.items.filter(child => child.id !== nodeId);
    node.items.forEach(deleteHelper);
  }
  deleteHelper(newTree);
  return newTree;
};

const renameNodeHelper = (tree, nodeId, newName) => {
  const newTree = JSON.parse(JSON.stringify(tree));
  function renameHelper(node) {
    if (node.id === nodeId) {
      node.name = newName;
      return;
    }
    node.items?.forEach(renameHelper);
  }
  renameHelper(newTree);
  return newTree;
};

const fileReducer = (state, action) => {
  switch (action.type) {
    case ADD_NODE:
      return addNodeHelper(state, action.payload.folderId, action.payload.itemName, action.payload.isFolder);
    case DELETE_NODE:
      return deleteNodeHelper(state, action.payload.nodeId);
    case RENAME_NODE:
      return renameNodeHelper(state, action.payload.nodeId, action.payload.newName);
    default:
      return state;
  }
};

export default fileReducer;
