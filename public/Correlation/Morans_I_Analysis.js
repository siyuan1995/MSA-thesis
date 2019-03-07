//var xlsx=require('xlsx');

var Moran_Indicator=function (crime_data,SpatialWeight_workbook) {
    var first_sheet_name = SpatialWeight_workbook.SheetNames[0];
    var worksheet = SpatialWeight_workbook.Sheets[first_sheet_name];

    var N=crime_data.children.length;
    var S0=68;//EiEjWij
    var sumZ=0;
    var sum=0;

    for(let i=0;i<crime_data.children.length;i++){

        sum=sum+crime_data.children[i].frequency
    }
    var X_mean=sum/17;



    for(let i=0;i<crime_data.children.length;i++){
        sumZ=sumZ+Math.pow((crime_data.children[i].frequency-X_mean),2);
    }//Ei(Xi-Xba)2

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
    console.log(Moran_indicator);


}

module.exports=Moran_Indicator;
