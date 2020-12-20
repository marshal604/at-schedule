import React, { FunctionComponent, useState } from 'react';

import i18next from 'i18next';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Lang, LangSelectProps, LANG } from './LangSelect.model';
const LangSelect: FunctionComponent<LangSelectProps & WithTranslation> = (props) => {
  const [myLang, setMyLang] = useState(props.default);
  const langs = LANG;

  const onSelect = (lang: Lang) => {
    i18next.changeLanguage(lang);
    setMyLang(lang);
  };

  return (
    <select onChange={(event) => onSelect(event.target.value as Lang)} value={myLang}>
      {langs.map((lang) => (
        <option key={lang.toString()} value={lang.id}>
          {props.t('General.Field.' + lang.name)}
        </option>
      ))}
    </select>
  );
};

export default withTranslation()(LangSelect);
