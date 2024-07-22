class Rule {
    constructor(id, description,func) {
        this.id = id;
        this.description = description;
        this.func = func;
    }
    
    check(text,images)
    {
        return (this.func(text,images));
    }
}

module.exports = Rule;