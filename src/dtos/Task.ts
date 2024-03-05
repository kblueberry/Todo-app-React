import { v4 as uuidv4 } from "uuid"

export class Task {
  constructor(taskName: string) {
    this.id = uuidv4()
    this.name = taskName
    this.completed = false
  }
  id: string
  completed: boolean
  name: string
}
