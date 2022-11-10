# diagram-js-ui

A wrapper around [`htm/preact`](https://github.com/developit/htm#usage) that exposes components for building reactive HTML widgets in the context of diagram-js (core) + extensions.


## Getting started
```sh
# install all dependencies
npm install

# lint and build the library 
npm run all
```

## Usage
The module can be injected into other modules. It allows to render a Preact component and provides other utilities such as an html wrapper and preact hooks.

```javascript 
function CustomComponent(diagramJsUi) {
  const { useState } = diagramJsUi.getHooks();
  const counter = useState(0);

  diagramJsUi.render(
    diagramJsUi.html`
      <div>Counter: ${counter}</div>
    `
  )
}

CustomComponent.$inject = [
  'diagramJsUi'
];
```



## License

MIT
