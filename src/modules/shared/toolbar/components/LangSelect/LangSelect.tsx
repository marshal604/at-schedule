import React, { FunctionComponent, useState } from 'react';

import i18next from 'i18next';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Lang, LangSelectProps } from './LangSelect.model';
const LangSelect: FunctionComponent<LangSelectProps & WithTranslation> = (props) => {
  const [state] = useState({
    value: props.default
  });
  const langs = [
    {
      id: Lang.English,
      name: 'English'
    },
    {
      id: Lang.ZhTw,
      name: 'ZhTw'
    }
  ];

  const onSelect = (lang: Lang) => {
    i18next.changeLanguage(lang);
    state.value = lang;
  };

  return (
    <select onChange={(event) => onSelect(event.target.value as Lang)} value={state.value}>
      {langs.map((lang) => (
        <option value={lang.id}>{props.t('General.Field.' + lang.name)}</option>
      ))}
    </select>
  );
};

export default withTranslation()(LangSelect);
