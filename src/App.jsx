// import React, { useState, useEffect } from "react";
// import { Navbar } from "./components/Navbar";
// import { v4 as uuidv4 } from "uuid";

// import { FaEdit } from "react-icons/fa";
// import { MdDeleteForever } from "react-icons/md";

// export default function App() {
//   const [todos, setTodos] = useState([]);
//   const [todo, setTodo] = useState("");
//   const [showFinished, setShowFinished] = useState(false); // By default, only unfinished tasks are visible

//   // Save todos to localStorage
//   const saveToLocalStorage = (updatedTodos) => {
//     localStorage.setItem("todos", JSON.stringify(updatedTodos));
//   };

//   // Load todos from localStorage on component mount
//   useEffect(() => {
//     try {
//       const todoString = localStorage.getItem("todos");
//       if (todoString) {
//         const todos = JSON.parse(todoString);
//         setTodos(todos);
//       }
//     } catch (error) {
//       console.error("Error parsing todos from localStorage:", error);
//     }
//   }, []);

//   // Handle adding a new todo
//   const handleAdd = () => {
//     const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
//     setTodos(newTodos);
//     setTodo("");
//     saveToLocalStorage(newTodos);
//   };

//   // Handle editing a todo
//   const handleEdit = (id) => {
//     const index = todos.findIndex((item) => item.id === id);
//     const newTodos = [...todos];
//     const currentTodo = newTodos[index].todo;

//     const newTodo = prompt("Edit Todo", currentTodo);

//     if (newTodo !== null && newTodo.trim() !== "") {
//       newTodos[index].todo = newTodo.trim();
//       setTodos(newTodos);
//       saveToLocalStorage(newTodos);
//     }
//   };

//   // Handle deleting a todo
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this todo?")) {
//       const newTodos = todos.filter((item) => item.id !== id);
//       setTodos(newTodos);
//       saveToLocalStorage(newTodos);
//     }
//   };

//   // Handle todo input change
//   const handleChange = (e) => {
//     setTodo(e.target.value);
//   };

//   // Handle checkbox toggle for marking todo as completed
//   const handleCheckbox = (id) => {
//     const newTodos = todos.map((item) =>
//       item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
//     );
//     setTodos(newTodos);
//     saveToLocalStorage(newTodos);
//   };

//   // Handle toggle for showing/hiding completed todos
//   const handleShowFinishedToggle = () => {
//     setShowFinished(!showFinished);
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="md:container mx-auto my-4 rounded-xl p-4 bg-slate-200 min-h-[80vh] md:w-1/2">
//         <h1 className="font-bold text-center text-2xl">
//           iTask - Manage Your ToDos
//         </h1>
//         <div className="addTodo my-4">
//           <h2 className="text-lg font-bold">Add a ToDo</h2>
//           <input
//             type="text"
//             id="new-todo"
//             name="new-todo"
//             onChange={handleChange}
//             value={todo}
//             className="w-1/2"
//             placeholder="Enter your todo"
//           />
//           <button
//             onClick={handleAdd}
//             disabled={todo.length < 3}
//             className="bg-slate-500 text-sm font-bold hover:bg-slate-900 p-3 py-1 text-white rounded-md mx-6 disabled:bg-slate-400"
//           >
//             Add
//           </button>
//         </div>

//         <div className="unfinished-todos my-4">
//           <h2 className="text-lg font-bold">Your ToDo's (Unfinished)</h2>
//           <div className="todos">
//             {todos.length === 0 && (
//               <div className="text-xl font-bold my-4">No Todos Found</div>
//             )}
//             {todos
//               .filter((item) => !item.isCompleted)
//               .map((item) => (
//                 <div
//                   key={item.id}
//                   className="todo flex w-full my-3 justify-between"
//                 >
//                   <div className="flex gap-5">
//                     <input
//                       name={`todo-${item.id}`}
//                       id={`todo-${item.id}`}
//                       onChange={() => handleCheckbox(item.id)}
//                       checked={item.isCompleted}
//                       type="checkbox"
//                     />
//                     <label
//                       htmlFor={`todo-${item.id}`}
//                       className={item.isCompleted ? "line-through" : ""}
//                     >
//                       {item.todo}
//                     </label>
//                   </div>

//                   <div className="buttons flex h-full">
//                     <button
//                       onClick={() => handleEdit(item.id)}
//                       className="bg-slate-500 text-sm font-bold hover:bg-slate-900 p-3 py-1 text-white rounded-md mx-1"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(item.id)}
//                       className="bg-slate-500 text-sm font-bold hover:bg-slate-900 p-3 py-1 text-white rounded-md mx-1"
//                     >
//                       <MdDeleteForever />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//           </div>
//         </div>

