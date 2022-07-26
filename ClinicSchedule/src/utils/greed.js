function convertTime(time) {
    let hora = time.split(":")[0];
    let minuto = time.split(":")[1];
    let hora_minuto = parseInt(hora) * 60 + parseInt(minuto);
    return hora_minuto;
}

function convertdata(data) {
    const Size = data.length;
    let dados = [];
    for (let i = 0; i < Size; i++) {
        dados.push({
            "dateStart": convertTime(data[i].dateStart),
            "dateEnd": convertTime(data[i].dateEnd),
            "user": data[i].user,
            "timeSchedule": convertTime(data[i].timeSchedule)
        });
    }
    Sortbydedline(dados);
    return dados;
}

function Sortbydedline(dados) {
    dados.sort(function (a, b) {
        return new Date(a.dateEnd) - new Date(b.dateEnd);
    });
}

function greed(dados) {
    let exemplo = convertdata(dados)
    let Size = exemplo.length;
    let result = [];
    let t = 0;
    let aux = {};
    for (let j = 0; j < Size; j++) {
        if (t > exemplo[j].dateStart) {
            aux = {
                "dateStart": t,
                "dateEnd": t + exemplo[j].timeSchedule,
                "user": exemplo[j].user,
            }
            t = t + exemplo[j].timeSchedule;
            result.push(aux);
        } else {
            t = exemplo[j].dateStart;
            aux = {
                "dateStart": t,
                "dateEnd": t + exemplo[j].timeSchedule,
                "user": exemplo[j].user,
            }
            t = t + exemplo[j].timeSchedule;
            result.push(aux);
        }
    }
    return returntimes(result);
}

function returntimes(result) {
    let Size = result.length;
    for (let i = 0; i < Size; i++) {
        result[i].dateStart = String(Math.floor(result[i].dateStart / 60) + ":" + ('0' + result[i].dateStart % 60).slice(-2));
        result[i].dateEnd = String(Math.floor(result[i].dateEnd / 60) + ":" + ('0' + result[i].dateEnd % 60).slice(-2));
    }
    return result;
}

export { greed}