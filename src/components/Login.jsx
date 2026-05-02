import React from 'react'
import {Input, Button} from './FormModule/Index'
import {login as authLogin} from '../store/authSlice'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const submit = async(data) => {
    setError('');
    try {
        const session = await authService.login(data);
        if(session) {
            const userData = await authService.getCurrentUser();
            if(userData) {
                dispatch(authLogin(userData));
                navigate('/');
            }
        }
    } catch (error) {
        setError(error.message);
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <h1 className='text-2xl font-bold text-center mb-4'>Login to your account</h1>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        <form onSubmit={handleSubmit(submit)} className='flex flex-col gap-4'>
          <Input
            label='Email'
            type='email'
            placeholder='Enter your email'
            {...register('email', { required: 'Email is required' })}
          />
          <Input
            label='Password'
            type='password'
            placeholder='Enter your password'
            {...register('password', { required: 'Password is required' })}
          />
          <Button type='submit' className='w-full'>
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
