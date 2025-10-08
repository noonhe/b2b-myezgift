---
applyTo: ''
---
Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

## 🔐 Task 00 - Install tailwind CSS in the app

based on https://angular.dev/guide/tailwind follow the steps to add tailwind to the app:

- run ```npm install tailwindcss @tailwindcss/postcss postcss```
- configure PostCSS Plugins : add a .postcssrc.json file in the file root of the project. Add the @tailwindcss/postcss plugin into your PostCSS configuration.
```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

- import tailwind CSS: Add an @import to ./src/styles.css that imports Tailwind CSS.
```css
@import "tailwindcss";
```

---