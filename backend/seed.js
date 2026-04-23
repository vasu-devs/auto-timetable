const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/admin.model');
const Faculty = require('./models/faculty.model');
const Student = require('./models/student.model');
const Batch = require('./models/batch.model');
require('dotenv').config();

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME || 'timetable_db'
        });
        console.log('Connected to MongoDB');

        // Clear existing (optional - commented out for safety)
        // await Admin.deleteMany({});
        // await Faculty.deleteMany({});
        // await Student.deleteMany({});
        // await Batch.deleteMany({});

        const hashedPassword = await bcrypt.hash('password123', 10);

        // 1. Create Batch
        let batch = await Batch.findOne({ batchName: 'CS2026' });
        if (!batch) {
            batch = await Batch.create({
                batchName: 'CS2026',
                yearOfStudy: 4,
                strength: 60
            });
            console.log('Batch created');
        }

        // 2. Create Admin
        const adminEmail = 'admin@example.com';
        if (!await Admin.findOne({ email: adminEmail })) {
            await Admin.create({
                name: 'Admin User',
                email: adminEmail,
                hashedPassword: hashedPassword,
                role: 'admin'
            });
            console.log('Admin user created');
        }

        // 3. Create Faculty
        const facultyEmail = 'teacher@example.com';
        if (!await Faculty.findOne({ email: facultyEmail })) {
            await Faculty.create({
                name: 'Teacher User',
                email: facultyEmail,
                hashedPassword: hashedPassword,
                role: 'faculty',
                maxClassesPerDay: 4
            });
            console.log('Faculty user created');
        }

        // 4. Create Student
        const studentEmail = 'student@example.com';
        if (!await Student.findOne({ email: studentEmail })) {
            await Student.create({
                name: 'Student User',
                email: studentEmail,
                hashedPassword: hashedPassword,
                role: 'student',
                batch: batch._id
            });
            console.log('Student user created');
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }
}

seed();
