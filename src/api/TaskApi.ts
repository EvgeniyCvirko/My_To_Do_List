import {instance} from './Api';
import {NewTaskType, TaskType} from '../types/CommonTypes';

export const TaskApi = {
  getTasks (todolistId: string ) {
    return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  updateTask (todolistId: string, taskId: string, newTask:NewTaskType) {
    return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {...newTask})
  },

}

//types
type GetTasksType = {
  items: TaskType[],
  totalCount: number
  error: string
}
 type ResponseType<T={}> = {
   items: T,
   resultCode: number,
   messages: string[]
 }