import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
});

const loadTodoFailure = () => ({
    type: 'LOAD_TODO_FAILURE'
})

const loadTodoSuccess = todos => ({
    type: 'LOAD_TODO_SUCCESS',
    todos
})

const GET_TODOS = gql`
query{
  getTodos {
    id,
    title
  }
}
`;

export const loadTodo = () => dispatch =>
    client.query({
        query: GET_TODOS
    }).then(response => {
        if (response.data.getTodos) {
            const todos = []
            response.data.getTodos.forEach(item => {
                todos.push({ _id: item.id, title: item.title })
            })
            dispatch(loadTodoSuccess(todos))
        } else {
            dispatch(loadTodoFailure())
        }
    }).catch((err) => {
        alert('load data failed')
        dispatch(loadTodoFailure())
    })

const drawTodo = (_id, title) => ({
    type: 'ADD_TODO',
    _id,
    title
})

const addTodoFailure = (_id) => ({
    type: 'ADD_TODO_FAILURE',
    _id
})

const addTodoSuccess = (_id, todo) => ({
    type: 'ADD_TODO_SUCCESS',
    _id,
    todo
})

const CREATE_TODO = gql`
mutation createTodo($title: String!) {
    createTodo(input: {title: $title}) {
      id
      title
      complete
    }
  }
`

export const addTodo = title => dispatch => {
    const _id = Date.now()
    dispatch(drawTodo(_id, title))
    client.mutate({
        mutation: CREATE_TODO,
        variables: { title },
    }).then(response => {
        dispatch(addTodoSuccess(_id, { _id: response.data.createTodo.id, title: response.data.createTodo.title }))
    }).catch((err) => {
        dispatch(addTodoFailure(_id))
    });
}

const DELETE_TODO = gql`
mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
      complete
    }
  }
`

export const removeTodo = id => dispatch =>
    client.mutate({
        mutation: DELETE_TODO,
        variables: { id },
    }).then(response => {
        dispatch({ type: 'REMOVE_TODO_SUCCESS', id })
    }).catch((err) => {
        dispatch({ type: 'REMOVE_TODO_FAILURE' })
    });


export const resendTodo = (id, title) => dispatch => {
    client.mutate({
        mutation: CREATE_TODO,
        variables: { title },
    }).then(response => {
        dispatch({ type: 'RESEND_TODO_SUCCESS', id })
    }).catch((err) => {
        dispatch({ type: 'RESEND_TODO_FAILURE' })
    });
}