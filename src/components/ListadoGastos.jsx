import { Fragment } from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
  return (  
    <div className='listado-gastos contenedor'>
      { filtro ? (
          <Fragment>
            <h2>{ gastosFiltrados.length ? 'Gastos' : 'No hay Gastos filtrados' }</h2>
            { gastosFiltrados.map( gasto => (
                <Gasto 
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                />
              ))
            }
          </Fragment>
          
        ) : (
          <Fragment>
            <h2>{ gastos.length ? 'Gastos' : 'No hay Gastos aun' }</h2>
            { gastos.map( gasto => (
                <Gasto 
                  key={gasto.id}
                  gasto={gasto}
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
                /> 
              )) 
            }
          </Fragment>
        )
      }
    </div>
  )
}
 
export default ListadoGastos