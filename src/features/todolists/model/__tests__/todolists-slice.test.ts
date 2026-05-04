import { beforeEach, expect, test } from 'vitest'
import {
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  createTodolistTC,
  deleteTodolistTC,
  type DomainTodolist,
  todolistsReducer,
} from '../todolists-slice.ts'
import { nanoid } from '@reduxjs/toolkit'

let todolistId1: string
let todolistId2: string
let startState: DomainTodolist[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()
  startState = [
    { id: todolistId1, title: 'What to learn', addedDate: '', order: 0, filter: 'All', entityStatus: 'idle' },
    { id: todolistId2, title: 'What to buy', addedDate: '', order: 0, filter: 'All', entityStatus: 'idle' },
  ]
})

test('correct todolist should be created', () => {
  const title = 'What to buy'
  const newTodolist: DomainTodolist = {
    id: nanoid(),
    title,
    addedDate: '',
    order: 0,
    filter: 'All',
    entityStatus: 'idle',
  }

  const endState = todolistsReducer(startState, createTodolistTC.fulfilled(newTodolist, 'requestId', title))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(title)
})

test('correct todolist should be deleted', () => {
  // 1. Стартовый state
  // 2. Действие
  const endState = todolistsReducer(
    startState,
    deleteTodolistTC.fulfilled({ id: todolistId1 }, 'requestId', todolistId1),
  )
  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should change its title', () => {
  const title = 'New title'
  const endState = todolistsReducer(
    startState,
    changeTodolistTitleTC.fulfilled({ id: todolistId2, title }, 'requestId', { id: todolistId2, title }),
  )

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
  const filter = 'Completed'
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter }))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(filter)
})
