function start(application, port = 3000) {
  application.listen(port, () => {
    console.log('Server is running on port ' + port);
  });
}

module.exports = {
  start
};