'use client'

import Form from 'next/form'

const Register = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <div className="bg-blue-800 w-1/4 h-1/2 rounded-2xl flex flex-col items-center">
        <p className='mt-5 text-center text-3xl font-semibold'>Register</p>
        <Form className='w-10/12 flex flex-col gap-3 mt-8' action='/login'>
        <p className='font-semibold text-1xl'>Name</p>
        <input type="email" name='email' placeholder='Digite seu Email' className='bg-white rounded-md'  required/>
        <p className='font-semibold text-1xl'>Email</p>
        <input type="email" name='email' placeholder='Digite seu Email' className='bg-white rounded-md'  required/>
        <p className='font-semibold text-1xl'>Senha</p>
        <input type="password" name='password' placeholder='Digite sua senha' className='bg-white rounded-md'  required/>
        <p></p>
        <button type='submit' className='cursor-pointer w-2/6 h-1/6 bg-white rounded-md self-center'>Entrar</button>
        </Form>
      </div>
    </main>
  );
}

export default Register
