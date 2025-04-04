function formatDate(date) {
    const [day, month, year] = date.split('/').map(Number)

    const newDate = new Date(year, month - 1, day)

    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return newDate.toLocaleDateString('es-ES', options)
}

export default formatDate