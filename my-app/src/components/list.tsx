import { useState } from 'react'

let nextId = 0;


export default function List() {
    const [name, setName] = useState('')
    const [tasks, setTasks] = useState<{ id: number; name: string; seen: boolean }[]>([])

    function onToggle(id: number, seen: boolean) {
        setTasks(
            tasks.map(task => 
                task.id === id ? { ...task, seen} : task
            )
        )
    };
    

    return (
        <>
            <input 
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <button onClick={() => {
                setTasks([
                    ...tasks,
                { id: nextId++, name: name, seen: false }
            ]);
        }}>Add</button>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.name}{' '}
                    <label>
                        <input 
                            type="checkbox"
                            checked={task.seen}
                            onChange={e => {
                                onToggle(
                                    task.id, 
                                    e.target.checked
                                );
                            }}
                        />
                    </label>
                    <button onClick={() => {
                        setTasks(
                            tasks.filter(t => 
                                t.id !== task.id
                            )
                        );
                    }}>
                        Delete
                    </button>
                    </li>
                ))}
            </ul>

        </>
    );
}