import express from "express"
import asyncHandler from "express-async-handler"
import Contact from '../model/contactsSchema.js'

const router = express.Router()

router.get('/contact', asyncHandler(async(req, res)=>{
    const contacts = await Contact.find().sort({createdAt: -1})
    if(!contacts){
        res.status(404)
        throw new Error("Contacts not found! Please add contact first!")
    }
    res.status(200).json(contacts)
}))

router.post('/contact', asyncHandler(async(req, res)=>{
    const {name, email, phone, message} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("Plases fill in all required fields")
    }
    const newContact = await Contact.create({name, email, phone, message});
    res.status(201).json(newContact)
}))

router.delete('/contact/:id', asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('Contact not found');
    }
    await contact.deleteOne();
    res.status(200).json({ id: req.params.id });
}))

export default router;