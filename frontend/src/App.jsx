import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import Header from './components/Header'
import Calculadora from './components/Calculadora'
import Historial from './components/Historial'
import RegistroUsuario from './components/RegistroUsuario'
import ListaUsuarios from './components/ListaUsuarios'

function App() {
  const [historial, setHistorial] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const obtenerHistorial = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/historial");
      setHistorial(data);
    } catch (err) {
      console.error("Error al obtener historial:", err);
    }
  };

  const obtenerUsuarios = async () => {
    try {
      axios.get("http://localhost:5000/usuarios").then(({ data }) => setUsuarios(data));
    } catch (err) {
      console.error("Error al obtener los usuarios:", err)
    }
  };

  useEffect(() => {
    obtenerUsuarios();
    obtenerHistorial();
  }, []);

  return (
    <>
      <Header />
      <main className='w-full p-12 flex justify-around'>
        <section className='flex w-[35%] flex-col gap-10'>
          <Calculadora calc={obtenerHistorial} />
          <Historial historial={historial} limpiarHistorial={obtenerHistorial} />
        </section>
        <section className='flex w-[35%] flex-col gap-10'>
          <RegistroUsuario users={obtenerUsuarios} />
          <ListaUsuarios usuarios={usuarios} />
        </section>
      </main>
    </>
  )
}

export default App
