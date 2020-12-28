import * as React from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import { expect } from 'chai';
import { App } from './App';
import { RecoilRoot } from 'recoil';

describe('<App>', () => {
  it('renders boxes', () => {
    const { getByText } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    );
    const box = getByText(/box 2/i);

    expect(document.body.contains(box));
  });
});
