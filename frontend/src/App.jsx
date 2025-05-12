import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Calculadora from './components/Calculadora'
import Historial from './components/Historial'
import RegistroUsuario from './components/RegistroUsuario'
import ListaUsuarios from './components/ListaUsuarios'

function App() {

  return (
    <>
      <Header />
      <main className='w-full p-12 flex justify-around'>
        <section className='flex w-[35%] flex-col gap-10'>
          <Calculadora />
          <Historial />
        </section>
        <section className='flex w-[35%] flex-col gap-10'>
          <RegistroUsuario />
          <ListaUsuarios />
        </section>
      </main>
    </>
  )
}

export default App
