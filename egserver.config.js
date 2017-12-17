module.exports = {
  apps: [{
    name: 'egserver',
    script: 'npm',
    args: 'run start:server',
    watch: true,
    ignore_watch: [ './server/dist' ],
    env: {
      'NODE_ENV': 'development'
    },
    env_production: {
      'NODE_ENV': 'production'
    }
  }]
}
