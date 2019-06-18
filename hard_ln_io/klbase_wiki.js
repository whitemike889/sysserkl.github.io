function wiki_all_format_b(csstr,cstyle=""){
    //先解密 - 保留注释
    csstr=wiki_de_double_b(csstr);

    csstr=wiki_base64_b(csstr);
    csstr=wiki_strong_b(csstr);
    csstr=wiki_href_b(csstr);
    csstr=wiki_quote_b(csstr);
    csstr=wiki_photo_b(csstr);
    csstr=wiki_ed2k_magnet_b(csstr);
    csstr=wiki_mrt_b(csstr);
    csstr=wiki_ul_b(csstr);
    csstr=wiki_font_color_b(csstr);
    csstr=wiki_sns_b(csstr);

    return csstr;
}

function wiki_href_b(csstr){
    //show link or img
	//http
	if (csstr.includes('http')){
        //[http] no title,just link
		if (csstr.includes('[http') && csstr.includes(']')){
			csstr=csstr.replace(new RegExp(/\[(https?:\/\/[^ ]*?)\]/,"ig"),'<a href="$1" target=_blank>$1</a>');
		}
		//[http ]
		if (csstr.includes('[http') && csstr.includes(']') && csstr.includes(' ')){
			csstr=csstr.replace(new RegExp(/\[(https?:\/\/[^ ]*?) (.*?)\]/,"ig"),'<a href="$1" target=_blank>$2</a>');
		}
		//^http
		if (csstr.indexOf('http')==0){
			csstr=csstr.replace(new RegExp(/(^https?:\/\/[^ ]*?([^\/]*?)\.(jpg|png|gif|bmp|webp)) /,"ig"),'<img src="$1" title="$1" /> ');
			csstr=csstr.replace(new RegExp(/(^https?:\/\/[^ ]*?([^\/]*?)\.(jpg|png|gif|bmp|webp)$)/,"ig"),'<img src="$1" title="$1" />');
			
			csstr=csstr.replace(new RegExp(/(^https?:\/\/[^ ]+) /,"ig"),'<a href="$1" target=_blank>$1</a> ');
			csstr=csstr.replace(new RegExp(/(^https?:\/\/[^ ]+)/,"ig"),'<a href="$1" target=_blank>$1</a>');
		}
		// http
		if (csstr.includes(' http')){
			csstr=csstr.replace(new RegExp(/ (https?:\/\/[^ ]*?([^\/]*?)\.(jpg|png|gif|bmp|webp)) /,"ig"),' <br /><img src="$1" title="$1" /> ');
			csstr=csstr.replace(new RegExp(/ (https?:\/\/[^ ]*?([^\/]*?)\.(jpg|png|gif|bmp|webp)$)/,"ig"),' <br /><img src="$1" title="$1" />');
			
			csstr=csstr.replace(new RegExp(/ (https?:\/\/[^ ]+) /,"ig"),' <a href="$1" target=_blank>$1</a> ');
			csstr=csstr.replace(new RegExp(/ (https?:\/\/[^ ]+)/,"ig"),' <a href="$1" target=_blank>$1</a>');
		}
		
		//chinese
		csstr=csstr.replace(new RegExp(/([^\x00-\xff])(https?:\/\/[^ ]*?([^\/]*?)\.(jpg|png|gif|bmp|webp)) /,"ig"),'$1<br /><img src="$2" title="$1"> ');
		csstr=csstr.replace(new RegExp(/([^\x00-\xff])(https?:\/\/[^ ]*?([^\/]*?)\.(jpg|png|gif|bmp|webp)$)/,"ig"),'$1<br /><img src="$2" title="$1" />');
		
		csstr=csstr.replace(new RegExp(/([^\x00-\xff])(https?:\/\/[^ ]+) /,"ig"),'$1<a href="$2" target=_blank>$2</a> ');
		csstr=csstr.replace(new RegExp(/([^\x00-\xff])(https?:\/\/[^ ]+)/,"ig"),'$1<a href="$2" target=_blank>$2</a>');
	}
    return csstr;
}

