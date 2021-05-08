import { treeNodeUtils } from './three-node-utils';

export const appendNode = (tree, id, parentId) => {
    const newEffectsTree = [...tree];
    const [parentNode] = treeNodeUtils.findNodes(newEffectsTree, node => node.key === String(parentId));
    const effectKey = String(id);
    
    if (!parentNode) {
        newEffectsTree.push({ key: effectKey })
    } else if (parentNode.children) {
        parentNode.children = [
            ...parentNode.children,
            { key: effectKey }
        ]
    } else {
        parentNode.children = [{ key: effectKey }]
    }

    return newEffectsTree;
}