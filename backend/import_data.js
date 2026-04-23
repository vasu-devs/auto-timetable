const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Models
const Admin = require('./models/admin.model');
const Faculty = require('./models/faculty.model');
const Student = require('./models/student.model');
const Batch = require('./models/batch.model');
const Subject = require('./models/subject.model');
const Classroom = require('./models/class.model');

async function importData() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME || 'timetable_db'
        });
        console.log('Connected to MongoDB');

        const dataPath = path.join(__dirname, 'data');

        // 1. Classrooms
        const classroomsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'classroom.json'), 'utf8'));
        await Classroom.deleteMany({});
        const classrooms = await Classroom.insertMany(classroomsData);
        console.log(`Imported ${classrooms.length} classrooms`);

        // 2. Batches (First pass without subjects)
        const batchesData = JSON.parse(fs.readFileSync(path.join(dataPath, 'batch.json'), 'utf8'));
        await Batch.deleteMany({});
        const batches = await Batch.insertMany(batchesData.map(b => ({ ...b, subjects: [] })));
        console.log(`Imported ${batches.length} batches`);

        // 3. Subjects (Linking to Batches)
        const subjectsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'subjects.json'), 'utf8'));
        await Subject.deleteMany({});
        for (let sData of subjectsData) {
            const batch = batches.find(b => b.batchName === sData.batchName);
            if (batch) {
                await Subject.create({
                    ...sData,
                    batch: batch._id
                });
            } else {
                console.warn(`Warning: Batch ${sData.batchName} not found for subject ${sData.subjectCode}`);
            }
        }
        const subjects = await Subject.find();
        console.log(`Imported ${subjects.length} subjects`);

        // 4. Update Batches with Subject IDs
        for (let batch of batches) {
            const batchSubjects = subjects.filter(s => s.batch.toString() === batch._id.toString()).map(s => s._id);
            await Batch.findByIdAndUpdate(batch._id, { subjects: batchSubjects });
        }
        console.log('Updated batches with subject links');


        // 4. Faculty
        const facultyData = JSON.parse(fs.readFileSync(path.join(dataPath, 'faculty.json'), 'utf8'));
        await Faculty.deleteMany({});
        for (let fData of facultyData) {
            const hashedPassword = await bcrypt.hash(fData.password || 'password123', 10);
            const qualifiedSubjects = subjects.filter(s => fData.qualifiedSubjectCodes.includes(s.subjectCode)).map(s => s._id);
            await Faculty.create({
                name: fData.name,
                email: fData.email,
                hashedPassword: hashedPassword,
                maxClassesPerDay: fData.maxClassesPerDay,
                qualifiedSubjects: qualifiedSubjects,
                unavailableTimeSlots: fData.unavailableTimeSlots,
                role: 'faculty'
            });
        }
        console.log(`Imported ${facultyData.length} faculty members`);

        // 5. Students
        const studentsData = JSON.parse(fs.readFileSync(path.join(dataPath, 'students.json'), 'utf8'));
        await Student.deleteMany({});
        for (let sData of studentsData) {
            const hashedPassword = await bcrypt.hash(sData.password || 'password123', 10);
            const batch = batches.find(b => b.batchName === sData.batchName);
            if (batch) {
                await Student.create({
                    name: sData.name,
                    email: sData.email,
                    hashedPassword: hashedPassword,
                    batch: batch._id,
                    role: 'student'
                });
            }
        }
        console.log(`Imported ${studentsData.length} students`);

        console.log('Data import complete!');
        process.exit(0);
    } catch (err) {
        console.error('Import failed:', err);
        process.exit(1);
    }
}

importData();
