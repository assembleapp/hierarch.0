import { observable, makeAutoObservable, autorun } from "mobx"

class Scope {
  address = "src/App.js"

  display = null
  chosen = null
  change = null

  hierarchy = [0,0,[],"",false]
  index = null

  changes = {}

  constructor() {
    makeAutoObservable(this)
    autorun(() => console.log("display", this.display))
    autorun(() => console.log("chosen", this.chosen))
    autorun(() => console.log("change", this.change))
    autorun(() => console.log("changes", JSON.stringify(this.changes)))
  }
}

export default Scope
