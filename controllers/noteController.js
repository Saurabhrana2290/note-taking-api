const Note = require('../models/noteModel');

exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).send('Note not found');
        res.status(200).json(
            {   
                status: 200,
                note: note,
                message: "Note fetched successfully!"
            }
        );
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send('Server error');
    }
};

exports.searchNotesByTitle = async (req, res) => {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: 'Title query parameter is required' });
        }
        const note = await Note.findBySubTitle(title);
        if (!note) return res.status(404).send('Note not found');
        res.status(200).json(
            {
                notes: note,
                message: "Note's feteched successfully!",
                status: 200,
            }
            );
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send('Server error');
    }
};

exports.createNote = async (req, res) => {
    try {
        let note = await Note.create(req.body);
        note.id = note.id.toString();
        res.status(201).json(
        {
            status: 201,
            message: 'Note created successfully!',
            note: note
        });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send('Server error');
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.update(req.params.id, req.body);
        if (!note) return res.status(404).send('Note not found');
        res.status(200).json(
            {
                note: note,
                status: 200,
                message: 'Note updated successfully!'
            }
        );
    } catch (error) {
        console.log("Error:", error);
        res.status(500).send('Server error');
    }
};
