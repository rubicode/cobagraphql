const { buildSchema } = require('graphql');
const TodoModel = require('../models/Todo');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  input TodoInput {
    title: String!
    complete: Boolean
  }

  type Todo {
    id: ID!
    title: String!
    complete: Boolean
  }

  type Query {
    getTodos: [Todo]
    getTodo(id: ID!): Todo
  }

  type Mutation {
    createTodo(input: TodoInput): Todo
    updateTodo(id: ID!, input: TodoInput): Todo
    deleteTodo(id: ID!): Todo
  }
`);

class Todo {
    constructor(id, { title, complete }) {
        this.id = id;
        this.title = title;
        this.complete = complete;
    }
}

const solution = {
    getTodos: async () => {
        try {
            const data = await TodoModel.find({})
            return data.map(item => new Todo(item._id, { title: item.title, complete: item.complete }))
        } catch (err) {
            console.log(err)
            throw new Error('gagal ambil data');
        }
    },
    getTodo: async ({ id }) => {
        try {
            const data = await TodoModel.findOne({ _id: id })
            return new Todo(data._id, { title: data.title, complete: data.complete })
        } catch (err) {
            throw new Error('gagal ambil  dengan ID:' + id);
        }
    },
    createTodo: async ({ input }) => {
        try {
            const data = await TodoModel.create(input)
            return new Todo(data._id, { title: data.title, complete: data.complete })
        } catch (err) {
            throw new Error('gagal tambah data');
        }
    },
    updateTodo: async ({ id, input }) => {
        try {
            const data = await TodoModel.findByIdAndUpdate(id, input, {new: true})
            return new Todo(data._id, { title: data.title, complete: data.complete })
        } catch (err) {
            throw new Error('gagal update data dengan ID:' + id);
        }
    },
    deleteTodo: async ({ id }) => {
        try {
            const data = await TodoModel.findByIdAndRemove(id)
            return new Todo(data._id, { title: data.title, complete: data.complete })
        } catch (err) {
            throw new Error('gagal delete data dengan ID:' + id);
        }
    },
}

module.exports = { schema, solution }

/**
 
query{
  getTodos {
    id,
    title
  }
}

query{
  getTodo(id:"61c056d0cf78e58d172c2ec2"){
    id
    title
    complete
  }
}

mutation createTodo($title: String!) {
  createTodo(input: {title: $title}) {
    id
    title
    complete
  }
}

mutation updateTodo($title: String!, $complete: Boolean) {
  updateTodo(id: "61c2f899cdf6b5490baf20bd",input: {title: $title, complete: $complete}) {
    id
    title
    complete
  }
}


mutation deleteTodo($id: ID!) {
  deleteTodo(id: $id) {
    id
    complete
  }
}

 */