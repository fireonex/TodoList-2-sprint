import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    // const [tasks, setTasks] = useState<TaskType[]>([
    // 	{id: v1(), title: 'HTML&CSS', isDone: true},
    // 	{id: v1(), title: 'JS', isDone: true},
    // 	{id: v1(), title: 'ReactJS', isDone: false},
    // ])

    //const [filter, setFilter] = useState<FilterValuesType>('all')
    const removeTask = (todolistID: string, taskId: string) => {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
        // const filteredTasks = tasks.filter((task) => {
        // 	return task.id !== taskId
        // })
        // setTasks(filteredTasks)
    }
    const addTask = (todolistID: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        //  setTasks({...tasks, [todolistID]: [...tasks[todolistID],newTask]})
        setTasks((prevState) => ({...prevState, [todolistID]: [newTask, ...prevState[todolistID]]}))
        // const newTasks = [newTask, ...tasks]
        // setTasks(newTasks)
    }
    const changeFilter = (todolistID: string, newFilter: FilterValuesType) => {
        // const curentTodolist=todolists.find(el=>el.id===todolistID)
        // if(curentTodolist){
        // 	curentTodolist.filter=newFilter
        // 	setTodolists([...todolists])//345
        // }

        setTodolists(todolists.map(el => el.id === todolistID
            ? {...el, filter: newFilter}
            : el)
        )
    }



    const changeTaskStatus = (todolistID: string, taskId: string, taskStatus: boolean) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: taskStatus} : el)
        })
        // const newState = tasks.map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        // setTasks(newState)
    }

    const deleteTasks = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
        setTasks({...tasks})
        //setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el=>el.id!==taskId)})
    }

    return (
        <div className="App">
            {todolists.map((el, index) => {
                let tasksForTodolist = tasks[el.id]
                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(task => !task.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(task => task.isDone)
                }
                return (
                    <Todolist
                        key={el.id}
                        todolistID={el.id}
                        title={el.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        deleteTasks={deleteTasks}
                        filter={el.filter}
                    />
                )
            })}

        </div>
    );
}

export default App;
