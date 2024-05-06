import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { CREATE_USER_MUTATION } from './mutations';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
    name: yup.string().required('Имя обязательно для заполнения'),
    email: yup.string().email('Введите корректный email').required('Email обязателен для заполнения'),
    password: yup.string().min(6, 'Пароль должен содержать минимум 6 символов').required('Пароль обязателен для заполнения'),
  });

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [createUser, { loading, error }] = useMutation(CREATE_USER_MUTATION);

  const onSubmit = async (data) => {
    try {
      const { name, email, password } = data;
      await createUser({ variables: { name, email, password } });
      alert('Пользователь успешно зарегистрирован!');
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Имя" {...register('name', { required: true })} /><br></br>
      {errors.name && <span>Введите имя</span>}
      <input type="email" placeholder="Email" {...register('email', { required: true })} /><br></br>
      {errors.email && <span>Введите корректный email</span>}
      <input type="password" placeholder="Пароль" {...register('password', { required: true })} /><br></br>
      {errors.password && <span>Введите пароль</span>}
      <button type="submit" disabled={loading}>Зарегистрироваться</button><br></br>
      {error && <span>Ошибка: {error.message}</span>}
    </form>
  );
};

export default RegistrationForm;
