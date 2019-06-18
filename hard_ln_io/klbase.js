function create_element_b(cstype,csidname,csstyle,o_div,csafter=true){
    if (csidname!==''){
        var o_new = document.getElementById(csidname);
        if (!o_new){
            var o_new = document.createElement(cstype);
            o_new.setAttribute("id", csidname);
            o_new.style.cssText=csstyle;
            if (csafter){
                o_div.parentNode.insertBefore(o_new, o_div.nextSibling);
            }
            else {
                o_div.parentNode.insertBefore(o_new, o_div);
            }
            return o_new;
        }
    }
    else {
        var o_new = document.createElement(cstype);
        o_new.style.cssText=csstyle;
        if (csafter){
            o_div.parentNode.insertBefore(o_new, o_div.nextSibling);
        }
        else {
            o_div.parentNode.insertBefore(o_new, o_div);
        }
        return o_new;
    }
    return false;
}

function str_reg_search_b(csinput,cskeys,csreg){
    //csinput 和 cskeys 可以是字符串，也可以使数组 - 保留注释
    //如果返回 -1 ，表示正则表达式出错 - 保留注释
    function sub_str_reg_search_b_array(csinput,word_t){
        var blfound2=false;
        for (var blx=0; blx<csinput.length;blx++){
            if ((csinput[blx]+'').includes(word_t)){
                blfound2=true;
                break;
            }
        }
        return blfound2;
    }
    
    function sub_sort_by_date_b_sort_array_reg(csinput,word_t){
        var blfound2=false;
        for (var blx=0; blx<csinput.length;blx++){
            if ((csinput[blx]+'').search(new RegExp(word_t,"i"))>=0){
                blfound2=true;
                break;
            }
        }
        return blfound2;
    }
    //---------
	var blfound=false;
	var csarray=Array.isArray(csinput);
	if (csarray==false && typeof csinput!=="string"){
		csinput=''+csinput;
	}
    //如果 查询关键字 是 字符串，则转换为数组 - 保留注释
    if (typeof cskeys=='string'){
        cskeys=cskeys.split(' ');
    }

	for (var blno=0;blno<cskeys.length;blno++){
		var word_t=cskeys[blno];
		if (word_t=="" || word_t=="+" || word_t=="-"){
			continue;
		}
		if (csreg==false){
			if (word_t.substring(0,1)=='+'){
				if (csarray){
                    var blfound2=sub_str_reg_search_b_array(csinput,word_t.substring(1,));
                    
					if (blfound2==false){
						blfound=false;
						break;
					}
					else{blfound=true;}	 
				}
				else {
					if (csinput.indexOf(word_t.substring(1,))<0){
						blfound=false;
						break;
					}
					else{blfound=true;}
				}
			}
			else if (word_t.substring(0,1)=='-'){
				if (csarray){
                    var blfound2=sub_str_reg_search_b_array(csinput,word_t.substring(1,));
					if (blfound2==true){
						blfound=false;
						break;
					}
					else{blfound=true;}	 
				}
				else {
					if (csinput.includes(word_t.substring(1,))){
						blfound=false;
						break;
					}
					else{blfound=true;}
				}
			}
			else {
				if (csarray){
                    var blfound2=sub_str_reg_search_b_array(csinput,word_t);
					if (blfound2==true){
						blfound=true;
					}
				}
				else {
					if (csinput.includes(word_t)){
						blfound=true;
					}
				}
			}
		}
		else{
			try{
				if (word_t.substring(0,1)=='+'){
					if (csarray){
                        var blfound2=sub_sort_by_date_b_sort_array_reg(csinput,word_t.substring(1,));
						if (blfound2==false){
							blfound=false;
							break;
						}
						else{blfound=true;}	 
					}
					else {
						if (csinput.search(new RegExp(word_t.substring(1,),"i"))<0){
							blfound=false;
							break;
						}
						else{blfound=true;}
					}
				}
				else if (word_t.substring(0,1)=='-'){
					if (csarray){
                        var blfound2=sub_sort_by_date_b_sort_array_reg(csinput,word_t.substring(1,));
						if (blfound2==true){
							blfound=false;
							break;
						}
						else{blfound=true;}	 
					}
					else {
						if (csinput.search(new RegExp(word_t.substring(1,),"i"))>=0){
							blfound=false;
							break;
						}
						else{blfound=true;}
					}
				}
				else {
					if (csarray){
                        var blfound2=sub_sort_by_date_b_sort_array_reg(csinput,word_t);
						if (blfound2==true){
							blfound=true;
						}
					}
					else {
						if (csinput.search(new RegExp(word_t,"i"))>=0){
							blfound=true;
						}
					}
				}
			}
			catch (error){
				alert(word_t+' '+error.message);
				return -1;
			}
		}
	}
	return blfound;
}

