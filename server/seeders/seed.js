const db = require('../config/connection');
const { User, Project, Bug } = require('../models');
const userSeeds = require('./userSeeds.json');
const projectSeeds = require('./projectSeeds.json');
const bugSeeds = require('./bugSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await Project.deleteMany({});
    await Bug.deleteMany({});

    const users = await User.insertMany(userSeeds);
    const projects = await Project.insertMany(projectSeeds);
    const bugs = await Bug.insertMany(bugSeeds);

    for (newProject of projects) {
      // assigns projects to random user
      const tempUser = users[Math.floor(Math.random() * users.length)];
      tempUser.projects.push(newProject._id);
      await tempUser.save();

      // assigns bugs to random project
      const tempBug = bugs[Math.floor(Math.random() * bugs.length)];
      newProject.bugs = tempBug._id;
      await newProject.save();

      // adds users to bug model
      tempBug.users.push(newUser._id);
      await tempBug.save();

      // adds users to project model
      tempUser.projects.push(newUser._id);
      await tempProject.save();
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});
