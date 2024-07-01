# JavaScript udemy final project -- forkify Project 🥡📑

### 🔥 Recipe application with custom recipe uploads.

### ⚙ 1. Main technologies building:

- [x] DOM manipulation
  - Loading recipes
  - Rendering recipes
  - Pagination
  - Updating recipe
- [x] MVC architecture
  - Model
  - View
  - Controller
  - Refactoring
  - Helper and config files
  - Event handlers
  - Error and success messages
- [x] Implementing search
  - Search results
  - Pagination
  - Updating servings
  - Updating recipe
- [x] Implementing bookmarks
  - Storing bookmarks
  - Uploading bookmarks
  - Deleting bookmarks
- [x] Implementing pagination
  - Pagination buttons
  - Pagination algorithm
- [x] Updating recipe servings
  - Updating recipe
  - Updating servings
- [x] Uploading recipe
  - Uploading recipe
  - Loading recipe
  - Error handling
- [x] AJAX calls
  - Fetching recipe data
  - Sending recipe data
- [x] Local storage
  - Storing recipe data
  - Storing user data
- [x] Deploying the app
  - Parcel
  - Netlify

### 📚 2. Application Flowchart

![flowchart](./src/img/forkify-flowchart-part-3.png)

### 👍 3. Recommend sections:

- [x] Developing a DOM updating algorithm

### 🐛 4. Debug:

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
