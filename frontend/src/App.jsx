import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const URL = "http://localhost:5000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState({ id: null, title: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${URL}/tasks/all`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const createTask = async () => {
    try {
      const response = await axios.post(`${URL}/tasks/create`, {
        title: newTask,
      });
      setTasks([...tasks, response.data]);
      setNewTask("");
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (taskId) => {
    try {
      await axios.put(`${URL}/tasks/update/${taskId}`, {
        title: editTask.title,
      });
      const updatedTasks = tasks.map((task) =>
        task._id === taskId ? { ...task, title: editTask.title } : task
      );
      setTasks(updatedTasks);
      setEditTask({ id: null, title: "" });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${URL}/tasks/delete/${taskId}`);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleKeyDown = (taskId, e) => {
    if (e.keyCode === 13) {
      updateTask(taskId);
    }
  };

  return (
    <div>
      <h2>Task List</h2>

      <div>
        <input
          style={{
            height: "3rem",
            width: "25rem",
          }}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          style={{
            height: "3rem",
          }}
          onClick={createTask}
        >
          Add Task
        </button>
      </div>

      <ul
        style={{
          width: "700px",
        }}
      >
        {tasks.map((task) => (
          <li
            key={task._id}
            style={{
              display: "flex",
              background: "#f1f1f1",
              color: "black",
              justifyContent: "space-between",
              width: "100%",
              padding: "10px",
            }}
          >
            {task._id === editTask.id ? (
              <>
                <input
                  style={{
                    width: "100%",
                  }}
                  type="text"
                  value={editTask.title}
                  onChange={(e) =>
                    setEditTask({ ...editTask, title: e.target.value })
                  }
                  onKeyDown={(e) => handleKeyDown(task._id, e)}
                />
                <div>
                  <button onClick={() => updateTask(task._id)}>Save</button>
                </div>
              </>
            ) : (
              <>
                {task.title}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() =>
                      setEditTask({ id: task._id, title: task.title })
                    }
                  >
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
