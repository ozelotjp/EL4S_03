import { firestore } from 'firebase'

export type HasId = {
  id: string
}

export type IUser = {
  tasks: ITask[]
  events: firestore.Timestamp[]
}

export type ITask = {
  name: string
  hours: number
  date: firestore.Timestamp
}
