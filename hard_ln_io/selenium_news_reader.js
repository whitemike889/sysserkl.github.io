function mobile_style(){
    var mobile_t='\n<style>\n';
    mobile_t=mobile_t+'#divhtml {margin:0px 0.5rem;}\n';
    mobile_t=mobile_t+'sup.sup_sele_en {font-size:0.2rem;color:black;border-bottom:0.3rem #92addb solid;}\n';    
    mobile_t=mobile_t+'</style>\n';

	var pc_t='\n<style>\n';
	pc_t=pc_t+'#divhtml {margin-left:'+(parseInt(document.body.clientWidth)*0.5)/2+'px; max-width:'+Math.max(700,(parseInt(document.body.clientWidth)*0.5))+'px;}\n';
    pc_t=pc_t+'sup.sup_sele_en {font-size:0.8rem;color:black;border-bottom:3px #92addb solid;}\n';
	pc_t=pc_t+'</style>\n';
	mobile_b(mobile_t, pc_t);
}
function batch_open(op){
    if (op){
        var oas=op.getElementsByTagName('a');
        var blxl=0;
        for (var one_a of oas){
            var href_str=one_a.getAttribute('href');
            if (href_str){
                window.open(href_str);
                blxl=blxl+1;
                if (blxl>=20){break;}
            }
        }
    }
}

function sitecompare(list_all,list_exist,csdays){
    if (list_all.length==0 || list_exist.length==0 || csdays==0){
        return;
    }
    var odiv=document.getElementById('divhtml');
    var bljg='';
    var list_0=[];
    if (list_exist.length>0){
        for (let item_t of list_exist){
            if (item_t.length<3){continue;}
            list_0.push(item_t[0]);
        }
    }
    var list_all0=[];
    for (let item_t of list_all){
        list_all0.push(item_t[1]);
    }
    var result_t=array_difference_b(list_all0,list_0);
    result_t.sort(function (a,b){return zh_sort_b(a,b);});
    for (let item_t of result_t){
        for (let www of list_all){
            if (item_t==www[1]){
                bljg=bljg+'<li><a href="'+www[0]+'" target=_blank>'+www[1]+'</a></li>\n';
            }
        }
    }
    if (bljg!==''){
        bljg='<h3>最近'+csdays+'天未更新的网站</h3><ol>'+bljg+'</ol>';
    }

    var statistics_t=[];

    for (let item_t of list_exist){
        if (item_t.length<3){continue;}
        if (statistics_t[item_t[0]]==null){
            statistics_t[item_t[0]]=[item_t[0],0,0];
        }
        statistics_t[item_t[0]][1]=statistics_t[item_t[0]][1]+1;
        statistics_t[item_t[0]][2]=statistics_t[item_t[0]][2]+item_t[2];
        
    }
    result_t=[];
    for (var blxl in statistics_t){
        result_t.push(statistics_t[blxl]);
    }
    result_t.sort(function (a,b){
        if (a[1]==b[1]){return a[2]-b[2];}
        else {return a[1]-b[1];}
    });

    var bljg2='';
    for (var blxl=0;blxl<result_t.length;blxl++){
        bljg2=bljg2+'<tr class="odd">';
        var foundname=false;
        for (www of list_all){
            if (www[1]==result_t[blxl][0]){
                bljg2=bljg2+'<td class="blackline1">'+(blxl+1)+'. <a href="'+www[0]+'" target=_blank>'+result_t[blxl][0]+'</a></td>';
                foundname=true;
                break;
            }
        }
        if (foundname==false){
            bljg2=bljg2+'<td class="blackline1">'+(blxl+1)+'. '+result_t[blxl][0]+'</td>';
        }
        bljg2=bljg2+'<td align=right class="blackline1">'+result_t[blxl][1]+'</td>';
        bljg2=bljg2+'<td align=right class="blackline1">'+result_t[blxl][2]+'</td>';
        bljg2=bljg2+'</tr>';
    }
    if (bljg2!==''){
        bljg2='<h3>网站更新频率</h3><table><tr><th align=center class="blackline2">网站</th><th align=center class="blackline2">更新次数</th><th align=center class="blackline2">更新条数</th></tr>'+bljg2+'</table>';
    }
    if (bljg!=='' && bljg2!==''){
        odiv.innerHTML='<table style="margin-top:15px;padding:10px;"><tr><td valign=top>'+bljg+'</td><td valign=top>'+bljg2+'</td></tr></table>';
    }
    else {
        odiv.innerHTML=bljg+bljg2;
    }
}

