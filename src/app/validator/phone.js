function isMobilePhone(phone) {
    let re = /^[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/;
    return re.test(String(phone).toLowerCase());
}


module.exports = {
    isMobilePhone:isMobilePhone
};