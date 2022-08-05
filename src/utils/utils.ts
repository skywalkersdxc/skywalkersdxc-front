export const convertDate = (date: string) => {
    const today = new Date(date);
    let hours = today.getHours()
    let amOrPm = hours > 12 ? " am" : " pm"
    hours = (hours % 12) || 12
    let minutes = today.getMinutes() === 0 ? "00" : today.getMinutes()
    const time = hours + ":" + minutes + amOrPm;
    return time
}

export const timeTravelDiff = (departure: string, arrival: string) => {
    const depTime = new Date(departure).getTime()
    const arrTime = new Date(arrival).getTime()
    const timeDiff = Math.floor((arrTime - depTime) / 1000)
    let minutes = Math.floor(timeDiff / 60);
    let hours = Math.floor(minutes / 60);
    hours = hours % 24;
    minutes = minutes % 60;
    return `${hours ? hours + "h" : ""} ${minutes ? minutes + "m" : "" }`
}