import {TaskType, TodolistType} from '../types/CommonTypes'

export type FieldErrorType = { field: string; error: string }

export type GetTasksType = {
  items: TaskType[],
  totalCount: number
  error: string
}

export type ResponseType<T = {}> = {
  data: T,
  resultCode: number,
  messages: string[]
  fieldsErrors?: Array<FieldErrorType>
}
export type CreateTodolistDataType = {
  item: TodolistType
}

export type NewTaskType = {
  title: string
  description: string
  completed: boolean
  status: number
  priority: number
  startDate: Date
  deadline: Date
}

export type ApiTaskType = {
  title?: string | undefined,
  description?: string | undefined,
  completed?: boolean | undefined,
  status?: number | undefined,
  priority?: number | undefined,
  startDate?: Date | undefined,
  deadline?: Date | undefined,
}

export type AuthType = {
  id: number,
  email: string,
  login: string,
}

export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }