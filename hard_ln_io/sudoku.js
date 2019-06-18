var font_size_global=2.5;
var empty_global="&nbsp;&nbsp;";
var td_no_global='';
var state_count_global=0;

function sudoku_h2(){
    var oh2=document.getElementById('h2_title');
    if (oh2){
        oh2.innerHTML='KL Sudoku <span class="fmini" style="font-weight:300;">Ver: 0.0.2-20190615</span> <span id="span_state" class="fmini" style="font-weight:300;"></span>';
    }
    //history
    //0.0.2-20190615
    //0.0.1-20140111
}

function tdbackground(csid){
    if (td_no_global!==''){
        var otd=document.getElementById(td_no_global);
        if (otd){
            otd.style.backgroundColor='white';
        }
        //取消选中 - 保留注释
        if (csid==td_no_global){
            td_no_global='';
            return;
        }
    }
    
    var otd=document.getElementById(csid);
    if (otd){
        otd.style.backgroundColor='tomato';
        td_no_global=csid;
    }
}

function inputvalue(csvalue){
    if (td_no_global!==''){
        var otd=document.getElementById(td_no_global);
        if (otd){
            otd.innerHTML=csvalue;
        }
    }
}

function getvalue(csnumber){
    if (csnumber < 0 || csnumber >= sudoku_data_global.length){
        return [];
    }
    var list_t = sudoku_data_global[csnumber].split("");
    for (var blxl=0;blxl<list_t.length;blxl++){
        if (list_t[blxl]=='0'){
            var oinput=document.getElementById('input_'+blxl);
            if (oinput && oinput.innerHTML.trim()!==empty_global){
                list_t[blxl]=oinput.innerHTML;
            }
        }
    }
    return list_t;
}

function select_value(csstr,csno,csvalue){
    var list_t=csstr.split(",");
    list_t[csno]=csvalue;
    var bljg=branchs(list_t.toString(),false);
    return bljg[0];
}

function one_result(csstr,csno,csvalue){
    var list_t=csstr.split(",");
    list_t[csno]=csvalue;
    var blvalue=check_sudoku(list_t);
    if (blvalue[0]==false){
        return [];
    }
    var bljg=[];

    while (true){
        var result_t=possible_values(list_t);
        var found=false;

        for (var item of result_t){
            if (item[2].length==1){
                list_t[item[0]*9+item[1]*1]=item[2][0];
                bljg.push([item[0]*9+item[1]*1,item[2][0]]);
                found=true;
            }
        }

        var blvalue=check_sudoku(list_t);
        if (blvalue[0]==false){
            return [];
        }
        
        if (found==false){
            break;
        }
    }
    return bljg;
}

function fill_sudoku(csnumber){
    state_count_global=0;
    var list_t=getvalue(csnumber);
    var tmp_t=branchs(list_t.toString());
    if (tmp_t[0]==false){
        return tmp_t;
    }
    //console.log(tmp_t[1]);
    for (var blxl=0;blxl<81;blxl++){
        if (tmp_t[1][blxl]=="0"){continue;}
        var oinput=document.getElementById('input_'+blxl);
        if (oinput){
            oinput.innerHTML=tmp_t[1][blxl];
        }
    }
    for (var item of tmp_t[2]){
        console.log(item[0],item[1],item[2]);
    }
    document.getElementById('span_state').innerHTML='调用 branchs(): '+state_count_global+' 次';
}

function possible_values(list_t){
    //不改变list_t值，直接传递list_t - 保留注释
    var result_t=[];
    for (var blxl=0;blxl<81;blxl++){
        var item=list_t[blxl];
        if (item!=='0'){
            continue;
        }
        var blrow=Math.ceil((blxl+1)/9)-1;
        var blcol=(blxl+1)%9;
        if (blcol==0){blcol=9;}
        blcol=blcol-1;
        //横向 - 保留注释
        var arow=[];
        for (var blc=0;blc<9;blc++){
            if (list_t[blrow*9+blc]=='0'){continue;}
            arow.push(list_t[blrow*9+blc]);
        }
        //纵向 - 保留注释
        var acol=[];
        for (var blr=0;blr<9;blr++){
            if (list_t[blcol+blr*9]=='0'){continue;}
            acol.push(list_t[blcol+blr*9]);
        }
        if (blrow<3){
            var blockx=0;
        }
        else if (blrow<6){
            var blockx=3;
        }
        else {
            var blockx=6;
        }
        
        if (blcol<3){
            var blocky=0;
        }
        else if (blcol<6){
            var blocky=3;
        }
        else {
            var blocky=6;
        }
        var blocks=[];
        for (var blx=0;blx<3;blx++){
            for (var bly=0;bly<3;bly++){
                if (list_t[bly*9+blx+blockx*9+blocky]=='0'){continue;}
                blocks.push(list_t[bly*9+blx+blockx*9+blocky]);
            }
        }
        result_t.push([blrow,blcol,array_difference_b(["1","2","3","4","5","6","7","8","9"],array_unique_b(arow.concat(acol).concat(blocks)))]);
    }
    return result_t;
}

