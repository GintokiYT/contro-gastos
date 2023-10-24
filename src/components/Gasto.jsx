import { formatDate } from '../helpers/index'

import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import IconoAhorro from '../assets/icono_ahorro.svg'
import IconoCasa from '../assets/icono_casa.svg'
import IconoComida from '../assets/icono_comida.svg'
import IconoGastos from '../assets/icono_gastos.svg'
import IconoOcio from '../assets/icono_ocio.svg'
import IconoSalud from '../assets/icono_salud.svg'
import IconoSuscripciones from '../assets/icono_suscripciones.svg'

const diccionarioIcons = {
  'ahorro': IconoAhorro,
  'casa': IconoCasa,
  'comida': IconoComida,
  'gastos': IconoGastos,
  'ocio': IconoOcio,
  'salud': IconoSalud,
  'suscripciones': IconoSuscripciones
}

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={() => setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )
  
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction 
        onClick={() => eliminarGasto(gasto.id)}
        destructive={true}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  )

  return (  
    <SwipeableList> 
      <SwipeableListItem 
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra'>
          <div className='contenido-gasto'>
            <img src={ diccionarioIcons[gasto.categoria] } alt='icon gastos' />
            <div className='descripcion-gasto'>
              <p className='categoria'>
                { gasto.categoria }
              </p>
              <p className='nombre-gasto'>
                { gasto.nombre }
              </p>
              <p className='fecha-gasto'>
                Agregado el: { '' }
                <span>{formatDate(gasto.fecha)}</span>
              </p>
            </div>
          </div>
          <p className='cantidad-gasto'>${gasto.cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
 
export default Gasto