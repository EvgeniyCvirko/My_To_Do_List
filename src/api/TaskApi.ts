import {instance} from './Api';
import {TaskType} from '../types/CommonTypes';

export const TaskApi = {
  getTasks (todolistId: string ) {
    return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
  }

}

//types
type GetTasksType = {
  items: TaskType[],
  totalCount: number
  error: string
}