function branchs(csstr,do_select_value=true){
    state_count_global=state_count_global+1;
    var list_t=csstr.split(",");

    while (true){
        var blvalue=check_sudoku(list_t);
        if (blvalue[0]==false){
            //console.log(blvalue);
            return blvalue;
        }
        
        var result_t=possible_values(list_t);

        var found=false;
        console.log('1');
        //row 唯一 - 保留注释
        for (var blr=0;blr<9;blr++){
            var tmp_t=[];
            for (var blxl=0;blxl<=9;blxl++){
                tmp_t[blxl]=0;
            }
            for (var item of result_t){
                if (item[0]==blr){
                    for (var blnum of item[2]){
                        tmp_t[parseInt(blnum)]= tmp_t[parseInt(blnum)]+1;
                    }
                }
            }
            for (var blxl=0;blxl<=9;blxl++){
                if (tmp_t[blxl]==1){
                    for (var item of result_t){
                        if (item[0]==blr && item[2].includes(blxl.toString())){
                            list_t[item[0]*9+item[1]]=blxl.toString();
                            found=true;
                        }
                    }
                }
            }            
        }
        
        //col 唯一 - 保留注释
        for (var blc=0;blc<9;blc++){
            var tmp_t=[];
            for (var blxl=0;blxl<=9;blxl++){
                tmp_t[blxl]=0;
            }
            for (var item of result_t){
                if (item[1]==blc){
                    for (var blnum of item[2]){
                        tmp_t[parseInt(blnum)]= tmp_t[parseInt(blnum)]+1;
                    }
                }
            }
            for (var blxl=0;blxl<=9;blxl++){
                if (tmp_t[blxl]==1){
                    for (var item of result_t){
                        if (item[1]==blc && item[2].includes(blxl.toString())){
                            list_t[item[0]*9+item[1]]=blxl.toString();
                            found=true;
                        }
                    }
                }
            }            
        }       
       
        //block 唯一 - 保留注释
        for (var blr=0;blr<3;blr++){
            for (var blc=0;blc<3;blc++){
                var tmp_t=[];
                for (var blxl=0;blxl<=9;blxl++){
                    tmp_t[blxl]=0;
                }          
                  
                for (var item of result_t){
                    if (item[0]>=blr*3 && item[0]<(blr+1)*3 && item[1]>=blc*3 && item[1]<(blc+1)*3){
                        for (var blnum of item[2]){
                            tmp_t[parseInt(blnum)]= tmp_t[parseInt(blnum)]+1;
                        }
                    }
                }
                for (var blxl=0;blxl<=9;blxl++){
                    if (tmp_t[blxl]==1){
                        for (var item of result_t){
                            if (item[0]>=blr*3 && item[0]<(blr+1)*3 && item[1]>=blc*3 && item[1]<(blc+1)*3 && item[2].includes(blxl.toString())){
                                list_t[item[0]*9+item[1]]=blxl.toString();
                                found=true;
                            }
                        }
                    }
                }      
            }      
        }        
        
        if (found){
            continue;
        }
        
        console.log('2.1');
        
        for (var item of result_t){
            if (item[2].length==1){
                list_t[item[0]*9+item[1]*1]=item[2][0];
                found=true;
            }
        }

        if (found){
            continue;
        }
        
        console.log('2.2');
        for (var item of result_t){
            if (item[2].length==2){
                var value1=one_result(list_t.toString(),item[0]*9+item[1],item[2][0]);
                var value2=one_result(list_t.toString(),item[0]*9+item[1],item[2][1]);
                if (value1.length<1 || value2.length<1){continue;}
                for (var array1 of value1){
                    for (var array2 of value2){
                        if (array1[0]==array2[0] && array1[1]==array2[1]){
                            list_t[array1[0]]=array1[1];
                            found=true;
                        }
                    }
                }
            }
        }
        
        if (found){
            continue;
        }        
        
        console.log('2.3');
        for (var item of result_t){
            if (item[2].length==3){
                var value1=one_result(list_t.toString(),item[0]*9+item[1],item[2][0]);
                var value2=one_result(list_t.toString(),item[0]*9+item[1],item[2][1]);
                var value3=one_result(list_t.toString(),item[0]*9+item[1],item[2][2]);
                if (value1.length<1 || value2.length<1 || value3.length<1){continue;}
                for (var array1 of value1){
                    for (var array2 of value2){
                        for (var array3 of value3){
                            if (array1[0]==array2[0] && array1[0]==array3[0] && array1[1]==array2[1] && array1[1]==array3[1]){
                                list_t[array1[0]]=array1[1];
                                found=true;
                            }
                        }
                    }
                }
            }
        }
        
        if (found){
            continue;
        }
        
        console.log('2.4');
        for (var item of result_t){
            if (item[2].length==4){
                var value1=one_result(list_t.toString(),item[0]*9+item[1],item[2][0]);
                var value2=one_result(list_t.toString(),item[0]*9+item[1],item[2][1]);
                var value3=one_result(list_t.toString(),item[0]*9+item[1],item[2][2]);
                var value4=one_result(list_t.toString(),item[0]*9+item[1],item[2][3]);
                if (value1.length<1 || value2.length<1 || value3.length<1 || value4.length<1){continue;}
                for (var array1 of value1){
                    for (var array2 of value2){
                        for (var array3 of value3){
                            for (var array4 of value4){
                                if (array1[0]==array2[0] && array1[0]==array3[0] && array1[0]==array4[0] && array1[1]==array2[1] && array1[1]==array3[1] && array1[1]==array4[1]){
                                    list_t[array1[0]]=array1[1];
                                    found=true;
                                }
                            }
                        }
                    }
                }
            }
        }

        if (found){
            continue;
        }

        //select_value
        if (do_select_value){
            console.log('3.2');
            for (var item of result_t){
                if (item[2].length==2){
                    var value1=select_value(list_t.toString(),item[0]*9+item[1],item[2][0]);
                    var value2=select_value(list_t.toString(),item[0]*9+item[1],item[2][1]);
                    if (value1==true && value2==false){
                        list_t[item[0]*9+item[1]]=item[2][0];
                        found=true;
                    }
                    else if (value1==false && value2==true){
                        list_t[item[0]*9+item[1]]=item[2][1];
                        found=true;
                    }
                    else if (value1==false && value2==false){
                        return [false,item.toString()];
                    }                    
                }
            }
            
            if (found){
                continue;
            }
            
            console.log('3.3');
            
            for (var item of result_t){
                if (item[2].length==3){
                    var value1=select_value(list_t.toString(),item[0]*9+item[1],item[2][0]);
                    var value2=select_value(list_t.toString(),item[0]*9+item[1],item[2][1]);
                    var value3=select_value(list_t.toString(),item[0]*9+item[1],item[2][2]);
                    if (value1==true && value2==false && value3==false){
                        list_t[item[0]*9+item[1]]=item[2][0];
                        found=true;
                    }
                    else if (value1==false && value2==true && value3==false){
                        list_t[item[0]*9+item[1]]=item[2][1];
                        found=true;
                    }
                    else if (value1==false && value2==false && value3==true){
                        list_t[item[0]*9+item[1]]=item[2][2];
                        found=true;
                    }
                    else if (value1==false && value2==false && value3==false){
                        return [false,item.toString()];
                    }                     
                }
            }
        }
        
        if (found==false){
            break;
        }
    }

    return [true,list_t,result_t];
}

