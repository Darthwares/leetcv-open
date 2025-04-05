/* eslint-disable react/no-children-prop */
import DescList from '../../components/descList';
import { render, screen } from '@testing-library/react';
import React from 'react';
describe('DescList', () => {
  it('Should render DescList components test results correctly', () => {
    render(<DescList children={[]} />);
    const container = screen.getByTestId(`descList`);
    expect(container).toBeInTheDocument();
  });
});
