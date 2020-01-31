export default class Puzzle{
    id = -1
    name = ''
    available = false
    solved = false
    dependencies = []
    solution = {}

    constructor(config){
        this.id = config.available
        this.name = config.name
        this.dependencies = config.dependencies
        this.solution = config.solution
        this.available = (this.dependencies.length > 0) ? false : true
        this.solved = false
    }

}