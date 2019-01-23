const nodeModel = require('../../models/node');

module.exports = async (user, nodes, cb) => {

    async function handleNode(node) {
        if (node) {
            cb(node);

            if (node.type === 'dir') {
                await addChilds(node);
            }
        }
    }

    async function addChilds(n) {

        // Find all nodes which have n as parent
        await nodeModel.find({owner: user.id, parent: n.id}).exec().then(async rnodes => {
            for (let i = 0, n = rnodes.length; i < n; i++) {
                await handleNode(rnodes[i]);
            }
        });
    }

    for (let i = 0; i < nodes.length; i++) {
        await handleNode(await nodeModel.findOne({owner: user.id, id: nodes[i]}).exec());
    }
};
