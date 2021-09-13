import {makeObservable, observable, action, computed} from 'mobx';
import { createFalse } from 'typescript';
interface TodoItem {
    id: number;
    title: string;
    completed: boolean;
}

export class TodoStoreImpl {
    // @observable
    todos: TodoItem[] = [];

    constructor() {
        // 데코레이터 사용 대신 함수로 mobx observable 요소로 바인딩 시킴
        makeObservable(this, {
            todos: observable,
            addTodo: action,
            toggleTodo: action,
            status: computed
        });
        
    }
 
    // @action
    addTodo(title: string){
        const item: TodoItem = {
            id: +Math.random().toFixed(4),
            title,  
            completed: false,
        }
        this.todos.push(item);
    }

    toggleTodo(id: number){
        const index = this.todos.findIndex(item => item.id === id);
        if(index > -1) {
            this.todos[index].completed = !this.todos[index].completed;
        }
    }

    get status() {
        let completed = 0, remaining = 0;
        this.todos.forEach(todo=> {
            if (todo.completed) {
                completed++;
            } else {
                remaining++;
            }
        });

        return {completed, remaining}
    }
}

export const TodoStore = new TodoStoreImpl();