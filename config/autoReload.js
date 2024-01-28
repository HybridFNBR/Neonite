module.exports.autoreload = {
    active: true,
    usePolling: false,
    dirs: [
      "api/controllers",
      "responses",
      "discovery"
    ],
    ignored: [
      "**.ts"
    ]
}