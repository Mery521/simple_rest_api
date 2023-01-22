const db = require("../../models");
const Channel = db.channel;
const { UserInputError } = require("apollo-server");

module.exports = {
    Query: {
        getChannelById: async (_,args) => {
        return await Channel.findOne({_id: args.id });
      },
    },
    Mutation: {
      creteChannel: async (_, args) => { 
        try {
          const { channelInput } = args;
          const channel = await Channel({ 
            ...channelInput
          });
          if (!channel) throw new UserInputError("Channel not found");
          return await channel.save();
        } 
        catch (err) {
          console.log(err);
          throw err;
        }
      },
      updateChannel: async (_, args) => {
        const { channelId = "", channelInput } = args;
        try{
          const newChannel = await Channel.findOneAndUpdate(
            { _id: channelId },
            channelInput,
            { useFindAndModify: false }
          )
          if(!newChannel) throw new UserInputError("Channel not found");
          return newChannel;
        }
        catch (err) {
            console.log(err);
        }
      },
      deleteChannel: async (_, args) => {
        return await Channel.findByIdAndRemove({ _id: args.id });
      },
    },
  }