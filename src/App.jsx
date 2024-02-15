import { useState, useEffect } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ShowTasks from './components/ShowTasks';
import { v4 as uuidv4 } from 'uuid';
import SwitchTheme from './components/SwitchTheme';
import './styles/main.scss'
import { useTheme } from './contexts/ThemeContext';
import { Form } from 'react-bootstrap';
import SearchNotes from './components/SearchNotes';

const App = () => {
  const { isDarkMode } = useTheme();
  const newId = uuidv4()
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    //  tareas del localStorage y actualiza el estado
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      task: '',
      date: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Ingrese el título de la tarea'),
      task: Yup.string().required('Ingrese la tarea'),
    }),
    onSubmit: (values, { resetForm }) => {

      const newTask = { id: newId, title: values.title, task: values.task, date: new Date().toLocaleDateString('es-CL') };
      const updatedTasks = [...tasks, newTask]
      setTasks(updatedTasks)
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      resetForm();
    }
  })

  return (
    <div className={`main ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className='container-fluid mt-4'>
        <div className="row">
          <aside className="col-md-3"></aside>
          <main className='col-md-6'>
            <div className='row'>
              <h1>Notes APP</h1>
              <SwitchTheme />
              <div className='col'>
                <SearchNotes />
              </div>
              <div className='row'>
                <div className='col'>
                  <ShowTasks setTasks={setTasks} />
                </div>
              </div>
            </div>
          </main>
          <aside className="col-md-2">
            <Form onSubmit={formik.handleSubmit}>
              <div className='mb-3'>
                <label htmlFor="title">Título Nota:</label>
                <input
                  className="form-control"
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Ingresa el título de la nota"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                />
                {formik.touched.title && formik.errors.title ? (
                  <div>{formik.errors.title}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label htmlFor="task">Agregar Nota:</label>
                <input
                  className="form-control"
                  type="text"
                  id="task"
                  name="task"
                  placeholder="Ingresa nota"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.task}
                />
                {formik.touched.task && formik.errors.task ? (
                  <div>{formik.errors.task}</div>
                ) : null}
              </div>
              <button type="submit" className="btn btn-success mx-2">
                Guardar
              </button>
            </Form>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App
