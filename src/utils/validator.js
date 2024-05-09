const isValidEmail = (email) => {
    var regularExpression =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return String(email).toLowerCase().match(regularExpression);
};

const isValidPassword = (password) => {
    // min 8 letter password, with at least a symbol, upper and lower case letters and a number
    var regularExpression =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return String(password).match(regularExpression);
};

module.exports = {
    isValidEmail,
    isValidPassword,
};
