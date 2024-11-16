import { expect, test, vi, describe, Mocked } from 'vitest'

import { testFn, request } from '../../../utils'
import axios from 'axios'

vi.mock('axios')

const mockedAxios = axios as Mocked<typeof axios>


test('test common matcher', () => {
  const name = 'viking'
  expect(name).toBe('viking')
})


describe('functions', () => {
  test('create a mock function', () => {
    const callback = vi.fn()
    testFn(11, callback)
    expect(callback).toHaveBeenCalled()
  })

  test('spy on method', () => {
    const obj = {
      getName: () => 1
    }
    const spy = vi.spyOn(obj, 'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2)
  })

  test('mock thrid party function', async () => {
    mockedAxios.get.mockResolvedValue({ data: '123' })
    const result = await request()
    expect(result).toBe('123')
  })
})