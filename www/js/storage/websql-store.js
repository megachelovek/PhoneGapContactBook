var WebSqlStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("Contacts", "1.0", "Contact Demo DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS contact');
        var sql = "CREATE TABLE IF NOT EXISTS contact( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "firstName VARCHAR(50), " +
            "lastName VARCHAR(50), " +
            "title VARCHAR(50), " +
            "managerId INTEGER, " +
            "city VARCHAR(50), " +
            "officePhone VARCHAR(50), " +
            "cellPhone VARCHAR(50), " +
            "email VARCHAR(50))";
        tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx, employees) {
        var employees = [
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
        var l = employees.length;
        var sql = "INSERT OR REPLACE INTO contact" +
            "(id, firstName, lastName, managerId, title, city, officePhone, cellPhone, email) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = employees[i];
            tx.executeSql(sql, [e.id, e.firstName, e.lastName, e.managerId, e.title, e.city, e.officePhone, e.cellPhone, e.email],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.findByName = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, count(r.id) reportCount " +
                    "FROM contact e LEFT JOIN contact r ON r.managerId = e.id " +
                    "WHERE e.firstName || ' ' || e.lastName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.lastName, e.firstName";

                tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        employees = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        employees[i] = results.rows.item(i);
                    }
                    callback(employees);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT e.id, e.firstName, e.lastName, e.title, e.city, e.officePhone, e.cellPhone, e.email, e.managerId, m.firstName managerFirstName, m.lastName managerLastName, count(r.id) reportCount " +
                    "FROM contact e " +
                    "LEFT JOIN contact r ON r.managerId = e.id " +
                    "LEFT JOIN contact m ON e.managerId = m.id " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

    this.initializeDatabase(successCallback, errorCallback);

}
