# net4VISIONS AppError class

This is an extendable class for handling custom erros in Node.js projects.

It provides TypeScript typings.

## Installation

`npm i n4v-app-error`

## Usage

### TypeScript
``` TypeScript
import { AppError } from 'n4v-app-error';

class MyError extends AppError {
  name = 'MyError';
}

new MyError('something goes wrong %d times', 2);
```

### JavaScript
``` JavaScript
const AppError = require('n4v-app-error').AppError;

new AppError('something goes wrong %d times', 2);
```
