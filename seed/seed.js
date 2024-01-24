const mongoose = require('mongoose');
const dotenv = require('dotenv');
const faker = require('faker');
dotenv.config();

// Import your models here
const BaseUser = require('../models/base-user.model');
const Employer = require('../models/employer.model');
const JobPost = require('../models/job-post.model');
const Lecturer = require('../models/lecturer.model');
const Post = require('../models/post.model');
const Student = require('../models/student.model');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const generateFakeRecord = () => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone: faker.phone.phoneNumber(),
        address: faker.address.streetAddress(),
        name: faker.name.findName(),
        description: faker.lorem.sentence(),
        image: faker.image.avatar(),
        accountType: faker.random.arrayElement(['type1', 'type2', 'type3']),
        city: faker.address.city(),
        isInternshipRemote: faker.random.boolean(),
        isWorkRemote: faker.random.boolean(),
        technologies: Array.from({ length: 5 }, () => faker.random.word()),
        languages: Array.from({ length: 3 }, () => faker.random.locale()),
        isRemote: faker.random.boolean(),
        salary: faker.finance.amount(),
        isAccepted: faker.random.boolean(),
        school: faker.company.companyName(),
        experience: Array.from({ length: 3 }, () => faker.random.word()),
        // approvedStudents: Array.from({ length: 3 }, () => faker.random.word()),
    };
};

const generateFakeData = async (Model, count) => {
    const fakeData = [];
    for (let i = 0; i < count; i++) {
        fakeData.push(new Model(generateFakeRecord()));
    }
    await Model.insertMany(fakeData);
    console.log(`${count} fake records inserted for ${Model.modelName}`);
};

const generateFakeDataForAllModels = async () => {
    await generateFakeData(BaseUser, 100);
    await generateFakeData(Employer, 100);
    await generateFakeData(JobPost, 100);
    await generateFakeData(Lecturer, 100);
    await generateFakeData(Post, 100);
    await generateFakeData(Student, 100);
    mongoose.connection.close();
};

// const generateFakeDataForAllModels = async () => {
//     await Promise.all([
//         generateFakeData(BaseUser, 100),
//         generateFakeData(Employer, 100),
//         generateFakeData(JobPost, 100),
//         generateFakeData(Lecturer, 100),
//         generateFakeData(Post, 100),
//         generateFakeData(Student, 100)
//     ]);

//     mongoose.connection.close();
// };

module.exports = { generateFakeDataForAllModels };