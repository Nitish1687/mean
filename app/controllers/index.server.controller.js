exports.render = (req, res) => {

    if (req.session.lastVisit) {
        console.log("last visit = " + req.session.lastVisit);
    }

    req.session.lastVisit = new Date();
    res.render('index',
        {
            title: 'Welcome Page',
            description: "Employee List",
            employees: [
                {
                    name: 'nitish',
                    age: '29'
                },
                {
                    name: 'rahul',
                    age: '25'
                },
                {
                    name: 'prashant',
                    age: '28'
                }
            ]
        });
};