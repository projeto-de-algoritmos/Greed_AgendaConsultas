let dados_exemplo = [
    {
        "start": "08:00",
        "dedline": "10:30",
        "Name": "Fernanda",
        "deltaT": "1:30"
    },
    {
        "start": "08:30",
        "dedline": "11:30",
        "Name": "Maria",
        "deltaT": "1:00"
    },
    {
        "start": "07:00",
        "dedline": "10:10",
        "Name": "Luis",
        "deltaT": "1:10"
    },
    {
        "start": "09:00",
        "dedline": "12:30",
        "Name": "Arthur",
        "deltaT": "1:20"
    },
    {
        "start": "16:00",
        "dedline": "20:30",
        "Name": "Jose",
        "deltaT": "1:20"
    },
    {
        "start": "15:00",
        "dedline": "16:30",
        "Name": "Airton",
        "deltaT": "1:50"
    },
    {
        "start": "16:10",
        "dedline": "17:30",
        "Name": "Olaf",
        "deltaT": "2:10"
    },

]

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
            "start": convertTime(data[i].start),
            "dedline": convertTime(data[i].dedline),
            "Name": data[i].Name,
            "deltaT": convertTime(data[i].deltaT)
        });
    }
    Sortbydedline(dados);
    return dados;
}

function Sortbydedline(dados) {
    dados.sort(function (a, b) {
        return new Date(a.dedline) - new Date(b.dedline);
    });
}

function greed(dados) {
    exemplo = convertdata(dados)
    console.table(exemplo)
    let Size = exemplo.length;
    let result = [];
    let t = 0;
    let aux = {};
    for (let j = 0; j < Size; j++) {
        if (t > exemplo[j].start) {
            aux = {
                "start": t,
                "end": t + exemplo[j].deltaT,
                "Name": exemplo[j].Name,
            }
            t = t + exemplo[j].deltaT;
            result.push(aux);
        } else {
            t = exemplo[j].start;
            aux = {
                "start": t,
                "end": t + exemplo[j].deltaT,
                "Name": exemplo[j].Name,
            }
            t = t + exemplo[j].deltaT;
            result.push(aux);
        }
    }
    return result;
}

function returntimes(result) {
    let Size = result.length;
    for (let i = 0; i < Size; i++) {
        result[i].start = Math.floor(result[i].start / 60) + ":" + ('0' + result[i].start % 60).slice(-2);
        result[i].end = Math.floor(result[i].end / 60) + ":" + ('0' + result[i].end % 60).slice(-2);
    }
    return result;
}


export { greed, returntimes }