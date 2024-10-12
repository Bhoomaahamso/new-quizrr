"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Textarea } from "./ui/textarea";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Note {
  id: string;
  topic: string;
  content: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currNote, setCurrNote] = useState<Note | null>(null);
  const [search, setSearch] = useState("");
  const [searchedNotes, setSearchedNotes] = useState<Note[]>([]);
  const [open, setOpen] = useState(false);
  // const [newNote, setNewNote] = useState({ topic: "", content: "" });

  const getNotes = async () => {
    try {
      const response = await axios.get("http://localhost:8000/user/my-notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/user/my-notes/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const createNote = async ({ topic, content }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/user/my-notes",
        {
          topic,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes([...notes, response.data]);
      setCurrNote(response.data);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const updateNote = async () => {
    if (!currNote) return;

    try {
      const response = await axios.patch(
        `http://localhost:8000/user/my-notes/${currNote.id}`,
        {
          topic: currNote.topic,
          content: currNote.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === currNote.id ? response.data : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const handleCreate = async () => {
    try {
      if (currNote.topic.trim() === "") {
        return;
      }
      await createNote({
        topic: currNote.topic.trim(),
        content: currNote.content.trim(),
      });
    } catch (error) {
    } finally {
      setOpen(false);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    setSearchedNotes(
      notes?.filter(
        (note) =>
          note.topic.toLowerCase().includes(search.toLowerCase()) ||
          note.content.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, notes]);

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Search Notes</h1>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by topic or content"
        />
      </div>
      <div className="">
        <Dialog open={open} onOpenChange={setOpen} >
          <DialogTrigger asChild>
            <Button
              onClick={() => setCurrNote({ topic: "", content: "" })}
              className="mb-4"
            >
              Add New Note
            </Button>
          </DialogTrigger>
          {currNote && (
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Note</DialogTitle>
                {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* <div className="grid grid-cols-4 items-center gap-4"> */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="name" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="name"
                    value={currNote.topic}
                    onChange={(e) =>
                      setCurrNote({ ...currNote, topic: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                {/* <div className="grid grid-cols-4 items-center gap-4"> */}
                <div className="flex flex-col items-start gap-2">
                  <Label htmlFor="username" className="text-right">
                    Content
                  </Label>
                  <Textarea
                    id="username"
                    value={currNote.content}
                    onChange={(e) =>
                      setCurrNote({ ...currNote, content: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleCreate}>Save changes</Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
      <div className="grid grid-cols-[1fr_3fr] gap-4">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Notebooks</h2>
          <div className="h-96 overflow-y-auto space-y-2">
            {(search === "" ? notes : searchedNotes)?.length > 0 ? (
              (search === "" ? notes : searchedNotes).map((note) => (
                <div
                  key={note.id}
                  className="cursor-pointer bg-yellow-100 hover:bg-yellow-300 p-4 rounded shadow-md transition duration-200 ease-in-out"
                  onClick={() => setCurrNote(note)}
                >
                  <p className="font-medium text-lg text-gray-800">
                    {note.topic}
                  </p>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    variant="destructive"
                    size="sm"
                    className="mt-2"
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No notes found</p>
            )}
          </div>

          {/* <div className="h-96 overflow-y-auto space-y-2">
            {(search === "" ? notes : searchedNotes).map((note) => (
              <div
                key={note.id}
                className="cursor-pointer bg-yellow-100 hover:bg-yellow-300 p-2 rounded"
                onClick={() => setCurrNote(note)}
              >
                <p className="font-medium">{note.topic}</p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  variant="destructive"
                  size="sm"
                  className="mt-1"
                >
                  Delete
                </Button>
              </div>
            ))}
            {(search === "" ? notes : searchedNotes).length === 0 && (
              <p>No notes found</p>
            )}
          </div> */}
        </div>
        <div className="bg-white p-4 rounded-lg">
          {currNote ? (
            <div className="flex flex-col h-full">
              <div className="grid grid-rows-[auto_1fr] gap-4 flex-grow">
                <Input
                  value={currNote.topic}
                  onChange={(e) =>
                    setCurrNote({ ...currNote, topic: e.target.value })
                  }
                  className="text-xl font-bold"
                />
                <Textarea
                  value={currNote.content}
                  onChange={(e) =>
                    setCurrNote({ ...currNote, content: e.target.value })
                  }
                  className="flex-grow"
                />
              </div>
              <Button onClick={updateNote} className="mt-4">
                Update Note
              </Button>
            </div>
          ) : (
            <p className="text-center text-gray-500">Select a note to edit</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
