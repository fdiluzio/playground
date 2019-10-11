
#### Set-up
> https://webpack.js.org/guides/getting-started/
 
```
mkdir webpack-demo
cd webpack-demo
npm init -y
```

#### Install Dev Dependencies
These packages are used tasks etc.
```
npm install webpack --save-dev
npm install webpack-cli --save-dev
```

#### Install Dependencies
These packages are needed in our production code base.

```
npm install --save lodash
```

#### Intial folder structure

```
webpack-demo
  |- package.json
  |- /dist
    |- index.html
  |- /src
    |- index.js
```




#### Edit package.json
> add private property and remove main property
```
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,
-   "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.20.2",
      "webpack-cli": "^3.1.2"
    },
    "dependencies": {}
  ```

  #### Run Bundler
  ```
  npx webpack
  ```