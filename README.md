# JavaScript udemy final project -- forkify Project 🥡📑

### Recipe application with custom recipe uploads.

### 1. Application Flowchart

![flowchart](./src/img/forkify-flowchart-part-3.png)

### 🐛 Debug:

1. For those who had problem with not working private properties and methods, you need to explicitly configure babel in package.json, to be able handle these. (Parcel is using Babel under the hood to transform js files). You do it by installing plugins, adding them to devDependencies, and then configuring babel to use them.

```json
  "devDependencies": {
    "@babel/plugin-transform-private-methods": "^7.24.7",
    "@babel/plugin-transform-private-property-in-object": "^7.24.7",
    "@parcel/transformer-sass": "^2.12.0",
    "parcel": "^2.12.0"
  },
  ...
  "babel": {
    "plugins": [
      "@babel/plugin-transform-private-methods",
      "@babel/plugin-transform-private-property-in-object"
    ]
  }
```
