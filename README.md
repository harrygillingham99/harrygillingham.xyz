# .NET 6 SPA Template

A barebones SPA Template

### Backend
- .NET 6 MVC
- .NET 6 Internal API
- Automatic TS Client generation on MSBuild

### Frontend
- React
- Webpack
- Typescript
- Prettier/ESLint/Husky/Stylelint
- SASS
- TailwindCSS
 
## Prerequisites
1.    NodeJS v16.13.0 or later
2.    .NET 6 SDK

## FAQ

### I'm getting a certificate invalid issue when running `npm run dev`

This is an issue because `webpack-dev-server` generates a cert which, according to Chrome, is invalid. There are two approaches, either generate a self-cert or allow invalid certs for localhost:

1. Go to chrome://flags
2. Enable 'Allow invalid certificates for resources loaded from localhost.'

## Contributors
- [@WilliamJenner](https://github.com/WilliamJenner)
- [@harrygillingham99](https://github.com/harrygillingham99)

