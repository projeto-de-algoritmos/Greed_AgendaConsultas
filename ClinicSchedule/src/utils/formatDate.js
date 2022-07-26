const formatDate = (data) => {
    let date = new Date(data)
    date = String(date);
    const array = date.split(" ");
    const time = array[4].substr(0, 5);
    return time;
}


export {formatDate}