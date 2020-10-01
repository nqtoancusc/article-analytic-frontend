const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/toannguyen/Projects/ProjectsInDocker/article-analytic-frontend/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/toannguyen/Projects/ProjectsInDocker/article-analytic-frontend/src/pages/404.js"))),
  "component---src-pages-app-js": hot(preferDefault(require("/Users/toannguyen/Projects/ProjectsInDocker/article-analytic-frontend/src/pages/app.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/toannguyen/Projects/ProjectsInDocker/article-analytic-frontend/src/pages/index.js"))),
  "component---src-pages-signin-js": hot(preferDefault(require("/Users/toannguyen/Projects/ProjectsInDocker/article-analytic-frontend/src/pages/signin.js"))),
  "component---src-pages-using-typescript-tsx": hot(preferDefault(require("/Users/toannguyen/Projects/ProjectsInDocker/article-analytic-frontend/src/pages/using-typescript.tsx")))
}

