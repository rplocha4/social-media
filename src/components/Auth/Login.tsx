import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../store/userSlice';
import { defaultAvatar } from '../../types/types';
import { useShowInfo } from '../context/ShowInfoProvider';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { displayInfo } = useShowInfo();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <Formik
      initialValues={{
        password: '',
        username: '',
      }}
      validate={(values) => {
        const errors: {
          password?: string;
          username?: string;
        } = {};

        if (!values.password) {
          errors.password = 'Required';
        }
        if (!values.username) {
          errors.username = 'Required';
        }

        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 2));

        setSubmitting(true);
        fetch('https://social-media-backend-tfft.onrender.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
            setSubmitting(false);
            if (data.message === 'Auth successful') {
              dispatch(
                login({
                  ...data.user,
                  token: data.token,
                  avatar: data.avatar || defaultAvatar,
                })
              );

              // dispatch(
              //   login({ token: data.token, user_id: data.user.user_id, username:data.user.username })
              // );
              const defaultNotificationSettings = {
                likes: true,
                comments: true,
                follows: true,
                mentions: true,
              };
              if (
                !localStorage.getItem(
                  `notificationSettings-${data.user.username}`
                )
              )
                localStorage.setItem(
                  `notificationSettings-${data.user.username}`,
                  JSON.stringify(defaultNotificationSettings)
                );

              displayInfo({
                message: 'Logged in successfully!',
                color: 'green',
              });
              data.user.role === 'admin'
                ? navigate('/admin')
                : navigate('/home');
            } else {
              setErrorMessage(data.message);
            }
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex justify-center items-center h-screen bg-slate-600">
          <div className="bg-slate-800  w-2/6 p-10 flex flex-col justify-around items-center rounded-2xl  gap-2">
            {errorMessage ? (
              <div className="text-red-700 text-2xl p-2 rounded-xl">
                <h2>
                  <span className="font-bold">Error:</span> {errorMessage}
                </h2>
              </div>
            ) : (
              <h1 className="text-4xl font-bold text-white self-center pb-5">
                Login
              </h1>
            )}
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="p-3 bg-slate-950 rounded-2xl"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
            <div>
              <p className="text-gray-400">
                Don't have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate('/register')}
                >
                  Register
                </span>
              </p>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
