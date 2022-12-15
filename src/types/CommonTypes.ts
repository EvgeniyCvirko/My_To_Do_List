export type TodolistType = {
  id: string,
  addedDate:string,
  order: number,
  title: string,
}

export type FilterType = 'All' | 'Compleated' | 'Active'

export type TodolistServerType = TodolistType & {
  filter: FilterType,
}

export type TaskType = {
  description: string,
  title: string,
  completed: boolean,
  status: TaskStatues,
  priority: number,
  startDate: Date,
  deadline: Date,
  id: string,
  todoListId: string,
  order: number,
  addedDate: Date,
}

export enum TaskStatues {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export type LoginDataType = {
  rememberMe: boolean,
  email: string,
  password: string,
  captcha: boolean | null
}
