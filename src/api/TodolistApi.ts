import {instance} from './Api';
import {TodolistType} from '../types/CommonTypes';
import { ResponseType } from './Types';

export const TodolistApi = {
  getTodolists () {
    return instance.get<TodolistType[]>('todo-lists')
  },
  updateTodolists (todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
  }

}