import reducer from './application';

it("throws an error with an unsupported type", () => {
  expect(() => reducer({},{type:"banana"}))
  .toThrowError("Tried to reduce with unsupported action type: banana")
})