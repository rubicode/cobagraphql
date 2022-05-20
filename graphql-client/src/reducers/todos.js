const todos = (state = [], action) => {
    switch (action.type) {
        case 'LOAD_TODO_SUCCESS':
            return action.todos.map(item => {
                item.sent = true
                return item
            })

        case 'ADD_TODO':
            return [...state, { _id: action._id, title: action.title, sent: true }]

        case 'ADD_TODO_SUCCESS':
            return state.map(item => {
                if (item._id === action._id) {
                    item._id = action.todo._id
                }
                return item
            })


        case 'ADD_TODO_FAILURE':
            return state.map(item => {
                if (item._id === action._id) {
                    item.sent = false
                }
                return item
            })

        case 'REMOVE_TODO_SUCCESS':
            return state.filter(item => item._id !== action.id)

        case 'RESEND_TODO_SUCCESS':
            return state.map(item => {
                if (item._id === action.id) {
                    item.sent = true
                }
                return item
            })

        case 'RESEND_TODO_FAILURE':
        case 'REMOVE_TODO_FAILURE':
        case 'LOAD_TODO_FAILURE':
        default:
            return state
    }
}

export default todos