const db = require('../config/connection');
const { Student, Tutor } = require('../models');
const tutorSeeds = require("./tutorData.json");
const studentSeeds = require("./studentData.json");

db.once('open', async () => {
  try {
    await Tutor.deleteMany({});
    await Student.deleteMany({});

    await Tutor.create(tutorSeeds);
    await Student.create(studentSeeds);

    // for (let i = 0; i < thoughtSeeds.length; i++) {
    //   const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
    //   const user = await User.findOneAndUpdate(
    //     { username: thoughtAuthor },
    //     {
    //       $addToSet: {
    //         thoughts: _id,
    //       },
    //     }
    //   );
    // }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});