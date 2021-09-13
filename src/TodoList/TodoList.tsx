import {observer} from 'mobx-react'; 
import React, {useState} from 'react';
import { TodoStoreImpl } from './TodoListStore';

interface TodoListProps {
    todoStore: TodoStoreImpl
}

const TodoList: React.FC<TodoListProps> = observer(({todoStore}) => {
    const [value, setValue] = useState<string>('');

    const status = todoStore.status; 

    const handleChange = (event: any) => {
        setValue(event.target.value); 
    };

    return (
        <div>
            <input type="text" value={value} onChange={handleChange}/>
            <button onClick={()=>{
                if (value) {
                    todoStore.addTodo(value);
                    setValue('')    
                }
                }}>submit</button>

            <br />
            Completed: {status.completed}
            <br />
            Remaining: {status.remaining}

            <ul>
                {todoStore.todos.map((todo, key) => {
                    return <li key={key} onClick={()=>{todoStore.toggleTodo(todo.id)}}>{todo.title} [{todo.completed ? 'x': ' '}]</li>
                })}
            </ul>
        </div>
    )
});

export default TodoList;