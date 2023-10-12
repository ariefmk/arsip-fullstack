module.exports = app => {
  require('./masuk')(app)
  require('./auth')(app)
}
