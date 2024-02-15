import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTheme } from '../contexts/SearchFormContext'


const SearchNotes = () => {
  const { search, setSearch } = useTheme()

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Ingrese el título de la tarea'),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values.title);
      //setSearch(values.title)
      console.log("soy seearch del contect", search);
      //resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label htmlFor="searchinput" className="form-label">Ingresar búsqueda</label>
        <input
          type="text"
          className="form-control"
          id="searchinput"
          name="title"
          onChange={(e) => {
            formik.handleChange(e);
            setSearch(e.target.value);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-danger">{formik.errors.title}</div>
        ) : null}
      </div>
    </form>
  );
};

export default SearchNotes;