//         <div className="showFinished my-4">
//           <div className="flex gap-3">
//             <input
//               type="checkbox"
//               id="show-finished"
//               name="show-finished"
//               checked={showFinished}
//               onChange={handleShowFinishedToggle}
//             />
//             <label htmlFor="show-finished" className="text-lg font-bold">
//               Show Finished
//             </label>
//           </div>
//           {showFinished && (
//             <div className="finished-todos mt-4">
//               <h2 className="text-lg font-bold">Finished ToDo's</h2>
//               <div className="todos">
//                 {todos
//                   .filter((item) => item.isCompleted)
//                   .map((item) => (
//                     <div
//                       key={item.id}
//                       className="todo flex w-full my-3 justify-between"
//                     >
//                       <div className="flex gap-5">
//                         <input
//                           name={`todo-${item.id}`}
//                           id={`todo-${item.id}`}
//                           onChange={() => handleCheckbox(item.id)}
//                           checked={item.isCompleted}
//                           type="checkbox"
//                         />
//                         <label
//                           htmlFor={`todo-${item.id}`}
//                           className={item.isCompleted ? "line-through" : ""}
//                         >
//                           {item.todo}
//                         </label>
//                       </div>

//                       <div className="buttons flex h-full">
//                         <button
//                           onClick={() => handleEdit(item.id)}
//                           className="bg-slate-500 text-sm font-bold hover:bg-slate-900 p-3 py-1 text-white rounded-md mx-1"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item.id)}
//                           className="bg-slate-500 text-sm font-bold hover:bg-slate-900 p-3 py-1 text-white rounded-md mx-1"
//                         >
//                           <MdDeleteForever />
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <button
//           onClick={() => {
//             if (window.confirm("Are you sure you want to delete all todos?")) {
//               setTodos([]);
//               saveToLocalStorage([]);
//             }
//           }}
//           className="bg-slate-500 text-sm font-bold hover:bg-slate-900 p-3 py-1 text-white rounded-md mx-1"
//         >
//           Flush All
//         </button>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(false); // By default, only unfinished tasks are visible

  // Save todos to localStorage
  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const todoString = localStorage.getItem("todos");
      if (todoString) {
        const todos = JSON.parse(todoString);
        setTodos(todos);
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
    }
  }, []);

  // Handle adding a new todo
  const handleAdd = () => {
    const newTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(newTodos);
    setTodo("");
    saveToLocalStorage(newTodos);
  };

  // Handle editing a todo
  const handleEdit = (id) => {
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    const currentTodo = newTodos[index].todo;

    const newTodo = prompt("Edit Todo", currentTodo);

    if (newTodo !== null && newTodo.trim() !== "") {
      newTodos[index].todo = newTodo.trim();
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
    }
  };

  // Handle deleting a todo
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      const newTodos = todos.filter((item) => item.id !== id);
      setTodos(newTodos);
      saveToLocalStorage(newTodos);
    }
  };

  // Handle todo input change
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Handle checkbox toggle for marking todo as completed
  const handleCheckbox = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  // Handle toggle for showing/hiding completed todos
  const handleShowFinishedToggle = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          iTask - Manage Your ToDos
        </h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Add a ToDo</h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="new-todo"
              name="new-todo"
              onChange={handleChange}
              value={todo}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="Enter your todo"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length < 3}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              Add
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Your ToDo's (Unfinished)
          </h2>
          <div className="space-y-4">
            {todos.length === 0 && (
              <div className="text-center text-lg font-medium text-gray-500">
                No Todos Found
              </div>
            )}
            {todos
              .filter((item) => !item.isCompleted)
              .map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <input
                      name={`todo-${item.id}`}
                      id={`todo-${item.id}`}
                      onChange={() => handleCheckbox(item.id)}
                      checked={item.isCompleted}
                      type="checkbox"
                      className="form-checkbox"
                    />
                    <label
                      htmlFor={`todo-${item.id}`}
                      className={`text-lg ${
                        item.isCompleted ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {item.todo}
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDeleteForever size={20} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {showFinished && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Finished ToDo's</h2>
            <div className="space-y-4">
              {todos
                .filter((item) => item.isCompleted)
                .map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-md shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        name={`todo-${item.id}`}
                        id={`todo-${item.id}`}
                        onChange={() => handleCheckbox(item.id)}
                        checked={item.isCompleted}
                        type="checkbox"
                        className="form-checkbox"
                      />
                      <label
                        htmlFor={`todo-${item.id}`}
                        className={`text-lg ${
                          item.isCompleted ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {item.todo}
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDeleteForever size={20} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete all todos?")
              ) {
                setTodos([]);
                saveToLocalStorage([]);
              }
            }}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-700"
          >
            Flush All
          </button>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="show-finished"
              name="show-finished"
              checked={showFinished}
              onChange={handleShowFinishedToggle}
              className="form-checkbox"
            />
            <label htmlFor="show-finished" className="text-lg font-semibold">
              Show Finished
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
