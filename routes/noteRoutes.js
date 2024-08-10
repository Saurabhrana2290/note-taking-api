const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: Note management API
 */


/**
 * @swagger
 * /notes:
 *   post:
 *     summary: Create a new note.
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the note
 *                 example: My First Note
 *               body:
 *                 type: string
 *                 description: The content of the note
 *                 example: This is the content of the note.
 *     responses:
 *       201:
 *         description: Note created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The note ID
 *                 title:
 *                   type: string
 *                   description: The title of the note
 *                 body:
 *                   type: string
 *                   description: The content of the note
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The creation time of the note
 *       400:
 *         description: Bad Request - Invalid input
 */
router.post('/', noteController.createNote);

/**
 * @swagger
 * /notes/{id}:
 *   get:
 *     summary: Fetch a note by its primary key.
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note ID
 *     responses:
 *       200:
 *         description: The note details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The note ID
 *                 title:
 *                   type: string
 *                   description: The title of the note
 *                 content:
 *                   type: string
 *                   description: The content of the note
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The time the note was created
 *       404:
 *         description: Note not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', noteController.getNoteById);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update an existing note.
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the note
 *                 example: Updated Note Title
 *               body:
 *                 type: string
 *                 description: The updated content of the note
 *                 example: Updated content of the note.
 *     responses:
 *       200:
 *         description: The note was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The note ID
 *                 title:
 *                   type: string
 *                   description: The updated title of the note
 *                 body:
 *                   type: string
 *                   description: The updated content of the note
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   description: The time when the note was last updated
 *       404:
 *         description: Note not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.put('/:id', noteController.updateNote);


/**
 * @swagger
 * /notes:
 *   get:
 *     summary: Search notes by title substring
 *     tags: [Notes]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The substring to search for in the note titles
 *     responses:
 *       200:
 *         description: List of notes with titles containing the substring
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The note ID
 *                   title:
 *                     type: string
 *                     description: The title of the note
 *                   content:
 *                     type: string
 *                     description: The content of the note
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     description: The time the note was created
 *       400:
 *         description: Bad request (e.g., missing query parameter)
 *       500:
 *         description: Internal server error
 */

router.get('/', noteController.searchNotesByTitle);



module.exports = router;
