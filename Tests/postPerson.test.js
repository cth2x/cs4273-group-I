const postPerson = require('./postPerson')

test('Full request', async () => {
  expect(await postPerson({id: 123, name: "Bob Miller", age: 40, location: "Alaska"})).toBe(201);
})

test('Partial request', async () => {
  expect(await postPerson({ id: 124, name: 'Bill Stephenson', age: 34 })).toBe(201);
})

test('Missing name', async () => {
  expect(await postPerson({ id: 125, age: 23 })).toBe(400);
})

test('Missing id', async () => {
  expect(await postPerson({name: "Stephen Michael", age: 10})).toBe(400);
})

test('Negative age', async () => {
  expect(await postPerson({id: 126, name: "Sarah Steinbeck", age: -2}))
})
