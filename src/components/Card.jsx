import { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Card = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const handleInputChange = (e) => setTask(e.target.value);
  const handleSubmit = () => {
    if (!task.trim()) return;
    setTodos([{ id: Date.now(), text: task }, ...todos]);
    setTask("");
  };
  const handleDelete = (id) => setTodos(todos.filter((todo) => todo.id !== id));
  const handleEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };
  const handleSaveEdit = () => {
    setTodos(
      todos.map((todo) =>
        todo.id === editId ? { ...todo, text: editText } : todo
      )
    );
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="flex flex-col items-center justify-start bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-white mb-8 animate-pulse">
        📌 My To-Do List
      </h1>

      {/* Input Section */}
      <div className="flex w-full max-w-2xl gap-4 mb-6">
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={handleInputChange}
          className="flex-1 p-4 rounded-xl bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 shadow-inner"
        />
        <button
          onClick={handleSubmit}
          disabled={!task.trim()}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="w-full max-w-2xl space-y-4">
        {todos.length === 0 ? (
          <p className="text-gray-400 text-center text-lg italic">
            No tasks added yet... 📝
          </p>
        ) : (
          todos.map((todo, index) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 transition-all shadow-lg rounded-xl p-4"
            >
              {/* Task Text or Edit Input */}
              {editId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 p-2 rounded-md bg-gray-600 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              ) : (
                <span className="text-white text-lg font-medium">
                  {index + 1}. {todo.text}
                </span>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 ml-4">
                {editId === todo.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-md transition"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Card;
