var app = {

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    registerEvents: function () {
        var self = this;
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            $('body').on('touchstart', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            $('body').on('mousedown', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        }
        $(window).on('hashchange', $.proxy(this.route, this));
    },
    route: function () {
        var self = this;
        var hash = window.location.hash;
        var match = hash.split('/');
        if (!hash || match[0] === "#main") {
            if (this.homePage) {
                this.slidePage(this.homePage);
                location.reload();
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }
        
        if (match[0] === "#employees") {
            this.store.findById(Number(match[1]), function (employee) {
                self.slidePage(new EmployeeView(employee).render());
            });
        }
        if (match[0] === "#edit") {
            this.store.findById(Number(match[1]), function (employee) {
                self.slidePage(new EditEmployeeView(employee).render());
            });
        }
    },
    slidePage: function (page) {

        var currentPageDest,
            self = this;

        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page === app.homePage) {
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('body').append(page.el);

        setTimeout(function () {
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);

            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });
    },
    deleteEmployee: function (index) {
        this.store.deleteEmployee(index);
    },
    editEmployee: function (indexId, firstName, lastName, title, cellPhone, officePhone, email) {
        this.store.editEmployee(indexId, firstName, lastName, title, cellPhone, officePhone, email);
    },
    addEmployee: function (firstName, lastName, title, cellPhone, officePhone, email) {
        this.store.addEmployee(firstName, lastName, title, cellPhone, officePhone, email);
    },
    initialize: function () {
        var self = this;
        this.detailsURL = /^#employees\/(\d{1,})/;
        this.registerEvents();
        var hash = window.location.hash;
        var match = hash.split('/');
        if (match[0] !=='#main') {
            this.store = new MemoryStore(function () {
                // $('body').html(new HomeView(self.store).render().el);
                self.route();
            });
        }
    }

};

app.initialize();
