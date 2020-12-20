import React, { FunctionComponent } from 'react';

import i18next from 'i18next';

import LangSelect from 'src/modules/shared/toolbar/components/LangSelect/LangSelect';
import { Lang } from 'src/modules/shared/toolbar/components/LangSelect/LangSelect.model';
import style from './Toolbar.module.scss';
const Toolbar: FunctionComponent = () => {
  let currentLang = i18next.language as Lang;
  return (
    <div className={style['toolbar']}>
      <LangSelect default={currentLang} />
    </div>
  );
};

export default Toolbar;
