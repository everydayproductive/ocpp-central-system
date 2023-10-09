module.exports = {
  apps: [
    {
      name: 'ocpp-central-system',
      script: './node_modules/.bin/ocpp-central-system',
      args: '',
      instances: 1,
      autorestart: false,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
}
