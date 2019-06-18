function css_root_style(pcsize="16",mobilesize="30"){
    var usera=navigator.userAgent.toLowerCase();
    document.write("\n<style>\n");
    if (usera.indexOf('android')>=0 || usera.indexOf('mobile')>=0){
        document.write(":root {font-size:"+mobilesize+"px;}\n");
        document.write("section {font-size:"+(parseInt(mobilesize)+20)+"px;line-height:150%;}\n");
        document.write("input[type=checkbox] {-moz-transform: scale(3); -webkit-transform: scale(3); margin:25px;}\n");
        document.write("input[type=radio] {-moz-transform: scale(3); -webkit-transform: scale(3); margin:25px;}\n");
        
    }
    else{
        document.write(":root {font-size:"+pcsize+"px;}\n");
        document.write("section {font-size:"+pcsize+"px;line-height:200%;}\n");
    }
    document.write("</style>\n");
}

function css_select_b(cslen=4,cstype='pc'){
    if (cstype=='mobile'){
        return "font-size:1.1rem;width:"+(1.3*cslen)+"em;min-height:1.1rem;";
    }
    return "width:"+(cslen+2)+"em;";
}

function css_checkbox_b(csscale=2,cstype='pc'){
    if (cstype=='mobile'){
        return "-moz-transform: scale("+csscale+"); -webkit-transform: scale("+csscale+");margin-right:1rem;";
    }
    return '';
}

function css_input_text_b(cslen=10,cstype='pc',csexpand=2){
    if (cstype=='mobile'){
        return "width: "+(cslen*1)+"rem; border:0px; border-bottom:2px solid #939598;font-size:1.25rem;padding:2px 5px; vertical-align:text-bottom;";
    }
    else {
        if (cslen>10){
            cslen=cslen+cslen/csexpand;
        }
        return "width: "+(cslen)+"rem;border: 0px; border-bottom:1px solid #939598;font-size:1.25rem;padding:2px 5px; vertical-align:text-bottom;";
    }
    
}

function checkbox_kl_b(csid,cscaption,cstitle="",selected=false,jsstr=''){
    if (selected){
        var blc='blue';
        var blchecked=' checked';
    }
    else {
        var blc='grey';
         var blchecked='';
    }    
    var bljg='';
    bljg=bljg+'<span id="'+csid+'" style="cursor:pointer;color:'+blc+'" title="'+cstitle+'" onclick=\'javascript:checkbox_kl_color_b("'+csid+'");'+jsstr+'\'>';
    bljg=bljg+'<input name="checkbox_'+csid+'" id="checkbox_'+csid+'" type="checkbox" style="display:none;" ';
    bljg=bljg+blchecked+'>';
    bljg=bljg+'✔ '+cscaption+'</span>';
    return bljg;
}

function checkbox_kl_color_b(csid,setvalue=-1){
    var obj=document.getElementById(csid);
    if (obj){
        var ocheck=obj.getElementsByTagName('input')[0];
        if (ocheck){
            if (setvalue==-1){
                if (obj.style.color=='grey'){
                    obj.style.color='blue';
                    ocheck.checked=true;
                }
                else {
                    obj.style.color='grey';
                    ocheck.checked=false;
                }
            }
            else if (setvalue==1 || setvalue==true) {
                obj.style.color='blue';
                ocheck.checked=true;
            }
            else if (setvalue==0 || setvalue==false) {
                obj.style.color='grey';
                ocheck.checked=false;
            }
        }
    }
}

function checkbox_kl_value_b(csid){
    var obj=document.getElementById(csid);
    if (obj){
        var ocheck=obj.getElementsByTagName('input')[0];
        if (ocheck){
            return ocheck.checked;
        }
        //if (obj.style.color=='grey'){
            //return false;
            ////ocheck.checked=true;
        //}
        //else {
            //return true;
            ////ocheck.checked=false;
        //}        
    }
    return false;
}

