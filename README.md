# diagram-js-ui

This library provides a building block for creating and rendering Preact components in the context of the bpmn.io tools without directly importing Preact.

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
  const { useState } = diagramJsUi.getHoooks();
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