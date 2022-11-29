import {instance} from './Api';
import {TodolistType} from '../types/CommonTypes';

export const TodolistApi = {
  getTodolists () {
    return instance.get<TodolistType[]>('todo-lists')
  }

}