const addHoursToADate = (dateParam:Date,hoursParam:number) => {
    const date = new Date(dateParam); // April 1, 2023 at 12:00:00 UTC
    const hoursToAdd = hoursParam;

    date.setHours(date.getHours() + hoursToAdd);

    return date.toISOString();
}

const getCurrentTimeAndDate = () => {
    const fechaActual = new Date();

    return fechaActual;
}

const compareDates = (endDate:Date,startDate:Date) => {
    return endDate > startDate ? true : false ;

}

const formatDate = (date:string) => {
    return new Date(date);
}

export {
    addHoursToADate,
    getCurrentTimeAndDate,
    compareDates,
    formatDate
}