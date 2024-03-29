import { changeTodolistTitle, todolistsReducer } from "../feature/Todolists/TodolistsReducer"
import { TodolistServerType } from "../types/CommonTypes"

const startState: TodolistServerType [] = [
    {id: "toDoListID1", title: 'What to learn', filter:'All', addedDate: '', order:0},
    {id: "toDoListID2", title: 'What to buy', filter:'All', addedDate: '', order:0},
]

test('correct todolist after change title', () => {
const todolistId = startState[0].id
const action = changeTodolistTitle.fulfilled({todolistId: "toDoListID1",title: "What to read", order:0}, '', {todolistId: "toDoListID1",title: "What to read",order:0})
const endState = todolistsReducer(startState,action)

expect(endState.length).toBe(2)
expect(endState[0].title).toBe('What to read')
expect(endState[1].title).toBe('What to buy')
})