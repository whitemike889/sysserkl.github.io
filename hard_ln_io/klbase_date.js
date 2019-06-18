//csver:0.0.1-20190125
function day_of_year_b(theday){
	var csnum=arguments.length;
	if (csnum<1){var theday = new Date();}
    return Math.ceil((theday - new Date(theday.getFullYear(),0,1)) / 86400000);
}

function next_month_b(csstr){
    //2018-11
    var list_t=csstr.split('-');
    if (list_t.length!==2){return '';}
    var blyear=parseInt(list_t[0]);
    var blmonth=parseInt(list_t[1]);
    if (blmonth<12){return blyear+'-'+('0'+(blmonth+1)).slice(-2);}
    else {
        return (blyear+1)+'-01';
    }
}

function today_str_b(sep='-'){
    var theday=new Date();
    return theday.getFullYear()+sep+('0'+(theday.getMonth()+1)).slice(-2)+sep+('0'+(theday.getDate())).slice(-2);
}

function day_2_week_b(csstr=''){
    //2018-05-28
    if (csstr==''){
        var theday=new Date();
    }
    else {
        var theday=validdate_b(csstr);
    }
    if (theday==false){return '';}
    return '星期'+['日','一','二','三','四','五','六'][theday.getDay()];
}

function next_day_b(csstr=''){
    //2018-05-28
    if (csstr==''){
        var theday=new Date();
    }
    else {
        var theday=validdate_b(csstr);
    }
    if (theday==false){return '';}
    theday.setTime(theday.getTime()+24*60*60*1000);
	var bljg=theday.getFullYear()+'-'+('0'+(theday.getMonth()+1)).slice(-2)+'-'+('0'+(theday.getDate())).slice(-2);

    return bljg;
}

function previous_day_b(csstr=''){
    //2018-05-28
    if (csstr==''){
        var theday=new Date();
    }
    else {    
        var theday=validdate_b(csstr);
    }
    if (theday==false){return '';}
    theday.setTime(theday.getTime()-24*60*60*1000);
	var bljg=theday.getFullYear()+'-'+('0'+(theday.getMonth()+1)).slice(-2)+'-'+('0'+(theday.getDate())).slice(-2);
    return bljg;
}

function month_day_b(csmonth=0,csyear=0){
    //返回指定月份天数
	var date1_tmp=new Date();
    if (csmonth<=0){
        csmonth=date1_tmp.getMonth()+1;
    }
    csmonth=Math.min(12,Math.max(csmonth,1));
    if (csyear==0){
	    csyear=date1_tmp.getFullYear();
    }
    var list_t=[31,28,31,30,31,30,31,31,30,31,30,31];
    var bljg=list_t[csmonth-1];
    if (csmonth==2 && isLeapYear_b(csyear)){bljg=bljg+1;}
    return bljg;
}
function validdate_b(datestr,first_day_of_month=false){
	if (datestr.length==8 && datestr.indexOf('-')==-1){
		datestr=datestr.slice(0,4)+'-'+datestr.slice(4,6)+'-'+datestr.slice(-2);
	}
    if (datestr.length==6 && datestr.indexOf('-')==-1){
        var blyear=datestr.slice(0,4);
        var blmonth=datestr.slice(4,6);
        if (first_day_of_month){
            datestr=blyear+'-'+blmonth+'-01';
        }
        else {
            datestr=blyear+'-'+blmonth+'-'+month_day_b(parseInt(blmonth),parseInt(blyear));
        }
    }
    if (datestr.length==7){
        var blyear=datestr.slice(0,4);
        var blmonth=datestr.slice(-2);
        if (first_day_of_month){
            datestr=blyear+'-'+blmonth+'-01';
        }
        else {
            datestr=blyear+'-'+blmonth+'-'+month_day_b(parseInt(blmonth),parseInt(blyear));
        }
    }
    
	var datetmp=new Date(datestr);
	if ( Object.prototype.toString.call(datetmp) === "[object Date]" ) {
		if ( isNaN( datetmp.getTime() ) ) {return false;}
		else {return datetmp;}
	}
	else { return false;}
}
function months_b(csmonth=0,csyear=0){
    //返回指定年份1月至指定月份的累计天数
    if (csmonth==0){return 0;}
    csmonth=Math.min(12,Math.max(csmonth,1));
	var date1_tmp=new Date();
    if (csmonth<=0){
        csmonth=date1_tmp.getMonth()+1;
    }
    if (csyear==0){
	    csyear=date1_tmp.getFullYear();
    }

	var list_t=[31,28,31,30,31,30,31,31,30,31,30,31];
    var bljg=0;
    for (var blxl=0;blxl<csmonth;blxl++){
        bljg=bljg+list_t[blxl];
    }
    if (csmonth>=2 && isLeapYear_b(csyear)){bljg=bljg+1;}
    return bljg;
}
function isLeapYear_b (csyear) {
    if (csyear % 4==0 && csyear % 100!=0 || csyear % 400==0) {
        return true;
    } 
    return false;
}
