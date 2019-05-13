var Caculate_MeanCenter=function (data) {
    var X_Mean,Y_Mean;
    //var mean_0=0,mean_1=0,mean_2=0,mean_3=0,mean_4=0,mean_5=0,mean_6=0,mean_7=0,mean_8=0,mean_9=0,mean_10=0,mean_11=0,mean_12=0,mean_13=0,mean_14=0,mean_15=0,mean_16=0,mean_17=0,mean_18=0,mean_19=0,mean_20=0,mean_21=0,mean_22=0,mean_23=0;
    var xSum=[];
    var ySum=[];
    var num=[]
    var result=[];
    for(let i=0;i<4;i++){
        xSum[i]=0;
        ySum[i]=0;
        num[i]=0;

    }
    for(let i=0;i<data.length;i++) {
        switch (data[i].properties.Time) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                xSum[0]=xSum[0]+data[i].geometry.coordinates[1];
                ySum[0]=ySum[0]+data[i].geometry.coordinates[0];
                num[0]=num[0]+1;
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                xSum[1]=xSum[1]+data[i].geometry.coordinates[1];
                ySum[1]=ySum[1]+data[i].geometry.coordinates[0];
                num[1]=num[1]+1;
                break;
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17:
                xSum[2]=xSum[2]+data[i].geometry.coordinates[1];
                ySum[2]=ySum[2]+data[i].geometry.coordinates[0];
                num[2]=num[2]+1;
                break;
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
            case 23:
                xSum[3]=xSum[3]+data[i].geometry.coordinates[1];
                ySum[3]=ySum[3]+data[i].geometry.coordinates[0];
                num[3]=num[3]+1;
                break;

        }

    }

    for(let i=0;i<4;i++){
        result[i]={xMean:xSum[i]/num[i],yMean:ySum[i]/num[i]};
    }

    return result;

}

module.exports=Caculate_MeanCenter;