function check_sudoku(list_t){
    if (list_t.length<81){return [false,'81'];}
    //横向 - 保留注释
    for (var blrow=0;blrow<9;blrow++){
        var arow=[];
        for (var blcol=0;blcol<9;blcol++){
            if (list_t[blrow*9+blcol]=='0'){continue;}
            arow.push(list_t[blrow*9+blcol]);
        }
        var arowlen=arow.length;
        arow=array_unique_b(arow);
        if (arow.length<arowlen){return [false,'row'+(blrow+1)];}
        arow=array_unique_b(array_union_b(arow,["1","2","3","4","5","6","7","8","9"]));
        if (arow.length>9){
            return [false,'row'+(blrow+1)];
        }
    }
    //纵向 - 保留注释
    for (var blcol=0;blcol<9;blcol++){
        var acol=[];
        for (var blrow=0;blrow<9;blrow++){
            if (list_t[blcol+blrow*9]=='0'){continue;}
            acol.push(list_t[blcol+blrow*9]);
        }
        var acollen=acol.length;
        acol=array_unique_b(acol);
        if (acol.length<acollen){return [false,'col'+(blcol+1)];}
        acol=array_unique_b(array_union_b(acol,["1","2","3","4","5","6","7","8","9"]));
        if (acol.length>9){
            return [false,'col'+(blcol+1)];
        }
    }
    //block - 保留注释
    for (var blx=0;blx<3;blx++){
        for (var bly=0;bly<3;bly++){
            var arow=[];
            for (var blrow=0;blrow<3;blrow++){
                for (var blcol=0;blcol<3;blcol++){
                    if (list_t[bly*3*9+blx*3+blrow*9+blcol]=='0'){continue;}
                    arow.push(list_t[bly*3*9+blx*3+blrow*9+blcol]);
                }
            }
            var arowlen=arow.length;
            arow=array_unique_b(arow);
            if (arow.length<arowlen){return [false,'xy,'+(blx+1)+','+(bly+1)];}
            arow=array_unique_b(array_union_b(arow,["1","2","3","4","5","6","7","8","9"]));
            if (arow.length>9){
                return [false,'xy,'+(blx+1)+','+(bly+1)];
            }
        }
    }
    return [true,''];
}

function generate_sudoku(){

}

function input_range(){
    var bljg = "";
    bljg='<input type="range" min=1 max='+sudoku_data_global.length+' value=1 id="sudoku_range" style="width:20rem;" oninput="javascript:document.getElementById(\'a_no\').innerHTML=\'第 \'+this.value+\' 题\';" onchange="javascript:show_sudoku(this.value-1);"> ';
    bljg=bljg+'<a href="javascript:void(null);" id="a_no" onclick="javascript:show_sudoku(parseInt(this.innerText.split(\' \')[1])-1);">第 1 题</a>';

    document.getElementById("klsudokuno").innerHTML = '<p align=center>'+bljg+'</p>';
}

function rnd_sudoku(){
    var rndnumber=randint_b(0,sudoku_data_global.length-1);
    document.getElementById('sudoku_range').value=rndnumber+1;
    document.getElementById('a_no').innerHTML='第 '+(rndnumber+1)+' 题';
    show_sudoku(rndnumber);
}

