var LocalStorageStore = function (successCallback, errorCallback) {

    this.findByName = function (searchKey, callback) {
        var employees = JSON.parse(window.localStorage.getItem("employees"));
        var results = employees.filter(function (element) {
            var fullName = element.firstName + " " + element.lastName;
            return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, results);
    }

    this.findById = function (id, callback) {
        var employees = JSON.parse(window.localStorage.getItem("employees"));
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

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function (callback, data) {
        if (callback) {
            setTimeout(function () {
                callback(data);
            });
        }
    }

    var employees = [
        { "id": 1, "firstName": "1Test1", "lastName": "Ivanov", "title": "Student", "managerId": 0, "city": "Samara", "cellPhone": "1232131321", "officePhone": "212444448887", "email": "sdfsdfsdf@gmail.com" },
        { "id": 2, "firstName": "Sasha", "lastName": "Petrov", "title": "Student", "managerId": 1, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444444567", "email": "sdfsdfsdf@gmail.com" },
        { "id": 3, "firstName": "Vanya", "lastName": "Vasechkin", "title": "Student", "managerId": 2, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444448963", "email": "sdfsdfsdf@gmail.com" },
        { "id": 4, "firstName": "Sergey", "lastName": "Ivanov", "title": "Student", "managerId": 2, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444445741", "email": "sdfsdfsdf@gmail.com" },
        { "id": 5, "firstName": "Ivan", "lastName": "Petrov", "title": "Student", "managerId": 2, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444447474", "email": "sdfsdfsdf@gmail.com" },
        { "id": 6, "firstName": "Sasha2", "lastName": "Vasechkin", "title": "Student", "managerId": 2, "city": "Samara", "cellPhone": "1232131321", "officePhone": "570444443232", "email": "sdfsdfsdf@gmail.com" },
        { "id": 7, "firstName": "Vanya2", "lastName": "Ivanov", "title": "Teacher", "managerId": 6, "city": "Moscow", "cellPhone": "1232131321", "officePhone": "570444442525", "email": "sdfsdfsdf@gmail.com" },
        { "id": 8, "firstName": "Sergey2", "lastName": "Petrov", "title": "Teacher", "managerId": 6, "city": "Moscow", "cellPhone": "12321313219999", "officePhone": "570444443333", "email": "sdfsdfsdf@gmail.com" },
        { "id": 9, "firstName": "2Test2", "lastName": "Vasechkin", "title": "Director", "managerId": 2, "city": "Moscow", "cellPhone": "57012321313216666", "officePhone": "570444448585", "email": "sdfsdfsdf@gmail.com" },
        { "id": 10, "firstName": "Sasha3", "lastName": "Ivanov", "title": "Director", "managerId": 4, "city": "Moscow", "cellPhone": "57012321313210", "officePhone": "570444449999", "email": "sdfsdfsdf@gmail.com" },
        { "id": 11, "firstName": "Vanya3", "lastName": "Petrov", "title": "Student", "managerId": 10, "city": "Moscow", "cellPhone": "5712321313218585", "officePhone": "570444441919", "email": "sdfsdfsdf@gmail.com" },
        { "id": 12, "firstName": "Sergey3", "lastName": "Vasechkin", "title": "Director", "managerId": 10, "city": "Piter", "cellPhone": "512321313216464", "officePhone": "570444449393", "email": "sdfsdfsdf@gmail.com" },
        { "id": 13, "firstName": "Ivan3", "lastName": "Vasechkin", "title": "Teacher", "managerId": 2, "city": "Piter", "cellPhone": "57012321313216567", "officePhone": "570444446167", "email": "sdfsdfsdf@gmail.com" },
        { "id": 14, "firstName": "Ivan3", "lastName": "Petrov", "title": "Teacher", "managerId": 2, "city": "Piter", "cellPhone": "57012321313219654", "officePhone": "570444443666", "email": "sdfsdfsdf@gmail.com" },
        { "id": 15, "firstName": "3Test3", "lastName": "Vasechkin", "title": "Teacher", "managerId": 1, "city": "Piter", "cellPhone": "5712321313218554", "officePhone": "570444445577", "email": "sdfsdfsdf@gmail.com" }
    ];

    window.localStorage.setItem("employees", JSON.stringify(employees));

    callLater(successCallback);

}