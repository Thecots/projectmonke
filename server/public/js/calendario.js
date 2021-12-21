const monthName = ['Ene','Feb','Mar','Abr','May','Jun',"Jul","Ago","sept","Oct","Nov","Dic"];  
var date = new Date();

function clalendario(month, year){
    if(month == 13){ month = 1; year += 1;}
    if(month == 0){month = 12; year -= 1;}
    let x = daysInMonth(month, year),f = daysInMonth(month-1, year),h = fisrtDay(month, year),todayDay = date.getDate(), todayMonth =(date.getMonth()+1), todayYear =date.getFullYear();
    let template = `
    <div class="controler_"><img src="img/arrow.svg" onclick="clalendario('${(month-1)}',${year})"><h1>${year}</h1><img src="img/arrow.svg" onclick="clalendario(${(month+1)},${year})"></div><div class="data months_">`;
    for (let i = 0; i < 12; i++) {        
        template += `
            <p ${month == i+1 ?  'class="today"' : ''} onclick="skipMonth(${monthName[i]},${year})" id="${monthName[i]}">${monthName[i]}</p>
        `;
    }
    template += `</div><div class="week days"><div class="day"><h1>LUN</h1></div><div class="day"><h1>MAR</h1></div><div class="day"><h1>MIE</h1></div><div class="day"><h1>JUE</h1></div><div class="day"><h1>VIE</h1></div><div class="day"><h1>SAB</h1></div><div class="day"><h1>DOM</h1></div></div>`;
    document.querySelector('.month').innerHTML = template;
    h = h == 0 ? 7: h;
    let semana = '<div class="week">', indexDate = 0;
    for(let i = 1; i <= x; i++){
        if(h > 1){
            semana += dayBox(f-(h-2),'x');
            h--;
            if(h == 1){i = 0;}
        }else{
            if(i <= x){
                if(i == todayDay && month == todayMonth && year == todayYear){
                    semana += dayBox(i,false);
                }else{
                    semana += dayBox(i);
                }
            }
        }
        if(indexDate == 6){
            document.querySelector('.month').innerHTML += '</div>'+semana;
            semana = '<div class="week">';
            indexDate = -1;
        }else if(i == x){
            for (let r = 0; r < (6-indexDate); r++) {
                semana += dayBox((r+1),true);
            }
            document.querySelector('.month').innerHTML += '</div>'+semana;
            semana = '<div class="week">';
            indexDate -= -1;
        }
        indexDate++;
    };    
    function daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }  
    function fisrtDay(month, year){
        return new Date(year + "-" + month + "-01").getDay();
    }

    /* IMPORTANTE */
    function dayBox(e,t){
        let g = j ='';
        if(t == true){
            g = 'outOfMonth';
            j = `onclick="clalendario(${(month+1)},${year})"`;
        }else if(t == false){
            g = 'today';
        }else if(t == 'x'){
            /* IMPORTANTE */
            g = 'outOfMonth';
            j = `onclick="clalendario(${(month-1)},${year})"`;
        }
        return `
        <div class="day ${g}" ${j}>
            <div  class="number">${e}</div>
            <div class="rutinas"></div>
        </div>
        `;
    }
}




/* Start here */
clalendario((date.getMonth()+1),date.getFullYear());


function skipMonth(e,i){
    clalendario((monthName.findIndex(n=> n == e.id)+1),i)
}