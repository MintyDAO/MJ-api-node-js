const imgUpdaterByImgDescription = require('./imgUpdaterByImgDescription')
const config = require('../config.js')


module.exports = () => {
  // run at start
  imgUpdaterByImgDescription(process.env.DISCORD_OAUTH_TOKEN, config.chanelId, 50)

  // run as interval
  setInterval(
    function () {
      imgUpdaterByImgDescription(process.env.DISCORD_OAUTH_TOKEN, config.chanelId, 50)
    },
  config.updatesPeriod);
}
