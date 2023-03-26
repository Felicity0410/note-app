import Note from "./Note"
import '../css/Note.css'
import CreateNote from "./CreateNote"
import { useEffect, useState } from "react"
import { v4 as uuid} from 'uuid'



const Notes = () => {
    const [notes, setNotes] = useState([])
    const [inputText, setInputText] = useState('')

    const textHandler = (e) =>{
        setInputText(e.target.value)
    }

    const saveHandler = () => {
        setNotes((prevState) => [
            ...prevState, 
        {
            id: uuid(),
            text: inputText
        }])
        setInputText('')
    }

    const deleteNote = (id) => {
        const filteredNotes = notes.filter(note => note.id !== id)
        setNotes(filteredNotes)
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Notes'))
        if(!data) {
            return
        }
        if(data.length > 0){
            setNotes(data)
        } 
    }, [])

    useEffect(() => {
        //saving data to local storage
        localStorage.setItem('Notes', JSON.stringify(notes))
    }, [notes])

    

    return (
        <div className="notes">
            {notes && notes.map((note) => {
                return <Note 
                  key={note.id}
                  text={note.text}
                  id = {note.id}
                  deleteNote={deleteNote}
                />
            })}
            <CreateNote 
            textHandler={textHandler}
            inputText={inputText}
            saveHandler={saveHandler}
            />
        </div>
    )
}

export default Notes