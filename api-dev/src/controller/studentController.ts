import express from 'express';
import { Student } from '../model/Student';

// return value ပြန်စရာမရှိလို့ void ကိုသံုးတယ်
// Promise ကိုသံုးတာက typescript ကိုမှ async function မို့လို့
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
        const { id } = req.params; // id က route url မှာပါေနလို့ req.params ကိုသံုးမယ်
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
        const { name, email, mobile, dob } = req.body; //user input ကိုယူရမှာမလို့ req.bodyကိုသံုးမယ်
        const student = new Student({
            name,
            email,
            mobile,
            dob,
        });
        await student.save(); //database ထဲ သိမ်းမယ်
        res.status(201).json({ message: "Student info successfully added!", data: student });
    } catch (error) {
        res.status(400).json(error);
    }
};

export const updateStudent = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params; // id က route url မှာပါေနလို့ req.params ကိုသံုးမယ်
        const { name, email, mobile, dob } = req.body; //user input ကိုယူရမှာမလို့ req.bodyကိုသံုးမယ်
        const student = await Student.findByIdAndUpdate(
            id, // ဒီ ​​id က req.params က id
            { name, email, mobile, dob }, // update လုပ်မဲ့ ​obj အသစ်
            { new: true } // ဒါမပါရင် ​update မဖြစ်ပဲ original ဟာပဲပြန်ဖြစ်မယ်
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
        const { id } = req.params; // id က route url မှာပါေနလို့ req.params ကိုသံုးမယ်
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
