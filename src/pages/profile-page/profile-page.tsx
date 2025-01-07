import React, { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Button, EmailInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';
import { fetchUserData, logoutUser, updateUserData } from '../../utils/api';
import styles from './profile-page.module.css';
import NavigationProfilePage from './navigation-profile-page.tsx';

interface PropInitialUserDataProps {
  email: string;
  name: string;
}

const ProfilePage: React.FC<{ initialUserData?: PropInitialUserDataProps }> = ({ initialUserData }) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [initialUserDataState, setInitialUserData] = useState<PropInitialUserDataProps>({ email: '', name: '' });
  const [isChanged, setIsChanged] = useState<boolean>(false); 

  useEffect(() => {
    if (initialUserData) {
      setInitialUserData(initialUserData);
      setEmail(initialUserData.email);
      setName(initialUserData.name);
    } else {
      const fetchData = async () => {
        try {
          const result = await fetchUserData();
          setInitialUserData(result.user);
          setEmail(result.user.email);
          setName(result.user.name);
        } catch (error) {
          setError('Ошибка при загрузке данных');
        }
      };
      fetchData();
    }
  }, [initialUserData]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsChanged(true);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setIsChanged(true);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setIsChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !name) {
      setError('Заполните все поля!');
      return;
    }

    try {
      const updatedUserData = { email, name, password };
      const result = await updateUserData(updatedUserData);
      setSuccessMessage('Данные успешно обновлены');
      setInitialUserData(result.user);
      setError('');
      setIsChanged(false);
    } catch (error) {
      setError('Ошибка при сохранении данных');
      setSuccessMessage('');
    }
  };

  const handleCancel = () => {
    setEmail(initialUserDataState.email);
    setName(initialUserDataState.name);
    setPassword('');
    setIsChanged(false);
  };

  return (
    <div className={styles.loginLayoutProfile}>
      <div>
        <div className={styles.container}>
          <div className={styles.profileForm}>
          <NavigationProfilePage />
            <form className={styles.form} onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="Имя"
                onChange={handleNameChange}
                value={name}
                name="name"
                error={false}
                errorText="Ошибка"
                size="default"
                extraClass="mb-6"/>
              <EmailInput
                onChange={handleEmailChange}
                value={email}
                placeholder="Email"
                isIcon={true}
                extraClass="mb-6"
              />
              <PasswordInput
                onChange={handlePasswordChange}
                value={password}
                name="password"
                extraClass="mb-6"
                icon="EditIcon"
              />

              {error && <p className="text text_type_main-default text_color_inactive">{error}</p>}
              {successMessage && <p className="text text_type_main-default text_color_inactive">{successMessage}</p>}

              {isChanged && (
                <div className={styles.buttonsContainer}>
                  <Button
                    type="secondary"
                    size="large"
                    onClick={handleCancel}
                    htmlType="reset"
                  >
                    Отмена
                  </Button>
                  <Button type="primary" size="large" htmlType="submit">Сохранить</Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
