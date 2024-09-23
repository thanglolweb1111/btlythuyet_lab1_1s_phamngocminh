const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

// Kết nối MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Định nghĩa một Schema và Model mới cho Student
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const Student = mongoose.model('Student', studentSchema);

// API đơn giản: Tạo sinh viên mới
app.post('/students', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const newStudent = new Student({ name, email, age });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo sinh viên' });
    }
});

// API lấy danh sách sinh viên
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi lấy danh sách sinh viên' });
    }
});

// API xoá sinh viên
app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Không tìm thấy sinh viên' });
        }
        res.status(200).json({ message: 'Đã xoá sinh viên thành công' });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi xoá sinh viên' });
    }
});

// API cập nhật sinh viên
app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    // console.log("Tên :",name);
    // console.log("Tuổi :",age);
    // console.log("Email :",email);
    // console.log("id :",id);
    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, { name, email, age }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Không tìm thấy sinh viên để cập nhật' });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi cập nhật sinh viên' });
    }
});

// Khởi động server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
