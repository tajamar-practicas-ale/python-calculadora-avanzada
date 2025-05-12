import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Calculadora from './components/Calculadora'
import Historial from './components/Historial'
import Registro from './components/Registro'
import Usuarios from './components/Usuarios'

function App() {

  return (
    <>
      <Header />
      <main className='w-full p-12 flex justify-around'>
        <section className='flex flex-col gap-10'>
          <Calculadora />
          <Historial />
        </section>
        <section className=''>
          <Registro />
          <Usuarios />
        </section>
      </main>
    </>
  )
}

export default App
