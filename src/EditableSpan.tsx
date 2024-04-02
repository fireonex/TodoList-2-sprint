import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    //title: string
    oldTitle: string
    updateTitle: (newTitle: string) => void
};


export const EditableSpan = ({oldTitle, updateTitle}: EditableSpanPropsType) => {

    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)

    const editModeHandler = () => {
        setEdit(!edit)
        if(edit) {
            updateTitleHandler()
        }
    }

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const updateTitleHandler = () => {
        updateTitle(newTitle.trim())

    }

    return (
        edit
            ? <input value={newTitle} onChange={onChangeTitleHandler} onBlur={editModeHandler} autoFocus/>
            : <span onDoubleClick={editModeHandler}>{oldTitle}</span>
    );
};