function mobile_b(csstr1,csstr2){
	var csnum=arguments.length;
	if (csnum<2){var csstr2 = '';}	
	var usera=navigator.userAgent.toLowerCase();
	if (usera.includes('android') || usera.includes('mobile')){
		if (csstr1!=''){document.write(csstr1);}
	}
	else{
		if (csstr2!=''){document.write(csstr2);}
	}
}

function getRandomColor_b() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
	color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function search_r_key_b(inputid,checkboxid,csstr){
    var isreg=false;
    if (csstr.slice(-4)=='(:r)'){
        csstr=csstr.substring(0,csstr.length-4);
        isreg=true;
    }
    var o_tmp=document.getElementById(inputid);
	if (o_tmp){
		o_tmp.value=csstr;
	}
    if (checkboxid!==''){
        var o_tmp=document.getElementById(checkboxid);
        if (o_tmp){
            if (o_tmp.tagName=='SPAN'){
                checkbox_kl_color_b(checkboxid,isreg);//此函数在 klbase_css.js 中 - 保留注释
            }
            else {
                o_tmp.checked=isreg;
            }
        }
    }
}

function randomsort_b(a, b) {
   return Math.random()>.5 ? -1 : 1;
}

function sort_by_date_b(a,b,csdesc=false,arrayno=-1,arrayno2=-1,array2desc=false,cszh=false){
    function sub_sort_by_date_b_sort_string(a,b,arrayno2,array2desc,cszh){
        if (cszh){
            return zh_sort_b(a[arrayno2],b[arrayno2],array2desc);
        }
        else {
            if (array2desc){
                return b[arrayno2]-a[arrayno2];
            }
            else {
                return a[arrayno2]-b[arrayno2];
            }
        }
    }
    function sub_sort_by_date_b_sort_array(a,b,arrayno2){
        if (arrayno2>=0){
            if (a[arrayno]==b[arrayno]){
                return false;
            }
            else {return new Date(a[arrayno])-new Date(b[arrayno]);}
        }
        else {
            return new Date(a[arrayno])-new Date(b[arrayno]);
        }
    }
    //-------
    if (arrayno<0){
        if (csdesc){
            return new Date(b)-new Date(a);
        }
        else {
            return new Date(a)-new Date(b);
        }
    }
    else {
        if (csdesc){
            var blvalue=sub_sort_by_date_b_sort_array(b,a,arrayno2);
        }
        else {
            var blvalue=sub_sort_by_date_b_sort_array(a,b,arrayno2);
        }
        if (blvalue==false){
            return sub_sort_by_date_b_sort_string(a,b,arrayno2,array2desc,cszh);
        }
        else {return blvalue;}
    }
}

