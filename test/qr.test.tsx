import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import QRReader from '../src/index';

describe('QRReader', () => {
  it('renders without crashing', () => {
    const { container } = render(<QRReader onResult={() => {}} />);
    expect(container).toBeInTheDocument();
  });

  it('renders with custom width and style', () => {
    const { container } = render(
      <QRReader
        onResult={() => {}}
        width='500px'
        style={{ border: '1px solid red' }}
      />
    );
    const qrReaderDiv = container.querySelector('.qr-reader');
    expect(qrReaderDiv).toHaveStyle({
      width: '500px',
      border: '1px solid red',
    });
  });

  it('renders children correctly', () => {
    const { getByText } = render(
      <QRReader onResult={() => {}}>
        <div>Custom child element</div>
      </QRReader>
    );
    expect(getByText('Custom child element')).toBeInTheDocument();
  });

  // Add more tests as needed
});
