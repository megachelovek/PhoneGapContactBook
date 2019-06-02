var EditEmployeeView = function (employee) {

    this.initialize = function () {
        this.el = $('<div/>');
        this.el.on('click', '.save-profile-btn', this.saveContact);
    };

    this.render = function () {
        this.el.html(EditEmployeeView.template(employee));
        return this;
    };

    this.saveContact = function () {
        // event.preventDefault();
        // console.log('saveToContacts');
        // if (!navigator.contacts) {
        //     app.showAlert("saveToContacts not supported", "Error");
        //     return;
        // }

        // var contact = navigator.contacts.create();
        // contact.name = {givenName: employee.firstName, familyName: employee.lastName};
        // var phoneNumbers = [];
        // phoneNumbers[0] = new ContactField('work', employee.officePhone, false);
        // phoneNumbers[1] = new ContactField('mobile', employee.cellPhone, true); // preferred number
        // contact.phoneNumbers = phoneNumbers;
        // contact.save();
        // return false;


        // function onSuccess(contact) {
        //     alert("Save Success");
        // };

        // function onError(contactError) {
        //     alert("Error = " + contactError.code);
        // };
        var hash = window.location.hash;
        var match = hash.split('/');

        var firstName = $('#firstName');
        var lastName = $('#lastName');
        var title = $('#title');
        var cellPhone= $('#officePhone');
        var officePhone = $('#cellPhone');
        var email = $('#email');
        app.editEmployee(Number(match[1]),firstName.value,lastName.value,title.value,cellPhone.value,officePhone.value,email.value);
        
        return false;

    };

    this.initialize();
}

EditEmployeeView.template = Handlebars.compile($("#edit-tpl").html());