function wiki_strong_b(csstr){
    csstr=csstr.replace(new RegExp(/'''(.*?)'''/,"g"),'<strong>$1</strong>');
    //csstr=csstr.replace(new RegExp(/''(.*?)''/,"g"),'<i>$1</i>');
    csstr=csstr.replace(new RegExp(/([^=])''(.*?)''/,"g"),'$1<i>$2</i>');
    csstr=csstr.replace(new RegExp(/^''(.*?)''/,"g"),'<i>$1</i>');    
    return csstr;
}

function wiki_base64_b(csstr){
    //形如：
    //base64_BEGIN
    //.......
    //base64_END
    if (!csstr.includes('base64_BEGIN') || !csstr.includes('base64_END')){
        return csstr;
    }

    var list_t=csstr.split('\n');
    var bljg='';
    var base64=false;
    for (var aline of list_t){
        if (aline=='base64_BEGIN'){
            base64=true;
            bljg=bljg+aline;
            continue;
        }
        if (aline=='base64_END'){
            base64=false;
            bljg=bljg+aline+'\n';
            continue;
        }
        if (base64){
            bljg=bljg+aline;
        }
        else {
            bljg=bljg+aline+'\n';
        }
    }
    bljg=bljg.replace(new RegExp(/base64_BEGIN(.*?)base64_END/,"g"),'<img src="$1" />');
    return bljg;
}

function wiki_quote_b(csstr,multi_lines=false){
    var rstyle='g';
    if (multi_lines){
        rstyle="gm";
    }
    if (csstr.includes('{{quote') && csstr.includes('{{/quote}}')){
        csstr=csstr.replace(new RegExp(/{{quote}}(.*?){{\/quote}}/,rstyle),'<div style="width:90%;border:solid 1px #6396D6;background-color:#E7EBEF;padding:0.2rem 0.5rem;">$1</div>');
        csstr=csstr.replace(new RegExp(/{{quote\|t=0}}(.*?){{\/quote}}/,rstyle),'<div style="width:100%;background-color:#E0EEF7;padding:0.2rem 0.5rem;">$1</div>');
        csstr=csstr.replace(new RegExp(/{{quote\|t=y}}(.*?){{\/quote}}/,rstyle),'<div style="width:90%;background-color:#FFFFDD;padding:0.2rem 0.5rem;">$1</div>');
        csstr=csstr.replace(new RegExp(/{{quote\|t=b}}(.*?){{\/quote}}/,rstyle),'<div style="width:90%;background-color:#F7F1E8;padding:0.2rem 0.5rem;border:solid 1px #9C6918;">$1</div>');
        csstr=csstr.replace(new RegExp(/{{quote\|t=r}}(.*?){{\/quote}}/,rstyle),'<div style="width:90%;background-color:#FFF7F7;padding:0.2rem 0.5rem;border:solid 1px #D66563;">$1</div>');
    }

    if (csstr.includes('{{span') && csstr.includes('{{/span}}')){
        csstr=csstr.replace(new RegExp(/{{span}}(.*?){{\/span}}/,rstyle),'<span style="border:solid 1px #6396D6;background-color:#E7EBEF;">$1</span>');
        csstr=csstr.replace(new RegExp(/{{span\|t=0}}(.*?){{\/span}}/,rstyle),'<span style="background-color:#E0EEF7;">$1</span>');
        csstr=csstr.replace(new RegExp(/{{span\|t=y}}(.*?){{\/span}}/,rstyle),'<span style="background-color:#FFFFDD;">$1</span>');
        csstr=csstr.replace(new RegExp(/{{span\|t=b}}(.*?){{\/span}}/,rstyle),'<span style="background-color:#F7F1E8;border:solid 1px #9C6918;">$1</span>');
        csstr=csstr.replace(new RegExp(/{{span\|t=r}}(.*?){{\/span}}/,rstyle),'<span style="background-color:#FFF7F7;border:solid 1px #D66563;">$1</span>');
        csstr=csstr.replace(new RegExp(/{{span\|t=l}}(.*?){{\/span}}/,rstyle),'<span style="color:black; border-bottom:1px dotted #303030;background-color:#fdfd32;font-style:italic;">$1</span>');
        csstr=csstr.replace(new RegExp(/{{span\|t=d}}(.*?){{\/span}}/,rstyle),'<span style="color:#454600;border:dashed 1px #ff0000;border-radius:5px;padding:0px 1px;margin:0px 1px;">$1</span>');
    }
    return csstr;
}

