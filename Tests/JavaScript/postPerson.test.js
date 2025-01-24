const postPerson = require('./postPerson')

test('Full request', async () => {
  expect(await postPerson({name: "Bob", id: 123, age: 20, location: "Alaska"})).toBe(201);
})

test('Partial request', async () => {
  expect(await postPerson({name: "Bob", id: 124})).toBe(201);
})

test('Missing name', async () => {
  expect(await postPerson({id: 123})).toBe(400);
})

test('Missing id', async () => {
  expect(await postPerson({name: "Bob"})).toBe(400);
})

test('Negative age', async () => {
  expect(await postPerson({id: 123, name: "Bob", age: -1}))
})
