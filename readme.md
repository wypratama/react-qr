# @wy/react-qr

`@wy/react-qr` is a React component library for scanning QR codes using the device's camera. This library leverages the `jsQR` library to decode QR codes and provides an easy-to-use React component for embedding a QR code reader into your application.

## Installation

```
npm install @wy/react-qr
```

or

```sh
yarn add @wy/react-qr
```

## Usage

Import the `QRReader` component from the library and use it in your React component:

```jsx
import React from 'react';
import QRReader from '@wy/react-qr';

const App = () => {
  const handleResult = (result) => {
    console.log('QR code data:', result);
  };

  return (
    <div>
      <h1>Scan a QR code</h1>
      <QRReader onResult={handleResult} />
    </div>
  );
};

export default App;
```

## Props

| Prop      | Type                     | Description                                                                                                  | Default  |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------------------ | -------- |
| onResult  | (result: string) => void | Callback function that will be called with the decoded data when a QR code is scanned.                       | Required |
| scanDelay | number                   | Delay (in ms) between each scan attempt. A value of 0 will scan as fast as possible.                         | 0        |
| width     | string                   | Width of the QR reader component. Use any valid CSS value (e.g., '100%', '400px').                           | '100%'   |
| style     | React.CSSProperties      | Optional custom styles to apply to the QR reader component.                                                  | {}       |
| children  | ReactNode                | Optional children to render inside the QR reader component.                                                  | -        |
| useFrame  | boolean                  | If set to `true`, the QR reader will render children inside a default frame. If set to `false`, it will not. | true     |

## Customizing the QR Reader Appearance

You can pass custom children and set `useFrame` to `false` if you want to customize the appearance of the QR reader:

```jsx
import React from 'react';
import QRReader from '@wy/react-qr';

const CustomFrame = () => (
  <div className='custom-frame'>{/* Your custom frame markup */}</div>
);

const App = () => {
  const handleResult = (result) => {
    console.log('QR code data:', result);
  };

  return (
    <div>
      <h1>Scan a QR code</h1>
      <QRReader onResult={handleResult} useFrame={false}>
        <CustomFrame />
      </QRReader>
    </div>
  );
};

export default App;
```

## License

MIT

## Dependencies

- [React](https://reactjs.org/)
- [jsQR](https://github.com/cozmo/jsQR)
