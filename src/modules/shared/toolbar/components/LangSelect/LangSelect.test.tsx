import React from 'react';

import { render } from '@testing-library/react';

import LangSelect from './LangSelect';
import { Lang, LANGUAGE_OPTIONS } from './LangSelect.model';

describe('<LangSelect />', () => {
  test('should option support two languages', () => {
    const { getByText } = render(<LangSelect />);
    LANGUAGE_OPTIONS.forEach((option) => {
      getByText('General.Field.' + option.name);
    });
  });

  test('should default to be zhTW', () => {
    const defaultLang = Lang.ZhTw;
    const { container } = render(<LangSelect default={defaultLang} />);
    const select = container.querySelector('select');
    expect(select).toHaveProperty('value', defaultLang);
  });
});
