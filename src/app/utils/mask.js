
function maskMobileRu(phone){
    var r = phone.replace(/\D/g,"");
    r = r.replace(/^0/,"");

    if (r.length > 5) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d\d\d)(\d{3})(\d{0,2})(\d{0,2}).*/,"($1) $2-$3-$4");
    }
    else if (r.length > 2) {
        // 3..5 digits. Add (0XX..)
        r = r.replace(/^(\d\d\d)(\d{0,5})/,"($1) $2");
    }
    else {
        // 0..2 digits. Just add (0XX
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

function maskDateTime(date) {
    // 2018-19-08 18:40:06
    var r = date.replace(/\D/g,"");
    r = r.replace(/^0/,"");
    if (r.length > 12) {
        // 11+ digits. Format as 5+4.
        r = r.replace(/^(\d\d\d\d)(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2}).*/,"$1-$2-$3 $4:$5:$6");
    }
    else if (r.length > 10) {
        // 11+ digits. Format as 5+4.
        r = r.replace(/^(\d\d\d\d)(\d{0,2})(\d{0,2})(\d{0,2})(\d{0,2}).*/,"$1-$2-$3 $4:$5");
    }
    else if (r.length > 8) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d\d\d\d)(\d{0,2})(\d{0,2})(\d{0,2}).*/,"$1-$2-$3 $4");
    }
    else if (r.length > 6) {
        // 6..10 digits. Format as 4+4
        r = r.replace(/^(\d\d\d\d)(\d{0,2})(\d{0,2}).*/,"$1\-$2-$3");
    }
    else if (r.length > 4) {
        // 3..5 digits. Add (0XX..)
        r = r.replace(/^(\d\d\d\d)(\d{0,2})/,"$1\-$2");
    }
    else {
        // 0..2 digits. Just add (0XX
        r = r.replace(/^(\d*)/, "$1");
    }
    return r;
}

module.exports = {
    mobile:{
        RU:maskMobileRu
    },
    date:{
        dateTime:maskDateTime
    }
};
