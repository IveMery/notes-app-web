import React, { useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ShowEdit = ({ show, handleClose, taskToEdit,setTasks }) => {

  // Crea una instancia de useFormik para manejar el estado del formulario
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      task: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Ingrese el título de la tarea'),
      task: Yup.string().required('Ingrese la tarea'),
    }),
    onSubmit: (values, { resetForm }) => {
      // manejar la lógica para guardar la tarea editada
      console.log('Tarea editada:', values);
      const editedTask = {
        id: values.id,
        title: values.title,
        task: values.task,
      };

      // Lógica para guardar la tarea editada en localStorage
      const updatedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasksWithEdit = updatedTasks.map(task => (task.id === values.id ? editedTask : task));
      setTasks(updatedTasksWithEdit)
      localStorage.setItem('tasks', JSON.stringify(updatedTasksWithEdit));
      resetForm();
      handleClose();
    },
  });

  useEffect(() => {
    // Cargar los datos en el formulario 
    if (taskToEdit) {
      console.log(taskToEdit,"soy el tasktoedit");
      formik.setValues({
        id: taskToEdit.id,
        title: taskToEdit.title,
        task: taskToEdit.task,
      });
    }
  }, [taskToEdit]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Titulo Tarea</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title && <div>{formik.errors.title}</div>}
          </Form.Group>

          <Form.Group controlId="formTask">
            <Form.Label>Descripcion Tarea</Form.Label>
            <Form.Control
              as="textarea"
              name="task"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.task}
            />
            {formik.touched.task && formik.errors.task && <div>{formik.errors.task}</div>}
          </Form.Group>

          <Button className='m-1' variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button className='m-1' variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ShowEdit;
