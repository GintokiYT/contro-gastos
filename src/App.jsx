import { Fragment, useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import IconoNuevoGasto from './assets/nuevo-gasto.svg'
import { generateId } from './helpers/index'

const App = () => {

  const [ presupuesto, setPresupuesto ] = useState(
    !isNaN(Number(localStorage.getItem('presupuesto'))) 
    ? Number(localStorage.getItem('presupuesto'))
    : 0 ?? 0
  )
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)
  const [ modal, setModal ] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)
  const [ gastos, setGastos ] = useState(
    JSON.parse(localStorage.getItem('gastos')) ?? []
  )
  const [ gastoEditar, setGastoEditar ] = useState({})
  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState([])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => setAnimarModal(true), 500)
  }

  const guardarGasto = gasto => {
    if(gasto.id !== '') {
      console.log('Actualizar')
      const updateGastos = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(updateGastos)
    } else {
      console.log('Nuevo')
      setGastos( state => [...state, { ...gasto, id: generateId(), fecha: Date.now()}] )
    }
  }

  const eliminarGasto = id => {
    const updateGastos = gastos.filter( gastoState => gastoState.id !== id)
    setGastos(updateGastos)
  }

  useEffect(() => {
    if(Object.keys(gastoEditar).length !== 0) {
      console.log('Editar')
      setModal(true)
      setTimeout(() => setAnimarModal(true), 500)
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]) 

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos])

  useEffect(() => {
    const presupuestoLS = !isNaN(Number(localStorage.getItem('presupuesto'))) 
    ? Number(localStorage.getItem('presupuesto'))
    : 0 ?? 0
    
    if(presupuestoLS !== 0) setIsValidPresupuesto(true);
  }, [])

  useEffect(() => {
    if(filtro !== '') {
      console.log('Filtrando...', filtro);
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  }, [filtro])

  return (  
    <div className={ modal ? 'fijar' : ''}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      { isValidPresupuesto && (
        <Fragment>
          <main>
            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>
  
          <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto} 
              alt='Icono nuevo gasto' 
              onClick={handleNuevoGasto}
            />
          </div>
        </Fragment>
      )}

      { modal && (
        <Modal 
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}

    </div>
  )
}
 
export default App