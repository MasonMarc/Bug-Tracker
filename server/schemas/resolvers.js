const { AuthenticationError } = require('apollo-server-express');
const { User, Project, Bug } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    searchUsers: async (_parent, args) => {
      const search = args.term;
      const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
      const searchRgx = rgx(search);
      return User.find({
        $or: [
          {
            email: {
              $regex: searchRgx,
              $options: 'i',
            },
          },
          {
            username: {
              $regex: searchRgx,
              $options: 'i',
            }
          },
        ]
      });
    },
    users: async () => {
      return User.find().populate('projects');
    },
    user: async (_, args) => {
      return User.findOne({ _id: args.id }).populate('projects');
    },
    me: async (_, _args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('projects');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    projects: async () => {
      return await Project.find({}).populate('bugs').populate('user')
    },
    // set up get one project by id by args
    oneProject: async (_, args) => {
      return await Project.findById({ _id: args.id }).populate('bugs').populate('user')
    },
    projectBugs: async (_, args, context) => {
      const project = await Project.findById(args.id).sort({ _id: 1 }).populate('bugs')
      return project?.bugs || []
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, username, password }) => {
      const user = await User.findOne(email ? { email } : { username });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // add project
    addProject: async (_, args, context) => {
      if (!context.user){
        throw new AuthenticationError('You need to be logged in!');
      }
      const newProject = await Project.create({...args, user: context.user._id});
      const user = await User.updateOne({_id: context.user._id}, {$push: {projects: newProject._id}});
      return newProject;
    },
    // add user to project
    assignUsertoProject: async (_, args) => {
      return await Project.updateOne({_id: args.project}, {$push: {user: args.user}});
    },
    // add bug
    addBug: async (_, args, context) => {
      if (!context.user){
        throw new AuthenticationError('You need to be logged in!');
      }
      const newBug = await Bug.create(args);
      // add functionality for current project page to be added project
      console.log('PROJECT_ID', args);
      
      await Project.findOneAndUpdate(
        {_id: args.projectId}, 
        {$addToSet: { bugs: newBug._id }},
        {new: true}
      );
      return newBug;
    },
    // edit bug
    editBug: async (_, args) => {
      return await Bug.updateOne({_id: args.bug}, {$set: {description: args.description}});
    },
    // delete bug
    deleteBug: async (_, args) => {
      return await Bug.findByIdAndDelete({_id: args.bug});
    },
    // delete project
    deleteProject: async (_, args) => {
      return await Project.findByIdAndDelete({_id: args.project});
      // add functionality to delete all bugs associated
    },

  }
};

module.exports = resolvers;
