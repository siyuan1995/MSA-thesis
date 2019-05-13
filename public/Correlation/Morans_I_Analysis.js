
var Moran_Indicator=function (crime_data,SpatialWeight_workbook) {
    var first_sheet_name = SpatialWeight_workbook.SheetNames[0];
    var worksheet = SpatialWeight_workbook.Sheets[first_sheet_name];
    console.log(worksheet);

    var N=crime_data.children.length;
    var S0=68;//EiEjWij
    var sumZ=0;
    var sumZ4=0;
    var sum=0;
    var A=0,B=0,C=0,D=0,EI=0,EI2=0,S1=0,S2=0,VI=0,Z=0;

    for(let i=0;i<crime_data.children.length;i++){

        sum=sum+crime_data.children[i].frequency
    }
    var X_mean=sum/17;



    for(let i=0;i<crime_data.children.length;i++){
        sumZ=sumZ+Math.pow((crime_data.children[i].frequency-X_mean),2);
    }//Ei(Xi-Xba)2

    for(let i=0;i<crime_data.children.length;i++){
        sumZ4=sumZ4+Math.pow((crime_data.children[i].frequency-X_mean),4);
    }

    var DD=[];
    for(let i=0;i<crime_data.children.length;i++){
        DD[i]=crime_data.children[i].frequency-X_mean;
    }

    var EiEjWij=0;
    var arr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'];

    for(let i=0;i<17;i++){
        let m=arr[i].toString();
        for(let j=1;j<18;j++){
            if(worksheet[m+j]){
                let num;
                switch (m){
                    case 'A':
                        num=0;
                        break;
                    case 'B':
                        num=1;
                        break;
                    case 'C':
                        num=2;
                        break;
                    case 'D':
                        num=3;
                        break;
                    case 'E':
                        num=4;
                        break;
                    case 'F':
                        num=5;
                        break;
                    case 'G':
                        num=6;
                        break;
                    case 'H':
                        num=7;
                        break;
                    case 'I':
                        num=8;
                        break;
                    case 'J':
                        num=9;
                        break;
                    case 'K':
                        num=10;
                        break;
                    case 'L':
                        num=11;
                        break;
                    case 'M':
                        num=12;
                        break;
                    case 'N':
                        num=13;
                        break;
                    case 'O':
                        num=14;
                        break;
                    case 'P':
                        num=15;
                        break;
                    case 'Q':
                        num=16;
                        break;
                }


                EiEjWij=EiEjWij+DD[num]*DD[j-1];
            }
        }
    }

    var Moran_indicator=N/68*EiEjWij/sumZ;

    A=N*((Math.pow(N,2)-3*N+3)*S1-N*S2+3*Math.pow(S0,2));
    D=sumZ4/Math.pow(sumZ,2);
    B=D*((Math.pow(N,2)-N)*S1-2*N*S2+6*Math.pow(S0,2));
    C=(N-1)*(N-2)*(N-3)*Math.pow(S0,2);
    EI=-1/(N-1);
    EI2=(A-B)/C;
    S1=68*2;
    S2=Math.pow(8,2)+Math.pow(12,2)+Math.pow(10,2)+Math.pow(8,2)+Math.pow(6,2)+Math.pow(6,2)+Math.pow(14,2)+Math.pow(8,2)+Math.pow(6,2)
        +Math.pow(6,2)+Math.pow(6,2)+Math.pow(6,2)+Math.pow(10,2)+Math.pow(10,2)+Math.pow(10,2)+Math.pow(6,2)+Math.pow(4,2);
    VI=Math.sqrt(EI2-Math.pow(EI,2));

    Z=(Moran_indicator-EI)/VI;




    console.log('MoranI I:'+Moran_indicator);
    console.log('Z score:'+Z);
    console.log('EI:'+EI);
    console.log('VI:'+VI);
    console.log('A:'+A);
    console.log('B:'+B);
    console.log('C:'+C);
    console.log('D:'+D);
    console.log('S2:'+S2);
    console.log('EI2:'+EI2)
    console.log('EI2-Math.pow(EI,2):'+  (Math.sqrt(EI2-Math.pow(EI,2))))


    return JSON.stringify({Morans_I_indictor:Moran_indicator,Z_score:Z});




}

module.exports=Moran_Indicator;
