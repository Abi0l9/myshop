module.exports = {
    apps: [
        {
            name: "my shop",
            script: "index.js",
            watch: true,
            ignore_watch: ["node_modules"],
            watch_options: {
        followSymlinks: false
      }
        }
    ]
};
