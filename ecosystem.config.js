module.exports = {
    apps: [
      {
        name: 'mielshop',
        script: './index.js',
        instances: 'max',
        exec_mode: 'cluster',
        max_restarts: 5,
        restart_delay: 30000
      }
    ]
  };
  