function sort_keys(cskeys='',cstype=0){
    if (cskeys==""){
	var focus_list=document.getElementById('abr').value.split(',');
    }
    else {
	var focus_list=cskeys.split(',');
    }
    focus_list.sort();
    focus_list = Array.from(new Set(focus_list));
    if (cstype==1){
	var str_t='';
	for (var bly in focus_list){
	    if (focus_list[bly].trim()==''){continue;}
	    str_t=str_t+focus_list[bly].trim()+',';
	}
	document.getElementById('abr').value=str_t;
    }
    return focus_list;
}

function newwords(){
    if (document.getElementById('div_newwords').innerHTML!==''){
        document.getElementById('div_newwords').innerHTML='';
        return;
    }
    var enwords_temp=[];
    for (var blxl=0;blxl<enwords.length;blxl++){
        enwords_temp.push(enwords[blxl][0].toLowerCase());
        enwords_temp.push(enwords[blxl][0].toLowerCase()+'d');
        enwords_temp.push(enwords[blxl][0].toLowerCase()+'ed');
        enwords_temp.push(enwords[blxl][0].toLowerCase()+'s');
        enwords_temp.push(enwords[blxl][0].toLowerCase()+'es');
        enwords_temp.push(enwords[blxl][0].toLowerCase()+'ing');
    }

    var bljg='';
    for (var blxl in sourcelist){
	    bljg=bljg+sourcelist[blxl][1];
    }
    var list_t=bljg.match(/\b[a-zA-Z\-]+\b/g);
    var list2_t=[];
    for (var blxl in list_t){
        var str_t=list_t[blxl].toLowerCase();
        if (str_t.length<=1){continue;}
        if (enwords_temp.includes(str_t)){continue;}
        if (list2_t[str_t]==null){list2_t[str_t]=[str_t,0];}
        list2_t[str_t][1]=list2_t[str_t][1]+1;
    }
    var list_t=[];
    for (var blxl in list2_t){
        list_t.push(list2_t[blxl]);
    }
    list_t.sort(function (a,b){return b[1]-a[1];});
    var blxl=0;
    var bljg='';
    for (var bly in list_t){
        bljg=bljg+list_t[bly][0]+' ('+list_t[bly][1]+') ';
        blxl=blxl+1;
        if (blxl>300){break;}
    }
    document.getElementById('div_newwords').innerHTML='<p style="font-size:1rem;">'+bljg+'</p>';
}

function statistics_sites(){
    if (document.getElementById('div_sitesname').innerHTML!==''){
        document.getElementById('div_sitesname').innerHTML='';
        return;
    }
    var sites_count_t=[];
    for (var blxl in sourcelist){
	var site_name_t=sourcelist[blxl][3];
	if (sites_count_t[site_name_t]==null){
	     sites_count_t[site_name_t]=[site_name_t,0];
	}
	sites_count_t[site_name_t][1]=sites_count_t[site_name_t][1]+1;
    }
    var sites_count2_t=[];
    for (var blxl in sites_count_t){
	sites_count2_t.push(sites_count_t[blxl]);
    }
    sites_count2_t.sort(function (a,b){return a[0].localeCompare(b[0],"zh");});
    
    var bljg='0. <span onclick=\'javascript:getlines();\' style="cursor:pointer;">全部</span>('+sourcelist.length+') ';
    for (var blxl in sites_count2_t){
	bljg=bljg+(parseInt(blxl)+1)+'. <span onclick=\'javascript:getlines(1,50,"'+sites_count2_t[blxl][0]+'");\' style="cursor:pointer;">'+sites_count2_t[blxl][0]+'</span>('+sites_count2_t[blxl][1]+') ';
    }
    document.getElementById('div_sitesname').innerHTML='<p>'+bljg+'</p>';
}

function showhide(){
	var odiv=document.getElementById("div_show_hide");
	if (odiv.style.display=='none'){odiv.style.display='block';}
	else {odiv.style.display='none';}
}
function open_all_more(){
    var oas=document.querySelectorAll('p[id^="p_more_"] a');
    for (var blxl=0;blxl<oas.length;blxl++){
        oas[blxl].click();
    }
}

