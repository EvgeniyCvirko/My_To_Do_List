export type TodolistType = {
  id: string,
  addedDate:string,
  order: number,
  title: string,
}

export type TaskType = {
  description: string,
  title: string,
  completed: boolean,
  status: number,
  priority: number,
  startDate: Date,
  deadline: Date,
  id: string,
  todoListId: string,
  order: number,
  addedDate: Date,
}