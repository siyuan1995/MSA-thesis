var divide_data=function(data){
    var arr=[]
    for (let i=0;i<17;i++){
        arr[i]=new Array();
    }
    for(let i=0;i<data.length;i++){
        switch(data[i].properties.Division)
        {
            case 'D11':
                arr[0].push(data[i]);
                break;
            case 'D12':
                arr[1].push(data[i]);
                break;
            case 'D13':
                arr[2].push(data[i]);
                break;
            case 'D14':
                arr[3].push(data[i]);
                break;
            case 'D51':
                arr[4].push(data[i]);
                break;
            case 'D52':
                arr[5].push(data[i]);
                break;
            case 'D53':
                arr[6].push(data[i]);
                break;
            case 'D54':
                arr[7].push(data[i]);
                break;
            case 'D55':
                arr[8].push(data[i]);
                break;
            case 'D22':
                arr[9].push(data[i]);
                break;
            case 'D23':
                arr[10].push(data[i]);
                break;
            case 'D31':
                arr[11].push(data[i]);
                break;
            case 'D32':
                arr[12].push(data[i]);
                break;
            case 'D33':
                arr[13].push(data[i]);
                break;
            case 'D41':
                arr[14].push(data[i]);
                break;
            case 'D42':
                arr[15].push(data[i]);
                break;
            case 'D43':
                arr[16].push(data[i]);
                break;

        }

    }

    return arr;

}

module.exports=divide_data;