function klmenu_b(csarray,menu_name='',min_width='',button_fontsize='',item_fontsize="",max_height='',cstitle=''){
    // csarray links <a href="#">Link 1</a>
    if (menu_name==''){menu_name='☰';}
    if (min_width==''){min_width='10rem';}
    if (button_fontsize==""){button_fontsize="1.2rem";}
    if (item_fontsize==''){item_fontsize='1.2rem';}
    if (max_height==''){max_height='40rem';}
    
    var bljg='<div class="klmenu"><button style="font-size:'+button_fontsize+';" onclick="javascript:if(this.parentNode.getElementsByTagName(\'div\')[0].style.display==\'block\'){this.parentNode.getElementsByTagName(\'div\')[0].style.display=\'none\';}else {this.parentNode.getElementsByTagName(\'div\')[0].style.display=\'block\';}" title="'+cstitle+'">'+menu_name+'</button><div style="display:none;min-width: '+min_width+';max-height:'+max_height+';overflow:scroll;overflow-y:auto;overflow-x:auto;">';
    for (let item of csarray){
        bljg=bljg+'<span style="font-size:'+item_fontsize+';">'+item+'</span>\n';
    }
    bljg=bljg+'</div></div>';
    return bljg;
}

function klmenu_hide_b(csname=''){
    if (csname==""){
        return "this.parentNode.parentNode.style.display='none';";
    }
    return "this.parentNode.parentNode.style.display='none';document.location.href = '"+csname+"';";
}

function klmenu_multi_button_div_b(csstr,cstyle='',cspadding='',csmargin='',csid=''){
    if (cstyle==''){
        cstyle='inline-block';
    }
    if (cspadding==''){    
        cspadding='0rem 0.5rem';
    }
    if (csmargin==''){    
        csmargin='0';
    }    
    var menu_str='<div ';
    if (csid!==''){
        menu_str=menu_str+'id="'+csid+'" ';
    }
    menu_str=menu_str+'style="background-color:#f0f0f0;display: '+cstyle+';padding:'+cspadding+';margin:'+csmargin+';">';
    menu_str=menu_str+csstr;
    menu_str=menu_str+'</div>';
    return menu_str;
}

function popup_show_hide_b(csid,cstype='block') {
  if (document.getElementById(csid).style.display==cstype){
      document.getElementById(csid).style.display='none';
      return;
  }
  document.getElementById(csid).style.display=cstype;
}

function popup_b(csid,cscontent='',csfontsize='',cswidth='',csdisplay='none',csposition='absolute'){
    if (csfontsize==''){
        csfontsize='1rem';
    }
    if (cswidth==''){
        cswidth='auto';
    }
    var bljg='<div id="'+csid+'" style="position:'+csposition+';display:'+csdisplay+';margin-left:0.05rem;margin-top:0.5rem;padding:1rem; border:0.1rem solid #c0c0c0;-webkit-border-radius: 1rem; -webkit-box-shadow: 0.3rem 0.3rem 0.3rem #c0c0c0;word-break:break-all;word-wrap:break-word;background-color:#f0f0f0;font-size:'+csfontsize+';max-width:'+cswidth+';z-index: 1;">'+cscontent+'</div>';
    return bljg;
}

function top_bottom_arrow_b(idname,cseng=false){
    var odiv=document.getElementById(idname);
    if (odiv){ 
        var fszie_t='1.3rem';
        var usera=navigator.userAgent.toLowerCase();
        if (usera.includes('android') || usera.includes('mobile')){
            var fszie_t='2.3rem';
        }
        var bljg='<span onclick="javascript:window.scrollTo(0,0);" style="cursor:pointer;">T↑</span> ';
        bljg=bljg+'<span onclick="javascript:window.scrollTo(0,document.body.scrollHeight);" style="cursor:pointer;">B↓</span> ';
		if (cseng || document.getElementsByClassName('sup.kleng').length>0){
            bljg=bljg+'<span style="cursor:pointer;" onclick="javascript:sup_kleng_hide_b();" title="单词显示切换">E</span> ';
        }
        bljg=bljg+'<span onclick="javascript:document.getElementById(\''+idname+'\').parentNode.removeChild(document.getElementById(\''+idname+'\'));" style="cursor:pointer;">x</span> ';
        odiv.innerHTML=bljg;
        odiv.style.cssText='position:fixed; bottom:0%; right:0%; z-index:9999; color:black; font-size:'+fszie_t+';padding:0 0.5rem; margin:0;background-color:#c0c0c0;opacity:0.4;font-weight:600;';
    }
}
