import express from 'express';
import { Student } from '../model/Student';

export const getAllStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const allStudents = await Student.find();
        res.status(201).json({ data: allStudents });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const getStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(201).json({ data: student });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const addStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { name, email, mobile, dob } = req.body;
        const student = new Student({
            name,
            email,
            mobile,
            dob,
        });
        await student.save();
        res.status(201).json({ message: "Student info successfully added!", data: student });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const updateStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, email, mobile, dob } = req.body;
        const student = await Student.findByIdAndUpdate(
            id,
            { name, email, mobile, dob },
            { new: true }
        );
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(201).json({ message: "Student info successfully updated!", data: student });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const deleteStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
            res.status(404).json({ message: 'Student not found' });
            return;
        }
        res.status(201).json({ message: "Student info successfully deleted!" });
    } catch (error) {
        res.status(400).json(error);
    }
};