function bible_en_cn_b(csstr){
    var ben=["The First Book of Moses: Called Genesis","The Second Book of Moses: Called Exodus","The Third Book of Moses: Called Leviticus","The Fourth Book of Moses: Called Numbers","The Fifth Book of Moses: Called Deuteronomy","The Book of Joshua","The Book of Judges","The Book of Ruth","The First Book of Samuel","The Second Book of Samuel","The First Book of the Kings","The Second Book of the Kings","The First Book of the Chronicles","The Second Book of the Chronicles","Ezra","The Book of Nehemiah","The Book of Esther","The Book of Job","The Book of Psalms","The Proverbs","Ecclesiastes","The Song of Solomon","The Book of the Prophet Isaiah","The Book of the Prophet Jeremiah","The Lamentations of Jeremiah","The Book of the Prophet Ezekiel","The Book of Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","The Gospel According to Saint Matthew","The Gospel According to Saint Mark","The Gospel According to Saint Luke","The Gospel According to Saint John","The Acts of the Apostles","The Epistle of Paul the Apostle to the Romans","The First Epistle of Paul the Apostle to the Corinthians","The Second Epistle of Paul the Apostle to the Corinthians","The Epistle of Paul the Apostle to the Galatians","The Epistle of Paul the Apostle to the Ephesians","The Epistle of Paul the Apostle to the Philippians","The Epistle of Paul the Apostle to the Colossians","The First Epistle of Paul the Apostle to the Thessalonians","The Second Epistle of Paul the Apostle to the Thessalonians","The First Epistle of Paul the Apostle to Timothy","The Second Epistle of Paul the Apostle to Timothy","The Epistle of Paul the Apostle to Titus","The Epistle of Paul the Apostle to Philemon","The Epistle of Paul the Apostle to the Hebrews","The General Epistle of James","The First Epistle General of Peter","The Second General Epistle of Peter","The First Epistle General of John","The Second Epistle General of John","The Third Epistle General of John","The General Epistle of Jude","The Revelation of Saint John the Devine",];
    var bcn=["创世记","出埃及记","利未记","民数记","申命记","约书亚记","士师记","路得记","撒母耳记上","撒母耳记下","列王记上","列王记下","历代志上","历代志下","以斯拉记","尼希米记","以斯帖记","约伯记","诗篇","箴言","传道书","雅歌","以赛亚书","耶利米书","耶利米哀歌","以西结书","但以理书","何西阿书","约珥书","阿摩司书","俄巴底亚书","约拿书","弥迦书","那鸿书","哈巴谷书","西番雅书","哈该书","撒迦利亚书","玛拉基书","马太福音","马可福音","路加福音","约翰福音","使徒行传","罗马书","哥林多前书","哥林多后书","加拉太书","以弗所书","腓立比书","歌罗西书","帖撒罗尼迦前书","帖撒罗尼迦后书","提摩太前书","提摩太后书","提多书","腓利门书","希伯来书","雅各书","彼得前书","彼得后书","约翰一书","约翰二书","约翰三书","犹大书","启示录",];
    
    var at_t=ben.indexOf(csstr);
    if (at_t>=0){
        return bcn[at_t];
    }
    var at_t=bcn.indexOf(csstr);
    if (at_t>=0){
        return ben[at_t];
    }
    return '';
}
function zh_sort_b(a,b,csdesc=false,arrayno=-1){
    if (arrayno<0){
        if (a.toString().substring(0,1).match(/[^\x00-\xff]/g)==null || b.toString().substring(0,1).match(/[^\x00-\xff]/g)==null){
            if (csdesc){
                return b>a;
            }
            else {
                return a>b;
            }
        }
        else {
            if (csdesc){
                return b.localeCompare(a,"zh");
            }
            else {
                return a.localeCompare(b,"zh");
            }
        }
    }
    else {
        if (a[arrayno].toString().substring(0,1).match(/[^\x00-\xff]/g)==null || b[arrayno].toString().substring(0,1).match(/[^\x00-\xff]/g)==null){
            if (csdesc){
                return b[arrayno]>a[arrayno];
            }
            else {
                return a[arrayno]>b[arrayno];
            }        
        }
        else {
            if (csdesc){
                return b[arrayno].localeCompare(a[arrayno],"zh");
            }
            else {
                return a[arrayno].localeCompare(b[arrayno],"zh");
            }
        }
    }
}

function radio_value_get_b(radio_name){
	var elements = document.getElementsByName(radio_name);
    if (elements){
        var cstype_t='0';
        for (var i=0;i<elements.length; i++){
            if (elements[i].checked){
                cstype_t=elements[i].value;
                break;
            }
        }
        return cstype_t;
    }
    else {return '-1';}
}

function radio_value_set_b(radio_name,csvalue){
	var elements = document.getElementsByName(radio_name);
    if (elements){
        for (var i=0;i<elements.length; i++){
            if (elements[i].value==csvalue){
                elements[i].checked=true;
            }
            else {elements[i].checked=false;}
        }
        return i;
    }
    else {return -1;}
}

function specialstr_j(csstr,ignore_single_quote=false){
    //var www='"do\\gl\\\\h\'ello';
    var bljg=csstr.toString().replace(new RegExp(/\\/,"g"),'\\\\');
    bljg=bljg.replace(new RegExp('"',"g"),'\\"');
    if (ignore_single_quote==false){
        bljg=bljg.replace(new RegExp("'","g"),"\\'");
    }
    return bljg;
}

function specialstr_lt_gt_j(csstr,csand=false){
    //var www='"do\\gl\\\\h\'ello';
    csstr=csstr.toString();
    if (csand){
        csstr=csstr.replace(new RegExp(/&/,"g"),'&amp;');
    }
    csstr=csstr.replace(new RegExp(/</,"g"),'&lt;');
    csstr=csstr.replace(new RegExp('>',"g"),'&gt;');
    return csstr;
}