function show_sudoku(csnumber){
	if (csnumber < 0 || csnumber >= sudoku_data_global.length){return;}
    td_no_global='';

	var blys = sudoku_data_global[csnumber];
	var blarray = blys.split("");
	var blstr = '<table class="table_sudoku" align=center width=1 border=0 cellspacing="0" cellpadding="0">';
	var bltmp;
	var blstyle;
    var border_style="0.1rem black solid;";
	for (var blxl in blarray){
		if (blxl%9 == 0){blstr = blstr + '<tr>';}
		bltmp = blarray[blxl];
		if (bltmp == "0") {bltmp = empty_global;}
        blstyle='';
		if (blxl >= 27 && blxl <= 35 || blxl == 3 || blxl == 4 || blxl == 5){
			blstyle = blstyle + "border-top:"+border_style;
		}
		if (blxl >= 45 && blxl <= 53 || blxl == 75 || blxl == 76 || blxl == 77){
			blstyle = blstyle + "border-bottom:"+border_style;
		}
		if ((blxl+1-4)%9 == 0 || blxl == 27 || blxl == 36 || blxl == 45){
			blstyle = blstyle + "border-left:"+border_style;
		}		
		if ((blxl+1-6)%9 == 0 || blxl == 35 || blxl == 44 || blxl == 53){
			blstyle = blstyle + "border-right:"+border_style;
		}
        if (blarray[blxl]!=="0"){
            blstr = blstr + '<td width=1 nowrap align=center style="'+blstyle+'background-color:#e0e0e0;">'+bltmp+'</td>';
        }
        else {
		    blstr = blstr + '<td width=1 id="input_'+blxl+'" nowrap align=center style="'+blstyle+'color:blue;" onclick="javascript:tdbackground(this.id);">'+bltmp+'</td>';
        }
		if (blxl%9 == 8){blstr = blstr + '</tr>'}
	}
    blstr=blstr+'<tr><td colspan=9 align=center style="border:0;font-size:'+(font_size_global-0.5)+'rem;">';
    blstr=blstr + "<a href=\"javascript:void(null);\" onclick=\"javascript:fill_sudoku("+csnumber+")\">答案</a>";
    blstr=blstr+'</td></tr>';
    
    blstr=blstr+'<tr><td colspan=9 style="border:0;">';
    blstr=blstr+'<table width=100% border=0 cellspacing="0" cellpadding="0" class="table_select"><tr>';
    
    blstr=blstr+'<td align=center onclick="javascript:inputvalue(empty_global);">↪️</td>';
    for (var blxl=1;blxl<=9;blxl++){
        blstr=blstr+'<td align=center onclick="javascript:inputvalue(this.innerHTML);">'+blxl+'</td>';
    }
    blstr=blstr+'</tr></table>';    
    blstr=blstr+'</td></tr>';
    
    blstr = blstr + '</table>';

	var bldiv = document.getElementById("klsudoku");
	bldiv.innerHTML = blstr;
    document.getElementById('span_state').innerHTML='';
}

function sudoku_style(){
    document.write('\n<style>\n');
    document.write("h2{margin:0rem;font-size:"+(font_size_global-1)+"rem;}");
    document.write(".table_sudoku td{font-weight:600;border:0.1rem #e0e0e0 solid;padding:0rem 0.95rem;font-size:"+font_size_global+"rem;cursor:pointer;}");
    document.write(".table_select td{font-weight:600;border:0;padding:0rem 0.5rem;font-size:"+(font_size_global+0.3)+"rem;color:tomato;background-color:pink;cursor:pointer;}");
    document.write('#a_no{font-size:'+(font_size_global-0.5)+'rem;border:0.2rem solid #c0c0c0;-webkit-border-radius: 1rem; padding:0.1rem 0.5rem;margin:0rem 0.1rem;text-decoration:none;}');
    document.write('\n</style>\n');
}