function wiki_photo_b(csstr,cstyle=""){
    if (cstyle=='and'){
        if (csstr.includes('&lt;photo&gt;') && csstr.includes('&lt;/photo&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;photo&gt;(.*?)&lt;\/photo&gt;/,"g"),'<img src="$1" title="$1" />');
        }
    }
    else {
        if (csstr.includes('<photo>') && csstr.includes('</photo>')){
            csstr=csstr.replace(new RegExp(/<photo>(.*?)<\/photo>/,"g"),'<img src="$1" title="$1" />');
        }
    }
    return csstr;
}

function wiki_ed2k_magnet_b(csstr,cstyle=""){
    function sub_wiki_ed2k_magnet_b_filesize(csstr){
        var fsizelist_t=csstr.match(new RegExp(/<filesize>.*?<\/filesize>/,"g"));
        var bldw='';
        for (var blxl in fsizelist_t){
            var blsize=parseInt(fsizelist_t[blxl].substring('<filesize>'.length,fsizelist_t[blxl].length-'</filesize>'.length).trim());
            //bldw='';
            //if (blsize>=1000){
                //blsize=blsize/1024;
                //bldw='KB';
            //}
            //if (blsize>=1000){
                //blsize=blsize/1024;
                //bldw='MB';
            //}
            //if (blsize>=1000){
                //blsize=blsize/1024;
                //bldw='GB';
            //}
            csstr=csstr.replace(fsizelist_t[blxl], '<span style="font-size:0.8rem;color:#707070">('+kbmbgb_b(blsize,2)+')</span>');
        }
        return csstr;
    }
    //---------------
    if (cstyle=="and"){
        //ed2k
        if (csstr.includes('&lt;ed2k name=&quot;') && csstr.includes('&lt;/ed2k&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;ed2k name=&quot;(.*?)&quot;&gt;(ed2k:\/\/\|.*?\|.*?\|(.*?)\|.*?)&lt;\/ed2k&gt;/,"g"),'<a href="$2">$1</a><filesize>$3</filesize>');
            csstr=sub_wiki_ed2k_magnet_b_filesize(csstr);
        }
        
        else if (csstr.includes('&lt;ed2k name=') && csstr.includes('&lt;/ed2k&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;ed2k name=(.*?)&gt;(ed2k:\/\/\|.*?\|.*?\|(.*?)\|.*?)&lt;\/ed2k&gt;/,"g"),'<a href="$2">$1</a><filesize>$3</filesize>');
            csstr=sub_wiki_ed2k_magnet_b_filesize(csstr);
        }	
        else if (csstr.includes('&lt;ed2k&gt;') && csstr.includes('&lt;/ed2k&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;ed2k&gt;(ed2k:\/\/\|.*?\|.*?\|(.*?)\|.*?)&lt;\/ed2k&gt;/,"g"),'<a href="$1">ed2k</a><filesize>$2</filesize>');
            csstr=sub_wiki_ed2k_magnet_b_filesize(csstr);
        }
        
        //magnet
        if (csstr.includes('&lt;magnet&gt;') && csstr.includes('&lt;/magnet&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;magnet&gt;(.*?)&lt;\/magnet&gt;/,"g"),'<a href="$1">magnet</a>');
        }
        else if (csstr.includes('&lt;magnet name=&quot;') && csstr.includes('&lt;/magnet&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;magnet name=&quot;(.*?)&quot;&gt;(.*?)&lt;\/magnet&gt;/,"g"),'<a href="$2">($1)</a>');
        }
        else if (csstr.includes('&lt;magnet name=') && csstr.includes('&lt;/magnet&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;magnet name=(.*?)&gt;(.*?)&lt;\/magnet&gt;/,"g"),'<a href="$2">($1)</a>');
        }
    }
    else {
       //ed2k
        if (csstr.includes('<ed2k name="') && csstr.includes('</ed2k>')){
            csstr=csstr.replace(new RegExp(/<ed2k name="(.*?)">(ed2k:\/\/\|.*?\|.*?\|(.*?)\|.*?)<\/ed2k>/,"g"),'<a href="$2">$1</a><filesize>$3</filesize>');
            csstr=sub_wiki_ed2k_magnet_b_filesize(csstr);
        }
        
        else if (csstr.includes('<ed2k name=') && csstr.includes('</ed2k>')){
            csstr=csstr.replace(new RegExp(/<ed2k name=(.*?)>(ed2k:\/\/\|.*?\|.*?\|(.*?)\|.*?)<\/ed2k>/,"g"),'<a href="$2">$1</a><filesize>$3</filesize>');
            csstr=sub_wiki_ed2k_magnet_b_filesize(csstr);
        }	
        else if (csstr.includes('<ed2k>') && csstr.includes('</ed2k>')){
            csstr=csstr.replace(new RegExp(/<ed2k>(ed2k:\/\/\|.*?\|.*?\|(.*?)\|.*?)<\/ed2k>/,"g"),'<a href="$1">ed2k</a><filesize>$2</filesize>');
            csstr=sub_wiki_ed2k_magnet_b_filesize(csstr);
        }
        
        //magnet
        if (csstr.includes('<magnet>') && csstr.includes('</magnet>')){
            csstr=csstr.replace(new RegExp(/<magnet>(.*?)<\/magnet>/,"g"),'<a href="$1">magnet</a>');
        }
        else if (csstr.includes('<magnet name="') && csstr.includes('</magnet>')){
            csstr=csstr.replace(new RegExp(/<magnet name="(.*?)">(.*?)<\/magnet>/,"g"),'<a href="$2">($1)</a>');
        }
        else if (csstr.includes('<magnet name=') && csstr.includes('</magnet>')){
            csstr=csstr.replace(new RegExp(/<magnet name=(.*?)>(.*?)<\/magnet>/,"g"),'<a href="$2">($1)</a>');
        }
    }
    return csstr;
}

function wiki_mrt_b(csstr,cstyle=""){
    if (cstyle=='and'){
        if (csstr.includes('&lt;mrt r&gt;') && csstr.includes('&lt;/mrt&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;mrt r&gt;(.*?)&lt;\/mrt&gt;/,"g"),'<font color=blue><b>REVIEW:</b></font> <span style="color:#303030; border-bottom:1px dotted #303030;background-color:#fdfd32;">$1</span>');
        }
        else if (csstr.includes('&lt;mrt m&gt;') && csstr.includes('&lt;/mrt&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;mrt m&gt;(.*?)&lt;\/mrt&gt;/,"g"),'<font color=green><b>MEMO:</b></font> <span style="color:#303030; border-bottom:1px dotted #303030;background-color:#fdfd32;">$1</span>');
        }
        else if (csstr.includes('&lt;mrt t&gt;') && csstr.includes('&lt;/mrt&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;mrt t&gt;(.*?)&lt;\/mrt&gt;/,"g"),'<font color=red><b>TODO:</b></font> <span style="color:#303030; border-bottom:1px dotted #303030;background-color:#fdfd32;">$1</span>');
        }
    }
    else {
        if (csstr.includes('<mrt r>') && csstr.includes('</mrt>')){
            csstr=csstr.replace(new RegExp(/<mrt r>(.*?)<\/mrt>/,"g"),'<font color=blue><b>REVIEW:</b></font> <span style="color:#303030; border-bottom:1px dotted #303030;background-color:#fdfd32;">$1</span>');
        }
        else if (csstr.includes('<mrt m>') && csstr.includes('</mrt>')){
            csstr=csstr.replace(new RegExp(/<mrt m>(.*?)<\/mrt>/,"g"),'<font color=green><b>MEMO:</b></font> <span style="color:#303030; border-bottom:1px dotted #303030;background-color:#fdfd32;">$1</span>');
        }
        else if (csstr.includes('<mrt t>') && csstr.includes('</mrt>')){
            csstr=csstr.replace(new RegExp(/<mrt t>(.*?)<\/mrt>/,"g"),'<font color=red><b>TODO:</b></font> <span style="color:#303030; border-bottom:1px dotted #303030;background-color:#fdfd32;">$1</span>');
        }
    }
    return csstr;
}

function wiki_ul_b(csstr){
    //形如：
    //* 
    //* 
    //或
    //#
    //#
    function sub_wiki_ul_b_type(csstr,hash_asterisk='#'){
        if (hash_asterisk=='*'){
            var ul_ol='ul';
            if (csstr.match(/\n\*/)==null && csstr.match(/^\*/)==null){
                return csstr;
            }            
        }
        else {
            //#
            var ul_ol='ol';
            if (csstr.match(/\n#/)==null && csstr.match(/^#/)==null){
                return csstr;
            }
        }

        var list_t=csstr.split('\n');
        var bljg='';
        var in_ul=false;
        for (var aline of list_t){
            if (aline.substring(0,1)==hash_asterisk){
                if (in_ul==false){
                    bljg=bljg+'<'+ul_ol+'>\n';
                    in_ul=true;
                }
                bljg=bljg+'<li>'+aline.substring(1,).trim()+'</li>\n';
            }
            else {
                if (in_ul){
                    bljg=bljg+'</'+ul_ol+'>\n';
                    in_ul=false;
                }
                bljg=bljg+aline+'\n';
            }
        }
        if (in_ul){
            bljg=bljg+'</'+ul_ol+'>\n';
            in_ul=false;
        }
        return bljg;
    }
    //------------------
    csstr=sub_wiki_ul_b_type(csstr,'#');
    csstr=sub_wiki_ul_b_type(csstr,'*');
    return csstr;
}

function wiki_font_color_b(csstr,cstyle=""){
    //<fc=red>xxxxxx</fc> <fc=#ff0000></fc>
    if (cstyle=='and'){
        if (csstr.includes('&lt;fc=') && csstr.includes('&lt;/fc&gt;')){
            csstr=csstr.replace(new RegExp(/&lt;fc=(.*?)&gt;(.*?)&lt;\/fc&gt;/,"g"),'<font color=$1>$2</font>');
        }
    }
    else{
        if (csstr.includes('<fc=') && csstr.includes('</fc>')){
            csstr=csstr.replace(new RegExp(/<fc=(.*?)>(.*?)<\/fc>/,"g"),'<font color=$1>$2</font>');
        }
    }
    return csstr;
}

function wiki_sns_b(csstr){
    //{{t|n=}} {{w|n=}}
    if (csstr.includes('{{t|n=')) {
        csstr=csstr.replace(new RegExp(/{{t\|n=(.*?)}}/,"g"),'<a href="https://twitter.com/$1" target=_blank>@$1</a>');
    }   
    if (csstr.includes('{{w|n=')) {
        csstr=csstr.replace(new RegExp(/{{w\|n=(.*?)}}/,"g"),'<a href="https://weibo.com/n/$1" target=_blank>@$1</a>');
    }    
    return csstr;
}

function wiki_de_double_b(csstr){
    //形如：
    //<en_double>xxxxx
    //.......
    //</en_double>
    if (!csstr.includes('<en_double>') || !csstr.includes('</en_double>')){
        return csstr;
    }

    var list_t=csstr.match(/<en_double>.*?<\/en_double>/mg);
    if (list_t==null){return csstr;}
    for (var item of list_t){
        var str_t=item.substring('<en_double>'.length,);
        str_t=str_t.substring(0,str_t.length-'</en_double>'.length);
        csstr=csstr.replace(item,de_double_str_b(str_t));
    }
    return csstr;
}