function href_split_b(cshref){
    if (cshref.includes("#")){
        var cshref=cshref.substring(0,cshref.indexOf("#"));
    }
    if (cshref.includes("?")){
        cshref=cshref.substring(cshref.indexOf("?")+1);
    }
    else {
        cshref='';
    }
    var cskeys=decodeURIComponent(cshref).split('&');
    return cskeys;
}

function specialstr_html_b(csstr){
    //var www='"do\\gl\\\\h\'ello';
    var bljg=csstr.toString().replace(new RegExp(/\\/,"g"),'&#92;');
    bljg=bljg.replace(new RegExp('"',"g"),'&quot;');
    bljg=bljg.replace(new RegExp("'","g"),"&#39;");
    return bljg;
}

function asc_sum_b(csstr){
    var asc_t=0;
    var length_t=csstr.length;
    for (var blxl2=0;blxl2<length_t;blxl2++){
        asc_t=asc_t+csstr.substring(blxl2,blxl2+1).charCodeAt(0);
    }
    return asc_t;
}

function array_unique_b(listname){
    return Array.from(new Set(listname));
}

function array_intersection_b(array1,array2){
    //交集
    var en_source1 = new Set(array1);
    var en_source2 = new Set(array2);
    var en_intersection = new Set(
        [...en_source1].filter(x => en_source2.has(x)));

    return Array.from(en_intersection);
}

function array_difference_b(array1,array2){
    //差集，array1 有 但 array2 没有
    var en_source1 = new Set(array1);
    var en_source2 = new Set(array2);
    var en_intersection = new Set(
        [...en_source1].filter(x => !en_source2.has(x)));

    return Array.from(en_intersection);
}

function array_union_b(array1,array2){
    //并集
    var en_source1 = new Set(array1);
    var en_source2 = new Set(array2);
    var en_union = new Set([...en_source1, ...en_source2]);
    return Array.from(en_union);
}

function kbmbgb_b(cssize,afterpoint=2){
    var bldw='';
    if (cssize>=1000){
        cssize=cssize/1024;
        bldw='KB';
    }
    if (cssize>=1000){
        cssize=cssize/1024;
        bldw='MB';
    }
    if (cssize>=1000){
        cssize=cssize/1024;
        bldw='GB';
    }
    if (bldw==''){
        return csszie;
    }
    return cssize.toFixed(afterpoint)+bldw;
}

function href2host_b(cshref,cswithhttp=false){
    var str_t=cshref.trim().replace(new RegExp('^https?://(.*)','g'),'$1');
    if (cswithhttp){
        var head=cshref.trim().replace(new RegExp('^(https?://).*','g'),'$1');
    }
    else {
       var head=''
    }
    return head+str_t.split('/')[0].trim();    
}

function chinese_punctuation_b(csstr){
    for (var blxl=1;blxl<3;blxl++){
        csstr=csstr.replace(new RegExp(/([^\x00-\xff])\?/,"g"),"$1？");
        csstr=csstr.replace(new RegExp(/([^\x00-\xff])!/,"g"),"$1！");
        csstr=csstr.replace(new RegExp(/([^\x00-\xff]),/,"g"),"$1，");
        
        csstr=csstr.replace(new RegExp(/([^\x00-\xff]): /,"g"),"$1：");
        csstr=csstr.replace(new RegExp(/([^\x00-\xff]):/,"g"),"$1：");
        csstr=csstr.replace(new RegExp(/([^\x00-\xff]); /,"g"),"$1；");
        csstr=csstr.replace(new RegExp(/([^\x00-\xff]);/,"g"),"$1；");    
        
        csstr=csstr.replace(new RegExp(/^\'([^\x00-\xff][^\'‘’\n]*?[^\x00-\xff]?)\'/,"g"),"‘$1’");
        csstr=csstr.replace(new RegExp(/([^\'])\'([^\x00-\xff][^\'‘’\n]*?[^\x00-\xff]?)\'/,"g"),"$1‘$2’");
        csstr=csstr.replace(new RegExp(/\"([^\x00-\xff][^\"”“\n]*?[^\x00-\xff]?)\"/,"g"),"“$1”");
        csstr=csstr.replace(new RegExp(/\(([^\x00-\xff][^\(\)（）\n]*?[^\x00-\xff]?)\)/,"g"),"（$1）");
        
        csstr=csstr.replace(new RegExp(/([^\x00-\xff])\.{6}/,"g"),"$1……");
        csstr=csstr.replace(new RegExp(/([^\x00-\xff])\.{3}/,"g"),"$1…");
        csstr=csstr.replace(new RegExp(/([^\x00-\xff])\./,"g"),"$1。");
    }
    return csstr;
}
