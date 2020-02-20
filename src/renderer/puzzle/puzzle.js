// import _ from 'lodash'

export default class Puzzle{
    id = -1
    name = ''
    available = false
    solved = false
    dependencies = {}
    solution = {}

    constructor(config){
        this.id = config.id
        this.name = config.name
        this.dependencies = config.dependencies
        this.solution = config.solution
        this.available = this.checkAvailability()
        this.solved = false
    }

    checkAvailability() {
        if (this.solved) return false
        if (this.available) return true
        let check = true
        for (const key in this.dependencies) {
            if (this.dependencies.hasOwnProperty(key)) {
                const element = this.dependencies[key];
                if (element === false) check = false
            }
        }
        return check
    }
}