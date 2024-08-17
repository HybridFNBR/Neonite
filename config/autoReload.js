module.exports.autoreload = {
    active: true,
    usePolling: false,
    dirs: [
      "api/controllers",
      "responses",
      "discovery",
      "config.ini"
    ],
    ignored: [
      "**.ts"
    ]
}