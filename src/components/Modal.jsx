import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../assets/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

  const [ nombre, setNombre ] = useState('')
  const [ cantidad, setCantidad ] = useState(0)
  const [ categoria, setCategoria ] = useState('')
  const [ mensaje, setMensaje ] = useState('')
  const [ id, setId ] = useState('')
  const [ fecha, setFecha ] = useState('')

  const ocultarModal = () => {
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
      setGastoEditar({})
    }, 500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if([nombre, cantidad, categoria].includes('') || cantidad <= 0) {
      setMensaje('Todos los campos son obligatorios')
      setTimeout(() => setMensaje(''), 3000)
      return
    }
    guardarGasto({ nombre, cantidad, categoria, id, fecha })  
    ocultarModal()
  }

  useEffect(() => {
    if(Object.keys(gastoEditar).length !== 0){
      setId(gastoEditar.id)
      setNombre(gastoEditar.nombre)
      setCantidad(gastoEditar.cantidad)
      setCategoria(gastoEditar.categoria)
      setFecha(gastoEditar.fecha)
    }
  }, []);

  return (  
    <div className='modal'>
      <div className='cerrar-modal'>
        <img 
          src={CerrarBtn} 
          alt='Cerrar modal' 
          onClick={ocultarModal}
        />
      </div>
      <form 
        className={`formulario ${ animarModal ? 'animar' : 'cerrar' }`}
        onSubmit={handleSubmit}
      >
        <legend>{ (Object.keys(gastoEditar).length !== 0 ? 'EDITAR' : 'NUEVO') + ' GASTO' }</legend>

        {  mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje> }

        <div className='campo'>
          <label htmlFor='nombre'>Nombre gasto</label>
          <input 
            id='nombre'
            type='text' 
            placeholder='Añade el nombre del gasto'
            value={nombre}
            onChange={ e => setNombre(e.target.value)}
          />
        </div>  
        <div className='campo'>
          <label htmlFor='cantidad'>Cantidad</label>
          <input 
            id='cantidad'
            type='number' 
            placeholder='Añade la cantidad del gasto: ej. 300'
            value={ cantidad === 0 ? '' : cantidad }
            onChange={ e => setCantidad(Number(e.target.value)) }
          />
        </div>
        <div className='campo'>
          <label htmlFor='categoria'>Categoria</label>
          <select 
            id='categoria'
            value={categoria}
            onChange={ e => setCategoria(e.target.value) }
          >
            <option value=''>-- Seleccione --</option>
            <option value='ahorro'>Ahorro</option>
            <option value='comida'>Comida</option>
            <option value='casa'>Casa</option>
            <option value='gastos'>Gastos varios</option>
            <option value='ocio'>Ocio</option>
            <option value='salud'>Salud</option>
            <option value='suscripciones'>Suscripciones</option>
          </select>
        </div>
        <input
          type='submit'
          value={(Object.keys(gastoEditar).length !== 0 ? 'Editar' : 'Añadir') + ' Gasto'}
        />
      </form>
    </div>
  )
}
 
export default Modal