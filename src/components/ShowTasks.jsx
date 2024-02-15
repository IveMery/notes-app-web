import React, { useState } from 'react';
import ShowEdit from './ShowEdit';
import { useTheme } from '../contexts/SearchFormContext';

const ShowTasks = ({ setTasks }) => {
  // Obtener el array de tareas del localStorage y convertirlo a un objeto
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const [show, setShow] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleShow = (id) => {
    setTaskToEdit(storedTasks.find(task => task.id === id));
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }
  const { search } = useTheme();

  const filteredCards = storedTasks.filter(card => {
    if (!search || search.trim() === '') {
      return true;
    }
    return card.title.toLowerCase().includes(search.trim().toLowerCase());
  });

  const handleDelete = (id) => {
    // Filtrar la tarea a eliminar y actualizar el estado
    const updatedTasksDelete = storedTasks.filter(task => task.id !== id);
    setTasks(updatedTasksDelete);
    // Guardar la lista actualizada en el localStorage
    localStorage.setItem('tasks', JSON.stringify(updatedTasksDelete));
  };

  return (
    <>
      <h1 className='text-center'>Mis notas</h1>
      <main className='d-flex flex-wrap'>
        {filteredCards.map((task) => (
          <div className="card m-3" key={task.id}>
            <div className="card-body">
              <h5 className="card-title text-center">{task.title}</h5>
              <p className="card-text">{task.task}</p>
              <span>{task.date}</span>
              <div className="btn-group" role="group" aria-label="Acciones">
                <button
                  className='btn btn-warning mx-2'
                  onClick={() => handleShow(task.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className='btn btn-danger'
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
      {
        show && <ShowEdit
          show={show}
          handleClose={handleClose}
          setTasks={setTasks}
          taskToEdit={taskToEdit}

        />
      }
    </>
  )
}

export default ShowTasks