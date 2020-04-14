import PdfKit from "pdfkit"

export class AnotherClass {
  foo: PDFKit.PDFData
  constructor(foo: PDFKit.PDFData) {
    this.foo = foo
  }

  bar() {
    console.log(this.foo)
  }
}

export class Amazing {

  a: integer

  constructor() {
    this.a = 2
  }

  barFunction(): integer {
    console.log("Hey from bar")
    let a = 1
    let b = 0
    if (a > 2) {
      console.log("A")
    } else {
      console.log("B")
    }
    console.log("C")
    console.log("D")
    return a * b
  }
}
