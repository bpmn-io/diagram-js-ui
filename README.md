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

This module is available through `diagram-js`. It allows to render a Preact component and provides other utilities such as an html wrapper and preact hooks.

```javascript
import { render, html } from "diagram-js/lib/ui";
import MyCounter from './MyCounter';

export default function MyService() {
  const parentElement = document.createElement('div');

  render(html`<${MyCounter} />`, parentElement)
}
```

```javascript
import { useState } from "diagram-js/lib/ui";

export default function MyCounter(props) {
  const counter = useState(0);

  return html`
    <div>Counter: ${counter}</div>
  `;
}
```

## License

MIT
