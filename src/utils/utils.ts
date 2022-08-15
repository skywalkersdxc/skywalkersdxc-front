export const convertDate = (date: string) => {
    const today = new Date(date);
    console.log(today, 'today');
    if(today.toDateString() === "Invalid Date") {
        return "Invalid Date"
    }
    let hours = today.getHours()
    let amOrPm = hours > 12 ? " am" : " pm"
    hours = (hours % 12) || 12
    let minutes = today.getMinutes() === 0 ? "00" : today.getMinutes()
    const time = minutes.toString().length === 1 ? `${hours}:0${minutes}${amOrPm}` : `${hours}:${minutes}${amOrPm}` 
    console.log(time);
    return time
}

export const timeTravelDiff = (departure: string, arrival: string) => {
    const depTime = new Date(departure)
    const arrTime = new Date(arrival)
    if(depTime.toDateString() === "Invalid Date" || arrTime.toDateString() === "Invalid Date") {
        return "Invalid Date"
    }
    const timeDiff = Math.floor((arrTime.getTime() - depTime.getTime()) / 1000)
    let minutes = Math.floor(timeDiff / 60);
    let hours = Math.floor(minutes / 60);
    hours = hours % 24;
    minutes = minutes % 60;
    return `${hours ? hours + "h" : ""} ${minutes ? minutes + "m" : "" }`
}