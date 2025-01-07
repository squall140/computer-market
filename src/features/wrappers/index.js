import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Outlet} from "react-router-dom";
import {IntlProvider} from 'react-intl';
import { ConfigProvider, message } from 'antd';
import { selectError, selectPreferences } from './selector';
import {getBrowserLocal, getLocaleMessages} from '../../help/utils';
import localeData from '../../help/localeData';
import {FormattedMessage} from 'react-intl';

const Wrappers = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const preferences = useSelector(selectPreferences);
  const error = useSelector(selectError);
  const {languageCode} = getBrowserLocal();
  const locale = preferences.languageCode || languageCode;
  const antdLocale = localeData[locale];
  const messages = getLocaleMessages(locale);
  useEffect(() => {
    if(error){
      messageApi.open({
        type: 'error',
        content: <FormattedMessage id={error}/>,
      });
    }
  }, [error])
  
  return (
    <ConfigProvider locale={antdLocale}>
      <IntlProvider locale={locale} messages={messages}>
        {contextHolder}
        <Outlet />
      </IntlProvider>
    </ConfigProvider>
  );
}
export default Wrappers;
