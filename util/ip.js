module.exports = (req) => {
  var forwarded = req.get('X-Forwarded-For')
  var actual = req.ip

    // If we have a forwarded header, we're on heroku (or hacking locally)
  if (forwarded) {
    var ipList = forwarded.split(/[ ,]+/)
    return ipList[ipList.length - 1]
  }

    // Otherwise we're in dev mode (or somehow accessing directly)
  return actual
}
