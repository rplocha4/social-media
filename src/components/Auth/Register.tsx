// Render Prop
import { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
        repeatPassword: '',
      }}
      validate={(values) => {
        const errors: {
          email?: string;
          password?: string;
          username?: string;
          repeatPassword?: string;
        } = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        if (!values.password) {
          errors.password = 'Required';
        }
        if (!values.username) {
          errors.username = 'Required';
        }
        if (!values.repeatPassword) {
          errors.repeatPassword = 'Required';
        } else if (values.repeatPassword !== values.password) {
          errors.repeatPassword = 'Passwords do not match';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 2));

        setSubmitting(false);

        fetch(
          'https://social-media-backend-tfft.onrender.com/api/auth/register',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.message === 'User successfully created') {
              navigate('/login');
            }
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex justify-center items-center h-screen bg-slate-600">
          <div className="bg-slate-800  w-2/6 p-10 flex flex-col justify-around items-start rounded-2xl  gap-2">
            <div className="flex flex-col">
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="rounded-xl p-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <Field
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                className="rounded-xl p-2"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <Field
                type="password"
                name="password"
                id="password"
                className="rounded-xl p-2"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <Field
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                className="rounded-xl p-2"
                placeholder="Repeat Password"
              />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="p-3 bg-slate-950 rounded-2xl"
            >
              Submit
            </button>
            <div>
              <p className="text-gray-400">
                Already have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate('/login')}
                >
                  Login
                </span>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
