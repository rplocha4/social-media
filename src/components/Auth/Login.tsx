import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { login } from '../../store/userSlice';
import { hideInfo, showInfo } from '../../store/uiSlice';
import { defaultAvatar } from '../../types/types';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

        setSubmitting(false);
        fetch('https://social-media-backend-tfft.onrender.com/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => {
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

              dispatch(
                showInfo({ message: 'Logged in successfully!', color: 'green' })
              );
              setTimeout(() => {
                dispatch(hideInfo());
              }, 2000);
              data.user.role === 'admin'
                ? navigate('/admin')
                : navigate('/home');
            } else {
              dispatch(showInfo({ message: data.message, color: 'red' }));
              setTimeout(() => {
                dispatch(hideInfo());
              }, 2000);
            }
          });
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex justify-center items-center h-screen bg-slate-600">
          <div className="bg-slate-800  w-2/6 p-10 flex flex-col justify-around items-start rounded-2xl  gap-2">
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
              Submit
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
