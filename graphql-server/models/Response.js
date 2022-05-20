class Response {
    constructor(data, err = false) {
        this.err = err
        this.data = data
    }
}

module.exports = Response