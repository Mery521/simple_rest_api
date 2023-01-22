const db = require("../../models");
const Workspace = db.workspace;
const { UserInputError } = require("apollo-server");

module.exports = {
  Query: {
    getWorkspaceById: async (_,args) => {
      return await Workspace.findOne({_id: args.id });
    },
  },
  Mutation: {
    creteWorkspace: async (_, args) => { 
      try {
        const { workspaceInput } = args;
        const workspace = await Workspace({ 
          ...workspaceInput
        });
        if (!workspace) throw new UserInputError("Workspace not found");
        return await workspace.save();
      } 
      catch (err) {
        console.log(err);
        throw err;
      }
    },
    updateWorkspace: async (_, args) => {
      const { workspaceId = "", workspaceInput } = args;
      try{
        const newWorkspace = await Workspace.findOneAndUpdate(
          { _id: workspaceId },
           workspaceInput,
          { useFindAndModify: false }
        )
        if(!newWorkspace) throw new UserInputError("Workspace not found");
        return newWorkspace;
      }
      catch (err) {
          console.log(err);
      }
    },
    deleteWorkspace: async (_, args) => {
      return await Workspace.findByIdAndRemove({ _id: args.id });
    },
  },
}