var MemoryStore = function (successCallback, errorCallback) {

    this.findByName = function (searchKey, callback) {
        var employees = this.employees.filter(function (element) {
            var fullName = element.firstName + " " + element.lastName;
            try {
                searchKey.toLowerCase()
                callback = "";
            } catch (err) {
                return 1;
            }
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, employees);
    }

    this.findById = function (id, callback) {
        var employees = this.employees;
        var employee = null;
        var l = employees.length;
        for (var i = 0; i < l; i++) {
            if (employees[i].id === id) {
                employee = employees[i];
                break;
            }
        }
        callLater(callback, employee);
    }

    this.addEmployee = function (firstName, lastName, title, cellPhone, officePhone, email) {
        var newContact = {
            id: this.employees.length + 1,
            firstName: firstName,
            lastName: lastName,
            title: title,
            managerId: 0,
            city: "Samara",
            cellPhone: cellPhone,
            officePhone, officePhone,
            email: email
        };
        this.employees.push(newContact);
    }

    this.editEmployee = function (idEdit, firstNameNew, lastNameNew, titleNew, cellPhoneNew, officePhoneNew, emailNew) {
        var employee = this.employees.find(item => item.id === idEdit);
        employee.firstName = firstNameNew ? firstNameNew : employee.firstName;
        employee.lastName = firstNameNew ? lastNameNew : employee.lastName;
        employee.title = firstNameNew ? titleNew : employee.title;
        employee.cellPhone = firstNameNew ? cellPhoneNew : employee.cellPhone;
        employee.officePhone = firstNameNew ? officePhoneNew : employee.officePhone;
        employee.email = firstNameNew ? emailNew : employee.email;
    }
    this.deleteEmployee = function (idEdit) {
        this.employees.splice(idEdit, 1);
    }

    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                try {
                    callback(data);
                }
                catch{

                }

            });
        }
    }

    this.employees = [
        { "id": 1, "firstName": "Anton", "lastName": "Tets1", "title": "Student", "managerId": 0, "city": "Samara", "cellPhone": "1232131321", "officePhone": "212444448887", "email": "sdfsdfsdf@gmail.com" },
        { "id": 2, "firstName": "Sasha", "lastName": "Petrov", "title": "Student", "managerId": 1, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444444567", "email": "sdfsdfsdf@gmail.com" },
        { "id": 3, "firstName": "Test2", "lastName": "test2", "title": "Student", "managerId": 2, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444448963", "email": "sdfsdfsdf@gmail.com" },
        { "id": 4, "firstName": "Sergey", "lastName": "Ivanov", "title": "Student", "managerId": 2, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444445741", "email": "sdfsdfsdf@gmail.com" },
        { "id": 5, "firstName": "Ivan", "lastName": "Petrov", "title": "Student", "managerId": 2, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444447474", "email": "sdfsdfsdf@gmail.com" },
        { "id": 6, "firstName": "Sergey", "lastName": "Vasiliev", "title": "Student", "managerId": 2, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444443232", "email": "sdfsdfsdf@gmail.com" },
        { "id": 7, "firstName": "Vanya2", "lastName": "Ivanov", "title": "Teacher", "managerId": 6, "city": "Moscow", "cellPhone": "1232131321", "officePhone": "570444442525", "email": "sdfsdfsdf@gmail.com" },
        { "id": 8, "firstName": "Sergey2", "lastName": "Petrov", "title": "Teacher", "managerId": 6, "city": "Moscow", "cellPhone": "12321313219999", "officePhone": "570444443333", "email": "sdfsdfsdf@gmail.com" },
        { "id": 9, "firstName": "2Test2", "lastName": "Vasechkin", "title": "Director", "managerId": 2, "city": "Moscow", "cellPhone": "57012321313216666", "officePhone": "570444448585", "email": "sdfsdfsdf@gmail.com" },
        { "id": 10, "firstName": "Sasha3", "lastName": "Ivanov", "title": "Director", "managerId": 4, "city": "Moscow", "cellPhone": "57012321313210", "officePhone": "570444449999", "email": "sdfsdfsdf@gmail.com" },
        { "id": 11, "firstName": "sss", "lastName": "ddd", "title": "Student", "managerId": 10, "city": "Moscow", "cellPhone": "5712321313218585", "officePhone": "570444441919", "email": "sdfsdfsdf@gmail.com" },
        { "id": 12, "firstName": "Sergey3", "lastName": "Vasechkin", "title": "Director", "managerId": 10, "city": "Piter", "cellPhone": "512321313216464", "officePhone": "570444449393", "email": "sdfsdfsdf@gmail.com" },
        { "id": 13, "firstName": "Ivan3", "lastName": "Vasechkin", "title": "Teacher", "managerId": 2, "city": "Piter", "cellPhone": "57012321313216567", "officePhone": "570444446167", "email": "sdfsdfsdf@gmail.com" },
        { "id": 14, "firstName": "Ivan3", "lastName": "Petrov", "title": "Teacher", "managerId": 2, "city": "Piter", "cellPhone": "57012321313219654", "officePhone": "570444443666", "email": "sdfsdfsdf@gmail.com" },
        { "id": 15, "firstName": "3Test3", "lastName": "Vasechkin", "title": "Teacher", "managerId": 1, "city": "Piter", "cellPhone": "5712321313218554", "officePhone": "570444445577", "email": "sdfsdfsdf@gmail.com" }
    ];

    callLater(successCallback);

}