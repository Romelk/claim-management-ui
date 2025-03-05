import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Paper,
    Divider
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    NoteAdd as NoteAddIcon
} from '@mui/icons-material';

interface Note {
    id: string;
    content: string;
    date: string;
}

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([
        {
            id: '1',
            content: 'Test Notes',
            date: 'Mar 3, 3:58 PM'
        }
    ]);
    const [newNoteContent, setNewNoteContent] = useState('');

    const handleAddNote = () => {
        if (newNoteContent.trim()) {
            const newNote: Note = {
                id: `${Date.now()}`,
                content: newNoteContent.trim(),
                date: new Date().toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                })
            };
            setNotes([...notes, newNote]);
            setNewNoteContent('');
        }
    };

    const handleDeleteNote = (id: string) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const handleEditNote = (id: string) => {
        // Placeholder for edit functionality
        console.log(`Editing note ${id}`);
    };

    return (
        <Box sx={{ p: 2 }}>
            {/* Header Section */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        color: 'primary.main'
                    }}
                >
                    <NoteAddIcon sx={{ mr: 2 }} />
                    Notes
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Add Notes that can be referred by other Claim managers, to help with decision making
                </Typography>
                <Divider sx={{ mb: 2 }} />
            </Box>

            {/* Note Input Area */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Type your note here"
                    value={newNoteContent}
                    onChange={(e) => setNewNoteContent(e.target.value)}
                    sx={{
                        mb: 2,
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 1
                        }
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddNote}
                    disabled={!newNoteContent.trim()}
                    sx={{
                        float: 'right',
                        textTransform: 'none'
                    }}
                >
                    Add
                </Button>
            </Box>

            {/* Notes List */}
            {notes.map((note) => (
                <Paper
                    key={note.id}
                    variant="outlined"
                    sx={{
                        mb: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: 1
                    }}
                >
                    <Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            {note.content}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {note.date}
                        </Typography>
                    </Box>
                    <Box>
                        <IconButton
                            size="small"
                            sx={{ mr: 1 }}
                            onClick={() => handleEditNote(note.id)}
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteNote(note.id)}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};

export default Notes;