const modalForm = $(".modal-window .specify-info__form"),
      checkEmail = $(".modal-window .check-email");

const userName = modalForm.find(".name"),
      userEmail = modalForm.find(".email"),
      userPhone = modalForm.find(".phone");

userName.on("keypress", function(event) {
    const verified = String.fromCharCode(event.which).match(/\w/);

    if (verified) {
        event.preventDefault();
    }
});

userPhone.intlTelInput( {
    onlyCountries: ["ru","gb","ua"],
    preferredCountries: [ "ua"],
    utilsScript: "sources/intTelInput/utils.js"
});

modalForm.on("submit", function (event) {
    event.preventDefault();

    const fields = {
        name: userName.val(),
        email: userEmail.val(),
        phone: userPhone.val()
    };

    if (validateUser(fields)) {
        console.log(JSON.stringify(fields));
        toNextStep();
    }
});

checkEmail.find(".confirm").on("click", function (event) {
    event.preventDefault();

    $.modal.close();
});

const toNextStep = () => {
    $(".modal-window .specify-info").css("display", "none");
    $(".modal-window .check-email").css("display", "flex");
};

const validateUser = fields => {
    const result = [];

    const items = {
        name: {
            isValid(name) {
                return name.length > 2
            },
            selector: ".specify-info__form .name"
        },
        email: {
            isValid(email) {
                return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email);
            },
            selector: ".specify-info__form .email"
        },
        phone: {
            isValid(phone) {
                return /^\d{10,}$/.test(phone)
            },
            selector: ".specify-info__form .phone"
        }
    };

    for (let key in fields) {
        if (items.hasOwnProperty(key)) {
            if (items[key].isValid(fields[key])) {
                $(items[key].selector).closest(".form-item").removeClass("invalid")
            } else {
                result.push(key);
                $(items[key].selector).closest(".form-item").addClass("invalid");
            }
        }
    }

    return !result.length;
};