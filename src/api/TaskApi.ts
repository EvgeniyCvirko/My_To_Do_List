import {instance} from './Api';
import {TaskType} from '../types/CommonTypes';
import {CreateTaskDataType, GetTasksType, NewTaskType, ResponseType} from './Types';

export const TaskApi = {
  getTasks (todolistId: string ) {
    return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  updateTask (todolistId: string, taskId: string, newTask:NewTaskType) {
    return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {...newTask})
  },
  createTasks (todolistId: string, title:string ) {
    return instance.post<ResponseType<CreateTaskDataType>>(`todo-lists/${todolistId}/tasks`, {title})
  },

}

