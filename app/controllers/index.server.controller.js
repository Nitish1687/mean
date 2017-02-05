exports.render = (req, res) => {
    // res.set(200).send('Hello world');

    res.render('index', {title: 'Welcome Page'});
};