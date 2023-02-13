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

let projectCount = 0;
let bugCount = 0;

    for (let newProject of projects) {
      // assigns projects to random user
      const tempUser = users[projectCount];
      tempUser.projects.push(newProject._id);
      await tempUser.save();
      projectCount++;
      
      // adds users to project model
      newProject.user.push(tempUser._id);
      await newProject.save();

      // assigns bugs to random project
      const tempBug = bugs[bugCount];
      newProject.bugs = tempBug._id;
      await newProject.save();
      bugCount++;

      // adds users to bug model
      tempBug.assignedUser.push(tempUser._id);
      await tempBug.save();

      console.log(tempUser);
      console.log(newProject);
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
  process.exit(0);
});


