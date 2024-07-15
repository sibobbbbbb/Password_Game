class rule {
    constructor(id, description,func) {
        this.id = id;
        this.description = description;
        this.func = func;
    }
    
    check(text)
    {
        return (this.func(text));
    }
}

module.exports = rule;