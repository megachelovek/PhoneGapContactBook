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
        var hash = window.location.hash;
        var match = hash.split('/');

        var firstName = document.getElementById('firstName').value;
        var lastName = document.getElementById('lastName').value;
        var title = document.getElementById('title').value;
        var cellPhone = document.getElementById('cellPhone').value;
        var officePhone = document.getElementById('officePhone').value;
        var email = document.getElementById('email').value;


        app.editEmployee(Number(match[1]), firstName, lastName, title, cellPhone, officePhone, email);

    };

    this.initialize();
}

EditEmployeeView.template = Handlebars.compile($("#edit-tpl").html());
