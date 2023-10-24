export const generateId = () => {
  return crypto.randomUUID()
}

export const formatDate = date => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  })
}