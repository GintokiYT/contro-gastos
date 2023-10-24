import { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto }) => {

  const [ disponible, setDisponible ] = useState(0)
  const [ gastado, setGastado ] = useState(0)
  const [ porcentaje, setPorcentaje ] = useState(0)

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const handleResetApp = () => {
    const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?')
    if(resultado) {
      setPresupuesto(0)
      setGastos([])
      setIsValidPresupuesto(false)
    } 
  }

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => total + gasto.cantidad , 0)
    setGastado(totalGastado)
    const totalDisponible = presupuesto - totalGastado
    setDisponible(totalDisponible)
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 500)
  }, [gastos])

  return (  
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar 
          styles={buildStyles({
            pathColor: 
              porcentaje >= 100 
              ? '#dc3545' 
              : porcentaje >= 50 
              ? '#ffc107' 
              : '#3b82f6',
            trailColor: '#f5f5f5',
            textColor: 
              porcentaje >= 100 
              ? '#dc3545' 
              : porcentaje >= 50 
              ? '#ffc107' 
              : '#3b82f6'
          })}
          value={porcentaje}
          text={porcentaje + '% Gastado'}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button 
          className='reset-app' 
          type='button'
          onClick={handleResetApp}
        >Resetear App</button>
        <p>
          <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
        </p>
        <p className={ disponible < 0 ? 'negativo' : '' }>
          <span>Disponible: </span>{formatearCantidad(disponible)}
        </p>
        <p>
          <span>Gastado: </span>{formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}
 
export default ControlPresupuesto