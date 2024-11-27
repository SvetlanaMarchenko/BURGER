import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './login-page.module.css';
import AppHeader from '../../components/app-header/app-header';

export function LoginPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('primer@primer.ru');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // Парсим ответ в JSON

      console.log('Полученные данные: ', data); // Логируем ответ сервера

      if (data.success) {
        // Токены получены и сохранены
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        navigate('/');
      } else {
        setError(data.message || 'Что-то пошло не так. Ошибка при входе');
      }
    } catch (error) {
      console.error('Ошибка при запросе:', error);
      setError('Что-то пошло не так! Попробуйте позже.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginLayout}>
      <AppHeader />
      <div>
        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
            <EmailInput
              onChange={handleEmailChange}
              value={email}
              name={'email'}
              isIcon={false}
              extraClass="mb-6"
            />
            <PasswordInput
              onChange={handlePasswordChange}
              value={password}
              name="password"
              extraClass="mb-6"
            />
            {error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
            <Button
              htmlType="submit"
              type="primary"
              size="medium"
              extraClass="mb-20"
              disabled={isSubmitting}
            >
              Войти
            </Button>

            <div className={`${styles.newPerson}`}>
              <p className="text text_type_main-default text_color_inactive mb-4"> Вы новый пользователь? </p>
              <Link to="/register">
                Зарегистрироваться
              </Link>
            </div>

            <div className={`${styles.newPerson}`}>
              <p className="text text_type_main-default text_color_inactive "> Забыли пароль? </p>
              <Link to="/forgot-password">
                Восстановить пароль
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}




// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
// import styles from './login-page.module.css';
// import AppHeader from '../../components/app-header/app-header';
// import { fetchWithAuth } from '../../utils/Api'; // Импортируем requestFromApi

// export function LoginPage() {
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('primer@primer.ru');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       alert('Пожалуйста, заполните все поля');
//       return;
//     }

//     setIsSubmitting(true);

//     try {
//       // Используем requestFromApi для отправки запроса на логин
//       const data = await fetchWithAuth('/auth/login', {
        
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       console.log('Полученные данные: ', data); // Логируем ответ сервера

//       if (data.success) {
//         // Токены получены и сохранены
//         localStorage.setItem('accessToken', data.accessToken);
//         localStorage.setItem('refreshToken', data.refreshToken);

//         navigate('/home');
//       } else {
//         setError(data.message || 'Что-то пошло не так. Ошибка при входе');
//       }
//     } catch (error) {
//       console.error('Ошибка при запросе:', error);
//       setError('Что-то пошло не так! Попробуйте позже.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className={styles.loginLayout}>
//       <AppHeader />
//       <div>
//         <div className={styles.container}>
//           <form className={styles.form} onSubmit={handleSubmit}>
//             <h1 className={`text text_type_main-medium mb-6`}>Вход</h1>
//             <EmailInput
//               onChange={handleEmailChange}
//               value={email}
//               name={'email'}
//               isIcon={false}
//               extraClass="mb-6"
//             />
//             <PasswordInput
//               onChange={handlePasswordChange}
//               value={password}
//               name="password"
//               extraClass="mb-6"
//             />
//             {error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
//             <Button
//               htmlType="submit"
//               type="primary"
//               size="medium"
//               extraClass="mb-20"
//               disabled={isSubmitting}
//             >
//               Войти
//             </Button>

//             <div className={`${styles.newPerson}`}>
//               <p className="text text_type_main-default text_color_inactive mb-4"> Вы новый пользователь? </p>
//               <Link to="/register">
//                 Зарегистрироваться
//               </Link>
//             </div>

//             <div className={`${styles.newPerson}`}>
//               <p className="text text_type_main-default text_color_inactive "> Забыли пароль? </p>
//               <Link to="/forgot-password">
//                 Восстановить пароль
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