function weibo_at(cssite,csstr){
    if (cssite.includes('weibo.com')){
        csstr=csstr.replace(new RegExp(/@([^# 【】《》@]+?)([：: ，])/,'g'),'<a href="http://weibo.com/n/$1" target=_blank>@$1</a>$2');
        
        csstr=csstr.replace(new RegExp(/(\s?)(https?:\/\/t\.cn\/[^\s]*)(\s?)/,'g'),'$1<a href="$2" target=_blank>$2</a>$3');

        csstr=csstr.replace(new RegExp(/#([^@【】《》#]+?)#/,'g'),'<a href="https://s.weibo.com/weibo?q=%23$1%23" target=_blank>#$1#</a>');
        
        csstr=csstr.replace(new RegExp(/《([^#@《》]+?)》/,'g'),'<b>《$1》</b>');
        csstr=csstr.replace(new RegExp(/【([^#@【】]+?)】/,'g'),'<b>【$1】</b>');     
        csstr=csstr.replace(new RegExp('O网页链接','g'),' ');
        csstr=csstr.replace(new RegExp('展开全文c','g'),' ');
        csstr=csstr.replace(new RegExp(/\d+  \d+ ñ\d+/,'g'),' ');
        csstr=csstr.replace(new RegExp(/^(\d?\d?:?\d?\d?)\s?来自 (微博 weibo.com|iPhone 6s|[^\s]*\s)/,'g'),'$1 ');
    }
    return csstr;
}

function longtxts(cslist,addsitename=false){
    var str_t='<a href="'+cslist[0]+'" target=_blank style="text-decoration:none;" title="'+cslist[2]+' '+cslist[0]+'" class="a_news_link">';
    
    var title_t=specialstr_lt_gt_j(cslist[1].trim());
    //替换英文字母边的中文引号为英文引号 - 保留注释
    title_t=title_t.replace(new RegExp(/([a-zA-Z])’/,'g'),'$1&#39;');
    title_t=title_t.replace(new RegExp(/‘([a-zA-Z])/,'g'),'&#39;$1');
    if (title_t.length>150 || cslist[0].includes("://weibo.com/")){
        var at_t=title_t.indexOf(' ');
        if (at_t<=10){
            at_t=15;
        }
        str_t=str_t+title_t.substring(0,at_t);
        str_t=str_t+'</a>';
        str_t=str_t+weibo_at(cslist[0], title_t.substring(at_t,));
        if (addsitename){
            str_t=str_t+' - '+cslist[3];
        }        
    }
    else {
        str_t=str_t+title_t;
        if (addsitename){
            str_t=str_t+' - '+cslist[3];
        }        
        str_t=str_t+'</a>';
    }
    return str_t;
}

function classify_sites(bottom_eng=false){
    function sub_classify_sites_link(bly,blxl){
        var str_t='<p ';
        if (bly % 2 == 1){
            str_t=str_t+'style="padding:0.5rem;font-size:1rem;background-color:#efefef;"';
        }
        else {
            str_t=str_t+'style="padding:0.5rem;font-size:1rem;"';
        }
        str_t=str_t+'>'+bly+'. '+longtxts(selected_list[blxl]);
        str_t=str_t+'</p>';
        return str_t;
    }
    function sub_classify_sites_head(divstyle,blno,cstotal,thetag,str_t,more_t,bly){
        var bljg='<div class="div_masonry" style="'+divstyle+'"><a name="a_site_num_'+blno+'"></a><p style="padding:0.5rem;font-weight:600;font-size:1rem;">'+blno+'/'+cstotal+'. '+thetag+' ('+(bly-1)+')'+'</p>';
        bljg=bljg+str_t;
        if (more_t!==''){
            var divid_t='div_more_'+blno;
            bljg=bljg+'<p id="p_more_'+blno+'"><a href="javascript:void(null);" onclick=\'javascript:document.getElementById("'+divid_t+'").style.display="block";document.getElementById("p_more_'+blno+'").style.display="none";masonrydiv();\'>more...</a></p>';
            bljg=bljg+'<div id="'+divid_t+'" style="display:none;">'+more_t+'</div>';
        }
        bljg=bljg+'</div>';
        return bljg;
    }
    //--------------------------------------------
    var selected_list=filter_list();
    //形如 - 保留注释：
    //[ "https://www.theverge.com/2019/3/23/18278557/apple-iphone-11-wireless-charging-other-devices-airpods-watch-rumor", "Apple’s next iPhone might be able to wirelessly charge other devices", "2019-03-25", "Apple next iPhone might be able to wirelessly charge other devices", "The Verge" ]
    //以下两行排序必要 - 保留注释
    selected_list.sort(function (a,b){return sort_by_date_b(a,b,true,2,1,false,true);});
    selected_list.sort(function (a,b){
        return a[3].localeCompare(b[3],"zh");
    });

    var thetag='';
    var str_t='';
    var more_t='';
    var bly=1;
    var bljg_list=[];
    var date_t = new Date(); 
    //var today_t=date_t.getDate();
    var key_html_t=document.getElementById('span_search_key').innerHTML;
    var dividednum_list=key_html_t.match(/\d/g);
    if (dividednum_list){
        var today_t=asc_sum_b(dividednum_list.join());
    }
    else {
        var today_t=asc_sum_b(key_html_t);
    }
    if (bottom_eng && today_t % 5 ==0){
        bottom_eng=false;
    }
    //else {
        //bottom_eng=true;
    //}
    today_t=100+today_t%31; //如果+1，而不是+100，则出现后面的整除后都余0的情况
    var usera=navigator.userAgent.toLowerCase();
	if (usera.includes('android') || usera.includes('mobile')){
		var divstyle='padding:0rem; margin:0.2rem 0rem; border:2px dashed #c0c0c0;';
	}
    else {
        var divstyle='padding:0rem;margin:0.5rem 0rem; border:2px dashed #c0c0c0;word-break:break-all;word-wrap:break-word;';
        //保留注释：position:relative;float:left;max-width:330px;
    }
    //var blno=1;   
    
    for (var blxl=0;blxl<selected_list.length;blxl++){
        if (thetag==''){thetag=selected_list[blxl][3];}
        if (thetag!==selected_list[blxl][3]){
            bljg_list.push([asc_sum_b(thetag)%today_t,thetag,str_t,more_t,bly]);
            
            //console.log(thetag,asc_sum_b(thetag),today_t,asc_sum_b(thetag)%today_t); - 保留注释
            
            str_t='';
            more_t='';
            bly=1;
            thetag=selected_list[blxl][3];
            //blno=blno+1;
        }
        if (bly<=20){
            str_t=str_t+sub_classify_sites_link(bly,blxl);
        }
        else {
            more_t=more_t+sub_classify_sites_link(bly,blxl);
        }
        bly=bly+1;
    }

    if (str_t!==''){
        bljg_list.push([asc_sum_b(thetag)%today_t,thetag,str_t,more_t,bly]);
    }
    var odivhtml=document.getElementById('divhtml')
    if (odivhtml){
        odivhtml.innerHTML='';
    }
	var odiv2=document.getElementById('divhtml2');
    
    var bljg='';
    //bljg_list 中的一个元素形如：
    //[ 1, "豆瓣", "<p style=\"line-height:120%;font-size:1rem;\">1. <a href=\"https://www.douban.com/event/31952137/\" target=_blank style=\"text-decoration:none;\" title=\"2019-03-25 https://www.douban.com/event/31952137/\" class=\"a_news_link\">由废墟再出发 I&#39;d Rather Struggle</a></p>", "", 2 ]
    //分别是：排序分数，网站名，前20条内容，第21条开始的内容，显示序号
    // bljg_list.sort(function (a,b){return zh_sort_b(a,b,false,1);}); - 保留注释
    if (bottom_eng){
        var maxnum=0;
        for (var item of bljg_list){
            maxnum=Math.max(maxnum,item[0]);
        }
        //console.log(maxnum);
        var removestr='[”“’‘„–—‒…‚・⨯]';
        for (var blxl in bljg_list){
            //标题中含有中文 - 保留注释
            if ((bljg_list[blxl][1].replace(new RegExp(removestr,'g'),'').trim().match(/[^\x00-\xff]/) || []).length>0){
                continue;
            }
            //第一条记录中含有中文数量少于2个 - 保留注释
            if ((bljg_list[blxl][2].split('</p>')[0].trim().replace(new RegExp(removestr,'g'),'').match(/[^\x00-\xff]/g) || []).length<=1){
                bljg_list[blxl][0]=bljg_list[blxl][0]+maxnum;
            }
            //以下四行保留注释
            //else {
                //console.log(bljg_list[blxl][0],bljg_list[blxl][1],bljg_list[blxl][1].replace(new RegExp(removestr,'g'),'').trim().match(/[^\x00-\xff]/));
                //console.log(bljg_list[blxl][2].split('</p>')[0].trim().replace(new RegExp(removestr,'g'),'').match(/[^\x00-\xff]/g));
            //}
        }
    }
    bljg_list.sort(function (a,b){return a[0]-b[0];});
    var a_site_num_links='';
    for (var blxl=0;blxl<bljg_list.length;blxl++){
        if (blxl % 10 == 0){
            bljg=bljg+'<div class="div_masonry" style="width:100%;"><h3>第 '+(1+blxl/10)+' 部分</h3></div>';
        }
        
        bljg=bljg+sub_classify_sites_head(divstyle,blxl+1,bljg_list.length,bljg_list[blxl][1],bljg_list[blxl][2],bljg_list[blxl][3],bljg_list[blxl][4]);
 
        a_site_num_links=a_site_num_links+'<option value="#a_site_num_'+(blxl+1)+'">'+(blxl+1)+'. '+bljg_list[blxl][1]+'</option>';
        //第n部分 增加标签分组 - ToDo
    }
    //console.log(bljg_list);
    odiv2.innerHTML='<div class="div_masonry" style="'+divstyle+'"><select onchange="document.location.href = this.value;">'+a_site_num_links+'</select>'+' <a id="a_open_all" href="javascript:void(null);" onclick=\'javascript:this.style.display="none";open_all_more();\' class="aclick">全部展开</a></div>'+bljg;
    masonrydiv();
    
    //enwords----
    words_translate();
    //----
    document.location.href = "#content";
}

function words_translate(){
    var oinput_enwords=document.getElementById('input_enwords');
    if (!oinput_enwords){
        return;
    }
    if (checkbox_kl_value_b('input_enwords')){
    //if (oinput_enwords.checked){
        var enwords_temp=[];
        var enwords_temp_no=[];
        for (var blxl=0;blxl<enwords.length;blxl++){
            if (enwords_easy.includes(enwords[blxl][0].toLowerCase())){
                continue;
            }
            enwords_temp.push(enwords[blxl][0].toLowerCase());
            enwords_temp_no.push(blxl);
        }
        var odiv2as=document.querySelectorAll('a.a_news_link');
        //console.log(odiv2as.length,enwords.length,enwords_temp_no.length,enwords_temp.length);
        var bltotal=0;
        for (var blxl=odiv2as.length-1;blxl>=0;blxl--){
            //单词总数控制 - 保留注释
            if (bltotal>50){break;}
            var str_t=odiv2as[blxl].innerText;
            if (str_t){
                list_t=str_t.match(/\b[a-zA-Z]+\b/g);
                //数量控制 - 保留注释
                if (list_t==null || list_t.length<6){
                    continue;
                }
                //var list_t=str_t.split(' ');
                var bly=0;
                for (var blx in list_t){
                    if (list_t[blx]=='' || enwords_easy.includes(list_t[blx]) || enwords_easy.includes(list_t[blx].toLowerCase())){continue;}
                    
                    var at_t=enwords_temp.indexOf(list_t[blx].toLowerCase());
                    if (at_t>=0) {
                        odiv2as[blxl].innerHTML=odiv2as[blxl].innerHTML.replace(new RegExp(' '+list_t[blx]+' ',''),' '+list_t[blx]+'<sup class="sup_sele_en">('+enwords[enwords_temp_no[at_t]][1]+' '+enwords[enwords_temp_no[at_t]][2]+')</sup> ');
                        enwords_temp.splice(at_t,1);
                        enwords_temp_no.splice(at_t,1);
                        bly=bly+1;
                        bltotal=bltotal+1;
                        //数量控制 - 保留注释
                        if (bly>=1){break;}
                    }
               }
            }
        }
        masonrydiv();
        document.getElementById('label_translation').innerHTML='<span style="color:red;font-size:0.8rem;font-weight:300;">(已翻译)</span>';
    }
    else {
        document.getElementById('label_translation').innerHTML='';
    }
}

function masonrydiv(){
    var usera=navigator.userAgent.toLowerCase();
    if (usera.indexOf('android')<0 && usera.indexOf('mobile')<0){
        try {
            var msnry = new Masonry( document.getElementById('divhtml2'), {
              itemSelector: '.div_masonry',
              columnWidth: 200
            });
        }
        catch (error) {
            //do nothing
        }
    }
}

function filter_list(){
    function sub_filter_list_selected(){
        var selected_list=[];
        for (var blxl in sourcelist){
            selected_list.push(sourcelist[blxl]);
        }
        return selected_list;
    }
    //--------------------------
    var oinput_focus=document.getElementById('input_focus');
    if (!oinput_focus){
        return sub_filter_list_selected();
    }
    var focus=checkbox_kl_value_b('input_focus'); //oinput_focus.checked;
    var selected_list=[];
    if (focus){        
        var focus_list=sort_keys();
        for (var blxl in sourcelist){
            for (var bly in focus_list) {
		        if (focus_list[bly]==''){continue;}
                if (sourcelist[blxl][0].toLowerCase().includes(focus_list[bly]) || sourcelist[blxl][1].toLowerCase().includes(focus_list[bly])){
                    selected_list.push(sourcelist[blxl]);
                    break;
                }
            }
        }
    }
    else {
        return sub_filter_list_selected();
    }
    return selected_list;    
}
function getlines(csno=1,cslines=50,jssearchkey=''){
    var bljg='';
    var selected_list=filter_list();
    
    if (jssearchkey!==''){
	var selected_list2=[];
	for (var blxl in selected_list){
	    var blfound=str_reg_search_b(selected_list[blxl],jssearchkey.split(' '),false);
	    if (blfound==-1){
		    break;
	    }

	    if (blfound){
		selected_list2.push(selected_list[blxl]);
	    }
	}
	selected_list=selected_list2;
    }
    
    var bllength=selected_list.length;
    
	bljg=bljg+pages(csno,cslines,bllength,jssearchkey);

	for (var blxl=csno-1;blxl<csno+cslines-1;blxl++){
		if (blxl>=bllength){break;}
        if (blxl % 2==0) {
            bljg=bljg+'<p style="font-size:1.1rem;padding:0.2rem 0.5rem;">';
        }
        else {
            bljg=bljg+'<p style="font-size:1.1rem;background-color:#efefef;padding:0.2rem 0.5rem;">';
        }
        bljg=bljg+(blxl+1)+'. ';
        bljg=bljg+longtxts(selected_list[blxl],true);
        bljg=bljg+'</p>';
	}
	
	bljg=bljg+pages(csno,cslines,bllength,jssearchkey);
	
	document.getElementById('divhtml').innerHTML=bljg;
    document.getElementById('divhtml2').innerHTML='';
    document.getElementById('divhtml2').style.cssText='margin:0 0.5rem;';
    words_translate();
    
	document.location.href = "#content";
}

function pages(csno,cslines,bllength,jssearchkey){
    var bljg='<p align=right>';
    bljg=bljg+'<span style="cursor:pointer;" onclick=\'javascript:getlines(1,50,"'+jssearchkey+'");\'><b>第一页</b></span> · ';
    if (csno-cslines>=0){
	bljg=bljg+'<span style="cursor:pointer;" onclick=\'javascript:getlines('+(csno-cslines)+', '+cslines+',"'+jssearchkey+'");\'><b>上一页</b></span> · ';
    }
    if (csno+cslines<bllength){
	bljg=bljg+'<span style="cursor:pointer;" onclick=\'javascript:getlines('+(csno+cslines)+', '+cslines+',"'+jssearchkey+'");\'><b>下一页</b></span>';
    }
    return bljg+'</p>';
}

function dbc_list(cskeys,csshow_websites=false,csoneday=false){
    var bljg='';
    var dbc_count=selenium_dbc_global.length;
    if (dbc_count==1){
        var html_file='index.htm';
        var space_str='';
    }
    else {
        var html_file='selenium_news_reader_offline.htm';
        var space_str=' ';
    }
    for (var blxl=0;blxl<dbc_js_files.length;blxl++){
        var file_date=dbc_js_files[blxl];
        var file_date2=file_date;
        if (csoneday==false && blxl>0){
            if (dbc_js_files[blxl-1].substring(0,5)==file_date.substring(0,5)){
                file_date2=file_date2.substring(5,);
            }
        }
        if (dbc_count>1){
            if (cskeys.substring(0,10)==file_date){
                bljg=bljg+'<b>'+file_date2+': </b>';
            }
            else {
                if (csoneday){continue;}
                else{bljg=bljg+file_date2+': ';}
            }
        }
        for (let item of selenium_dbc_global){
            var str_t=file_date+'_'+item[0];
            if (dbc_count==1){
                var html_title=file_date2;
            }
            else {
                var html_title=item[1];
            }
            if (csshow_websites==false && cskeys.substring(0,10)==file_date && cskeys.split('_')[1]==item[0]){
                bljg=bljg+'<a href="'+html_file+'?day_dbf='+str_t+'"><font color=red><b>'+html_title+'</b></font></a>'+space_str;
            }
            else {
                bljg=bljg+'<a href="'+html_file+'?day_dbf='+str_t+'">'+html_title+'</a>'+space_str;
            }
        }

        bljg=bljg+' ';
    }
    document.getElementById('div_dbcname').innerHTML=bljg;
}

function dbc_list2(cskeys){
    //cskyes 形如 2019-05-30_www - 保留注释
    var list_t=[];
    var dbc_count=selenium_dbc_global.length;
    if (dbc_count==1){
        var html_file='index.htm';
    }
    else {
        var html_file='selenium_news_reader_offline.htm';
    }
    for (var file_date of  dbc_js_files){
        for (let item of selenium_dbc_global){
            var str_t=file_date+'_'+item[0];
            var html_title=item[1];
            var href_link=html_file+'?day_dbf='+str_t;
            if (item[0]=='www'){
                href_link=href_link+'&expand';
            }
            if (cskeys.substring(0,10)==file_date && cskeys.split('_')[1]==item[0]){
                list_t.push('<a href="'+href_link+'"><font color=red><b>'+file_date+' '+html_title+'</b></font></a>');
            }
            else {
                list_t.push('<a href="'+href_link+'">'+file_date+' '+html_title+'</a>');
            }
        }
    }
    return list_t;
}

function title_menu(cskeys,js_or_php=''){
    //cskyes 形如 2019-05-30_www - 保留注释
    var another_page='';
    if (js_or_php=='js'){
        another_page='<a href="selenium_news_reader.php">PHP版</a>';
    }
    else if (js_or_php=='php'){
        another_page='<a href="selenium_news_reader_offline.htm">离线版</a>';
    }
    var str_t=klmenu_hide_b('#content');
    var menu_list1=[
    another_page,
    '<a href="javascript:void(null);" onclick="javascript:'+str_t+'classify_sites();">按网站分类</a>',
    '<a href="javascript:void(null);" onclick="javascript:'+str_t+'classify_sites(true);">按网站分类(中上英下)</a>',    
    '<a href="javascript:void(null);" onclick="javascript:'+str_t+'sourcelist.sort(randomsort_b);getlines();">乱序</a>',
    '<a href="javascript:void(null);" onclick="javascript:'+str_t+'sourcelist.sort(function (a,b){return sort_by_date_b(a,b,true,2,1,false,true);});getlines();">按日期排序</a>',
    '<a href="javascript:void(null);" onclick="javascript:'+str_t+'sourcelist.sort(function (a,b){return zh_sort_b(a,b,false,1);});getlines();">按标题排序</a>',
    '<a href="javascript:void(null);" onclick="javascript:'+str_t+'statistics_sites();">当前页网站列表</a>',
    '<a href="javascript:void(null);" onclick="javascript:'+str_t+'newwords();">热门生词</a>',
    '<a href="javascript:void(null);" onclick="javascript:'+str_t+'sort_keys(original_keys_global,1);">默认关键字</a>',
    '<a href="selenium_news_reader_offline.htm?websites">网址库</a>',
    ];

    if (js_or_php=='php'){
        menu_list1.push('<a href="?dbf='+cskeys+'&countdays=30">最近30天更新统计</a>');
    }       

    var menu_list2='';
    if (js_or_php=='js' && cskeys!==''){
        menu_list2=dbc_list2(cskeys);
        return klmenu_multi_button_div_b(klmenu_b(menu_list1,'','12rem','1.2rem','1rem')+klmenu_b(menu_list2,'数据库','11rem','1.2rem','1rem','30rem'),'','0rem');
    }
    else {
        return klmenu_b(menu_list1,'','12rem','1.2rem','1rem');
    }
}

function buttons(){
    var button_size='0.9rem;'
    var button_more='';
    button_more=button_more+'<div class=klmenu><button style="font-size:'+button_size+';">'+checkbox_kl_b('input_focus','只显示重点条目')+'</button></div>';
    button_more=button_more+'<div class=klmenu><button style="font-size:'+button_size+';">'+checkbox_kl_b('input_enwords','单词翻译')+'</button></div>';
    button_more=button_more+'<div class=klmenu><button style=font-size:'+button_size+';" onclick="javascript:popup_show_hide_b(\'abr\');">关键词</button></div>';
    
    document.getElementById('div_show_hide').insertAdjacentHTML('beforebegin',klmenu_multi_button_div_b(button_more,'block','0','','div_menu_checkboxes'));
}

function sites_map(changetitle=false,csnumber=7){
    function sub_sites_map_count(cscount){
        return ' <span style="color:#606060;font-size:0.6rem;"><i>('+cscount+')</i></span>';
    }
    
    function sub_sites_map_input_range(csnumber=1){
        var bljg = "";
        bljg='<input type="range" min=1 max=20 value='+csnumber+' id="sites_map_input_range" oninput="javascript:document.getElementById(\'sites_map_span_range\').innerHTML=this.value;" onchange="javascript:sites_map(false,this.value);"> ';
        bljg=bljg+'<span id="sites_map_span_range" style="font-size:1.5rem;">'+csnumber+'</span>';
        return bljg;
    }    
    //----------------------
    var odiv=document.getElementById('divhtml2');
    //odiv.style.cssText='';
    var bljg='';
    sites_all_global.sort();
    sites_all_global.sort(function (a,b){return zh_sort_b(a,b,false,1);});
    sites_all_global.sort(function (a,b){return zh_sort_b(a,b,false,2);});
    var category='';
    var blxl2=0;
    var count1=0;
    var count2=0;
    var select_str='';
    for (let blxl=0;blxl<sites_all_global.length;blxl++){
        var href_str=sites_all_global[blxl][0];
        if (!href_str.includes('http') && !href_str.includes('{{LOCAL}}')){
            continue;
        }
        if (csnumber<20){
            if (sites_all_global[blxl][3]>csnumber){continue;}
        }
        //else if (cstype==''){
            //if (sites_all_global[blxl][3]>7){continue;}
        //}
        if (href_str.includes('{{LOCAL}}')){
            href_str=href_str.split('{{LOCAL}}')[1];
            count1=count1+1;
        }
        else if (href_str.substring(0,4)!=='http'){
            href_str=href_str.substring(href_str.indexOf('http'),);
            count2=count2+1;
        }
        else {
            count1=count1+1;
        }
        if (category!==sites_all_global[blxl][2]){
            category=sites_all_global[blxl][2];
            if (bljg!==''){
                bljg=bljg+sub_sites_map_count(blxl2);
                bljg=bljg+'</p>';
            }
            bljg=bljg+'<a name="sites_category_'+blxl+'"></a><p style="font-size:0.88rem;line-height:1.5rem;"><span style="font-weight:600;cursor:pointer;" title="批量打开" onclick="javascript:batch_open(this.parentNode);">'+category+'</span> ';
            blxl2=0;
            select_str=select_str+'<option value="sites_category_'+blxl+'">'+category+'</option>\n';
        }
        
        //bljg=bljg+'<small>'+(blxl2+1)+'.</small> ';
        bljg=bljg+'<a href="'+href_str+'" target=_blank class="a_sites_map">';
        var sitename_t=sites_all_global[blxl][1];
        if (blxl>0){
            if (sites_all_global[blxl][1]==sites_all_global[blxl-1][1]){
                var list_t=sites_all_global[blxl][0].split('/');
                if (list_t.slice(-1)=='' && list_t.length>1){
                    list_t=list_t.slice(-2);
                }
                else {
                    list_t=list_t.slice(-1);
                }
                sitename_t=sitename_t+'<small>('+list_t[0]+')</small>';
            }
        }
        if (sites_all_global[blxl][3]<=1 && csnumber>1){
            bljg=bljg+'<font color=red>'+sitename_t+'</font>';
        }
        //else if (sites_all_global[blxl][3]==2){
            //bljg=bljg+'<font color=blue>'+sitename_t+'</font>';
        //}
        //else if (sites_all_global[blxl][3]==3){
            //bljg=bljg+'<font color=green>'+sitename_t+'</font>';
        //}
        else if (sites_all_global[blxl][3]>20){
            bljg=bljg+'<font color=gray>'+sitename_t+'</font>';
        }                
        else {
            bljg=bljg+sitename_t; //<font color=#191919>
        }
        bljg=bljg+'</a> ';
        blxl2=blxl2+1;
    }
    
    if (bljg.slice(-4,)!=='</p>'){
        bljg=bljg+sub_sites_map_count(blxl2);
        bljg=bljg+'</p>';
    }
    select_str='<select onchange=\'javascript:document.location="#"+this.value;\'>'+select_str+'</select>';
    odiv.innerHTML='<hr />'+select_str+' '+sub_sites_map_input_range(csnumber)+bljg;//+' <a class=aclick href="javascript:void(null);" onclick="javascript:sites_map(false,\'mini\');">Mini</a> <a class=aclick href="javascript:void(null);" onclick="javascript:sites_map(false);">主要</a> <a class=aclick href="javascript:void(null);" onclick="javascript:sites_map(false,\'all\');">全部</a>'+bljg;
    var ospan=document.getElementById('span_count');
    if (ospan){
        ospan.innerHTML='sele网站数：'+count1+' 其他：'+count2+' 总计：'+(count1+count2);
    }
    if (changetitle){
        document.title="网址库";
        let otitle=document.getElementById('span_h2_title');
        if (otitle){
            otitle.innerHTML='网址库';
        }
    }
}
