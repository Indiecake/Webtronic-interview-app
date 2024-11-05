const useFile = (explore) => {

  const insertNode = (tree, folderId, item, isFolder) => {
    const newTree = JSON.parse(JSON.stringify(tree));
    const itemToAdd = {
      id: Date.now().toString(),
      name: item,
      isFolder,
      items: isFolder ? [] : undefined
    };

    const addHelper = (currentNode) => {
      if (currentNode.id === folderId && currentNode.isFolder) {
        currentNode.items = [itemToAdd, ...(currentNode.items || [])];
        return;
      }
      currentNode.items?.forEach(addHelper);
    }

    addHelper(newTree);
    return newTree;

  };

  const deleteNode = (tree, nodeId) => {
    const clonedTree = JSON.parse(JSON.stringify(tree));

    const deleteHelper = (currentNode, parent) => {
      if (!currentNode.items) return;
      currentNode.items = currentNode.items.filter(child => {
        if (child.id === nodeId) return false;
        deleteHelper(child, currentNode);
        return true;
      });
    }

    deleteHelper(clonedTree, null);
    return clonedTree;

  };

  const renameNode = (tree, nodeId, newName) => {
    const clonedTree = JSON.parse(JSON.stringify(tree));

    const renameHelper = (currentNode) => {
      if (currentNode.id === nodeId) {
        currentNode.name = newName;
        return;
      }
      currentNode.items?.forEach(renameHelper);
    }

    renameHelper(clonedTree);
    return clonedTree;
  };

  return { insertNode, deleteNode, renameNode };
};

export default useFile;
