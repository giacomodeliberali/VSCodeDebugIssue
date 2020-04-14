import { Amazing } from "./hey"

function fooFunction(): integer {
  console.log("Hey")
  let a = 2
  if (a > 2) {
    console.log("Hello, world!")
  } else {
    console.log(`Value is ${a}`)
  }
  console.log("Bye")
  return a
}

test("foo test", () => {
  expect(fooFunction()).toEqual(2)
  expect(new Amazing().barFunction()).toEqual(1)
})

