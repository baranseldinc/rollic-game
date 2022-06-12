const CommonValidations = {
    requried: {
        rule: value => {
            if (value.trim()) return true;
            return false;
        }, errMsg: 'This field is required!'
    },
    mustBeString: {
        rule: value => {
            if (typeof value === 'string' || value instanceof String) {
                return true
            }
            return false;
        }, errMsg: 'This field must be a string'
    },
    mustBeMail: {
        rule: value => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true
            }
            return false;
        }, errMsg: 'Please enter a valid email'
    }
}

export default CommonValidations;