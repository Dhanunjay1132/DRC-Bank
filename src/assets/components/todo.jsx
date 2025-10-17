import  { useEffect, useState } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';

export function TodoPage({ username }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);

  // ✅ Log username to confirm it is passed correctly
  console.log("Rendering TodoPage with username:", username);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched todos:", data);
        if (data && Array.isArray(data.todos)) {
          setTodos(data.todos);
        } else {
          console.warn("No valid todos array received.");
          setTodos([]);
        }
      })
      .catch((err) => {
        console.error("Error loading todos:", err);
      });
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;

    fetch("http://127.0.0.1:8000/todos/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: newTodo }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, newTodo]);
        setNewTodo("");
      })
      .catch((err) => {
        console.error("Failed to add todo:", err);
      });
  };

  const handleDelete = (indexToDelete) => {
    fetch(`http://127.0.0.1:8000/todos/delete/${indexToDelete}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        const updatedTodos = todos.filter((_, i) => i !== indexToDelete);
        setTodos(updatedTodos);
      })
      .catch((err) => {
        console.error("Failed to delete todo:", err);
      });
  };

  const handleCheckboxChange = (index) => {
    setSelectedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleSubmitCompleted = () => {
    selectedIndexes.forEach((index) => {
      const formData = new FormData();
      formData.append("note", note.trim() === "" ? "No note" : note);
      if (file) formData.append("file", file);

      fetch(`http://127.0.0.1:8000/todos/complete/${index}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          const todo = todos[index];
          const completed = {
            text: todo,
            note: data.note,
            file: data.file,
            fileName: data.fileName,
          };
          setCompletedTodos((prev) => [...prev, completed]);
          setTodos((prev) => prev.filter((_, i) => i !== index));
        })
        .catch((err) => {
          console.error("Failed to complete todo:", err);
        });
    });

    setSelectedIndexes([]);
    setNote("");
    setFile(null);
  };

  return (
    <div className='container mx-auto p-4 bg-gray-900 min-h-screen'>
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h1 className="text-5xl font-bold mb-4 text-center text-red-500">TODO PAGE</h1>
      <h2 className="text-xl text-left font-bold text-blue-500 mb-2">
        Hi {username}, welcome back! Add your daily Todos here
      </h2>
      
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        {/* Active Todos */}
        <div className="flex-1 bg-gray-800 p-4 rounded shadow rounded-[20px]">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">📝 Active Todos</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              className="border border-gray-300 px-3 py-1 rounded w-full text-white bg-gray-900"
              placeholder="Enter a new task"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-400"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>

          <ul className="list-disc text-left ml-4">
            {todos.map((todo, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedIndexes.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <span>{todo}</span>
                </div>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-700 ml-4"
                >
                  <FaDeleteLeft />
                </button>
              </li>
            ))}
          </ul>

          {selectedIndexes.length > 0 && (
            <div className="mt-4">
              <input
                type="text"
                className="border border-gray-400 px-3 py-1 rounded w-full text-white bg-gray-900 mb-2"
                placeholder="Add a note for completed task(s)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <input
                type="file"
                className="mb-2 text-white bg-gray-700 px-3 py-1 rounded w-full"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button
                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-500"
                onClick={handleSubmitCompleted}
              >
                Submit Completed
              </button>
            </div>
          )}
        </div>

        {/* Completed Todos */}
        <div className="flex-1 bg-gray-800 p-4 rounded shadow rounded-[20px]">
          <h2 className="text-xl font-semibold text-green-400 mb-4">{username}'s✅ Completed Todos</h2>
          {completedTodos.length === 0 ? (
            <p className="text-gray-400">No tasks completed yet.</p>
          ) : (
            <ul className="ml-4 list-disc">
              {completedTodos.map((item, i) => (
                <li key={i} className="mb-3">
                  <div className="text-gray-300">{item.text}</div>
                  <div className="text-sm italic text-yellow-300">📝 {item.note}</div>
                  {item.file && (
                    <div className="text-sm mt-1">
                      📎 File:{" "}
                      <a
                        href={item.file}
                        download={item.fileName}
                        target="_blank"
                        className="text-blue-400 underline"
                      >
                        {item.fileName}
                      </a>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}
