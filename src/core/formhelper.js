const validateForm = (form, key) => {

    let fields = form.fields;
    let errors = form.error;

    if (key == null) {
        validateFirstName();
        validateEmail();
        validatePassword();
    } else {
        switch (key) {
            case "firstName":
                validateFirstName();
                return theForm();
            case "email":
                validateEmail();
                return theForm();
            case "password":
                validatePassword();
                return theForm();
            default :
                return theForm();
        }
    }

    function validateFirstName() {
        if (!fields["firstName"]) {
            errors["firstName"] = "*Please enter your firstName.";
        }

        if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^[a-zA-Z ]*$/)) {
                errors["firstName"] = "*Please enter alphabet characters only.";
            }
        }
    }

    function validateEmail() {
        if (!fields["email"]) {
            errors["email"] = "*Please enter your email.";
        }

        if (typeof fields["email"] !== "undefined") {
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(fields["email"])) {
                errors["email"] = "*Please enter valid email.";
            } else {
                errors["email"] = "";
            }
        }
    }


    function validatePassword() {
        if (!fields["password"]) {
            errors["password"] = "*Please enter your password.";
        }

        if (typeof fields["password"] !== "undefined") {
            let pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm);
            if (!pattern.test(fields["password"])) {
                errors["password"] = "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.";
            } else {
                errors["password"] = "";
            }
        }
    }

    function isFormValid() {
        return errors && !Object.keys(errors).some(err => errors[err] !== '');
    }

    function theForm() {
        return {fields: fields, error: errors, valid: isFormValid()};
    }

    return theForm();
};

export {validateForm}
