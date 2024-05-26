import mongoose from "mongoose";
import { videosData } from "../dummy_db";
// const Video = require("../backend/models/video");
const Video = require('../models/video.ts')
// This will seed/add the data in databse.

export const seeder = async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URI  as string);

    //deleting old data
    await Video.deleteMany();
    console.log("Deleted Old Data.");

    await Video.insertMany(videosData);
    console.log("New Data Added.");

    // to stop the operation
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
/*
Steps in the seeder function
1. We need to connect to mongodb database
2. Delete the old data from db
3. Add new data

Then in package.json we'll have to create the package for this.
we'll add 'seeder' in script and the value will be:

"tsc seeder.ts --outDir .temp && node .temp/seeder.js && rm --rf .temp"

1st we need convert the seeder file into js because browser does not understand ts.
tsc seeder.ts - It will compile ts file to js file.

--outDir .temp - It will create temp folder in root and it will put the compiled file in that directory or the folder.

node .temp/seeder.js - It will run the compiled js file.

rm --rf .temp - It will remove the temp folder after seeding the data.
*/
