import {instance} from './Api';
import {TodolistType} from '../types/CommonTypes';
import {CreateTodolistDataType, ResponseType} from './Types';

export const TodolistApi = {
  getTodolists () {
    return instance.get<TodolistType[]>('todo-lists')
  },
  updateTodolists (todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<CreateTodolistDataType>>(`todo-lists`, {title})
  }

}