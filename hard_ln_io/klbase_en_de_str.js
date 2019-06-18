//csver: 0.0.1-20180908
function random_chs_b(cslength){
	var csnum=arguments.length;
	if (csnum==0){var cslength= 1;}
    var bljg='';
    for (var blxl=0;blxl<cslength;blxl++){
        bljg=bljg+String.fromCodePoint(Math.round(Math.random()*20901+19968));
    }
    return bljg;
}

function characters_b(cstype){
    var str = '';
    if (cstype.indexOf('A')>=0){
        for(var i=65;i<91;i++){
            str=str+String.fromCharCode(i);
        }
    }
    if (cstype.indexOf('a')>=0){
        for(var i=97;i<123;i++){
            str=str+String.fromCharCode(i);
        }
     }
    if (cstype.indexOf('0')>=0 || cstype.indexOf('1')>=0){
        str=str+'0123456789';
    }
    return str;    
}

function randint_b(m,n){
    return Math.floor(Math.random()*(m - (n+1)) + n+1);
}

function randwrongstr_b(cslen){
    var list_t=['`', '_', '^', '÷', '×', '≠', '≤', '≥', '_', '_', '_', '-', '_', '-', '¡', '¿', '‘', '⁻', '⁺', '§', '¶', '©', '®', '™', '@', '¤', '£', '¥', '₠', '₡', '₢', '₣', '₤', '₥', '₦', '₧', '₨', '₩', '₪', '₫', '€', '₭', '₮', '₯', '±', '←', '←', '_', '←', '→', '→', '_', '→', '↑', '↓', '♪', '◢', '◣', '؟', 'ɐ', '￥', '╰', '_', '╯', '╯', '#', '-', '_', '-', '╯', '╧', '═', '╧', '—', '—', '▔', '＾', '▔', '╮', '╯', '▽', '╰', '╭', '৳', '⁰', '⅛', '¼', '⅜', '½', '⅝', '⅞', '¹', '¹', '⁰', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', 'á', 'à', 'ă', 'ắ', 'ằ', 'ẵ', 'ẳ', 'ặ', 'â', 'ấ', 'ầ', 'ẫ', 'ẩ', 'ậ', 'ǎ', 'å', 'ǻ', 'Å', 'ä', 'ǟ', 'ã', 'ȧ', 'ǡ', 'ą', 'ā', 'ả', 'ȁ', 'ȃ', 'ạ', 'ḁ', 'ẚ', 'ª', 'ḃ', 'ḅ', 'ḇ', 'ɓ', 'ć', 'ĉ', 'č', 'ċ', 'ç', 'ḉ', 'ƈ', 'ď', 'ḋ', 'đ', 'ḑ', 'ḍ', 'ḓ', 'ḏ', 'ɗ', 'ð', 'ǳ', 'ǆ', 'é', 'è', 'ĕ', 'ê', 'ế', 'ề', 'ễ', 'ể', 'ệ', 'ě', 'ë', 'ẽ', 'ė', 'ȩ', 'ḝ', 'ę', 'ē', 'ḗ', 'ḕ', 'ẻ', 'ȅ', 'ȇ', 'ẹ', 'ḙ', 'ḛ', 'ɛ', 'ḟ', 'ǵ', 'ğ', 'ĝ', 'ǧ', 'ġ', 'ǥ', 'ģ', 'ḡ', 'ɠ', 'ĥ', 'ȟ', 'ḧ', 'ḣ', 'ħ', 'ḩ', 'ḥ', 'ḫ', 'ẖ', 'ƕ', 'í', 'ì', 'ĭ', 'î', 'ǐ', 'ï', 'ḯ', 'ĩ', 'į', 'ī', 'ỉ', 'ȉ', 'ȋ', 'ị', 'ḭ', 'ı', 'ĳ', 'ĵ', 'ǰ', 'ḱ', 'ǩ', 'ķ', 'ḳ', 'ḵ', 'ƙ', 'ĺ', 'ľ', 'ŀ', 'ł', 'ļ', 'ḷ', 'ḹ', 'ḽ', 'ḻ', 'ǉ', 'ḿ', 'ṁ', 'ṃ', 'ń', 'ǹ', 'ň', 'ñ', 'ṅ', 'ņ', 'ṇ', 'ṋ', 'ṉ', 'ŉ', 'ó', 'ò', 'ŏ', 'ô', 'ố', 'ồ', 'ổ', 'ộ', 'ǒ', 'ö', 'ȫ', 'ő', 'õ', 'ṍ', 'ȯ', 'ȱ', 'ø', 'ǫ', 'ō', 'ṓ', 'ṑ', 'ọ', 'ớ', 'ờ', 'ỡ', 'ở', 'ợ', 'ɔ', 'º', 'œ', 'ṕ', 'ṗ', 'ŕ', 'ř', 'ṙ', 'ŗ', 'ȑ', 'ȓ', 'ṛ', 'ṝ', 'ṟ', 'ś', 'ṥ', 'ŝ', 'š', 'ṧ', 'ṡ', 'ş', 'ṣ', 'ṩ', 'ẛ', 'ß', 'ť', 'ṫ', 'ŧ', 'ţ', 'ṭ', 'ṱ', 'ṯ', 'ú', 'ù', 'ŭ', 'û', 'ǔ', 'ů', 'ü', 'ǘ', 'ǜ', 'ǚ', 'ǖ', 'ű', 'ũ', 'ṹ', 'ų', 'ū', 'ṻ', 'ủ', 'ȕ', 'ȗ', 'ụ', 'ṳ', 'ṷ', 'ṵ', 'ư', 'ứ', 'ừ', 'ữ', 'ử', 'ự', 'ṽ', 'ṿ', 'ẃ', 'ẁ', 'ŵ', 'ẘ', 'ẅ', 'ẇ', 'ẉ', 'ƿ', 'ý', 'ỳ', 'ŷ', 'ẙ', 'ÿ', 'ỹ', 'ẏ', 'ȳ', 'ỷ', 'ỵ', 'ƴ', 'ȝ', 'ź', 'ẑ', 'ž', 'ż', 'ƶ', 'ẓ', 'ẕ', 'ȥ', 'ʒ', 'Α', 'α', 'Β', 'β', 'Γ', 'γ', 'Δ', 'δ', 'Ε', 'ε', '￣', 'ε', '￣', 'Ζ', 'ζ', 'Η', 'η', 'Θ', 'θ', 'Ι', 'ι', 'Κ', 'κ', 'Λ', 'λ', 'Μ', 'μ', 'Ν', 'ν', 'Ξ', 'ξ', 'Ο', 'ο', 'Π', 'π', 'ρ', 'Σ', 'σ', 'ς', 'Τ', 'τ', 'Υ', 'υ', 'Φ', 'φ', 'Χ', 'χ', 'Ψ', 'ψ', 'ψ', '￣', '︶', '￣', 'ψ', 'Ω', 'ω', 'а', 'А', 'б', 'Б', 'в', 'В', 'г', 'Г', 'д', 'Д', 'е', 'Е', 'ё', 'Ё', 'ж', 'Ж', 'з', 'З', 'и', 'И', 'й', 'Й', 'к', 'К', 'л', 'Л', 'м', 'М', 'н', 'Н', 'о', 'О', 'п', 'П', 'р', 'Р', 'с', 'С', 'т', 'Т', 'у', 'У', 'ф', 'Ф', 'х', 'Х', 'ц', 'Ц', 'ч', 'Ч', 'ш', 'Ш', 'щ', 'Щ', 'ъ', 'Ъ', 'ы', 'Ы', 'ь', 'Ь', 'э', 'Э', 'ю', 'Ю', 'я', 'Я', '☬', '勹', '賁', '灬', '髟', '冫', '癶', '卜', '歺', '艸', '艹', '镸', '鬯', '屮', '牜', '彳', '巛', '疒', '辵', '辶', '隹', '刂', '弍', '弐', '貮', '匚', '阝', '罓', '鬲', '廾', '夬', '龜', '巜', '丨', '虍', '㗊', '亼', '己', '彐', '彑', '旡', '卩', '钅', '井', '冂', '臼', '㠪', '亅', '凵', '卝', '爫', '耒', '離', '㸚', '叕', '㒳', '臨', '〇', '冃', '芈', '冖', '糸', '纟', '宀', '丬', '爿', '疋', '丿', '攴', '攵', '菐', '靑', '犭', '冄', '亻', '禸', '彡', '飠', '饣', '矢', '豕', '丗', '士', '礻', '扌', '殳', '氵', '氺', '厶', '糹', '亖', '巳', '夊', '亠', '尢', '尣', '㓁', '罒', '囗', '㐅', '夕', '覀', '匸', '心', '忄', '吅', '穴', '襾', '訁', '讠', '幺', '爻', '弌', '衤', '廴', '酉', '兂', '㠭', '夂', '黹', '豸', '丶', '丵',];
    
    var bljg='';
    for (var blxl=1;blxl<=cslen;blxl++){
        list_t.sort(function (a,b){return Math.random()>.5 ? -1 : 1;});
        bljg=bljg+list_t[0];
    }
    return bljg;
}

function randstr_b(cslen=8,csnumber=true,csletter=true) {
    var bljg='';
    if (csnumber==true && csletter==true){
        var list_t=characters_b('aA1').split('');
        for (var blxl=1;blxl<=cslen;blxl++){
            bljg=bljg+list_t[randint_b(0,61)];
        }
    }
    else if (csletter==true){
        var list_t=characters_b('aA').split('');
        for (var blxl=1;blxl<=cslen;blxl++){
            bljg=bljg+list_t[randint_b(0,51)];
        }
    }
    else {
        for (var blxl=1;blxl<=cslen;blxl++){
            bljg=bljg+randint_b(0,9);
        }        
    }
    return bljg;
}

function random_strs_b(){
    var blquote1='{[('.split('');
    var blquote2=')]}'.split('');
    var bljg=blquote2[randint_b(0,2)]+blquote2[randint_b(0,2)]+randstr_b(randint_b(3,5));
    bljg='~'+random_chs_b(randint_b(3,5))+bljg+'~~'+random_chs_b(randint_b(3,5));
    return bljg+blquote1[randint_b(0,2)]+blquote1[randint_b(0,2)]+'~';
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function confuse_str_b(csstr,cssegments){
    if (csstr.length==0){
        return csstr;
    }
    csstr=csstr.split("").reverse().join("");
    var len_t=csstr.length;

	var csnum=arguments.length;
	if (csnum<=1){var cssegments= Math.max(8,Math.round(len_t/4));}

    var lenlist=[];
    
    cssegments=Math.min(cssegments,len_t);
    
    for (var blxl=0;blxl<len_t;blxl++){
        lenlist[blxl]=blxl;
    }
    lenlist=getRandomSubarray(lenlist,cssegments).sort(function(a,b){return a-b;});

    var bljg=csstr.substring(0,lenlist[0]);
    
    for (var blxl=0;blxl<lenlist.length;blxl++) {
        if (blxl<lenlist.length-1){
            bljg=bljg+random_strs_b()+csstr.substring(lenlist[blxl],lenlist[blxl+1]);
        }
        else {
            bljg=bljg+random_strs_b()+csstr.substring(lenlist[blxl]);
        }
    }

    return bljg;
}

function de_confuse_str_b(csstr){
    if (csstr==''){return '';}
    return (csstr.replace(new RegExp(/~[^\x00-\xff]{3,5}[}\)\]]{2}([a-zA-Z0-9]){3,5}~~[^\x00-\xff]{3,5}[{\(\[]{2}~/,"g"),"")).split("").reverse().join(""); 
}

function odd_str_b(csstr){
    if (csstr.length<=1){return csstr;}
    var list_t=csstr.split('');
    if (list_t.length % 2 == 1){
        list_t.push("");
    }
    var bljg='';
    for (var blxl=1;blxl<list_t.length;blxl=blxl+2){
        bljg=bljg+list_t[blxl]+list_t[blxl-1];
    }
    return bljg;
}

function en_interval_str_b(csstr){
    if (csstr.length<2){return csstr;}
    var list_t=csstr.match(/(.|\n)(.|\n)?/mg);
    if (list_t==null){return csstr;}
    var bljg='';
    for (var item of list_t){
        if (item.length==2){
            if (Math.random()>0.667){
                bljg=bljg+item+randwrongstr_b(1);
            }
            else if (Math.random()>0.5){
                bljg=bljg+item+randstr_b(1);
            }
            else {
                bljg=bljg+item+random_chs_b(1);
            }
        }
        else {
            bljg=bljg+item;
        }
    }
    return bljg;
}

function de_interval_str_b(csstr){
    if (csstr.length<=2){return csstr;}
    var list_t=csstr.match(/(.|\n)(.|\n)?(.|\n)?/mg);
    if (list_t==null){return csstr;}
    var bljg='';
    for (var item of list_t){
        if (item.length==3){
            bljg=bljg+item.substring(0,2);
        }
        else {
            bljg=bljg+item;
        }
    }
    return bljg;
}

function en_double_str_b(csstr){
    return en_interval_str_b(odd_str_b(en_interval_str_b(csstr)));
}
function de_double_str_b(csstr){
    return de_interval_str_b(odd_str_b(de_interval_str_b(csstr)));
}
