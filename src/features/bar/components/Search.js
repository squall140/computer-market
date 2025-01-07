import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {FormattedMessage} from 'react-intl';
import { selectPreferences} from '../../wrappers/selector';
import { selectSearchStatus } from '../../product/selector';
import { Button } from 'antd';
import './search.scss';

const Search = () => {
  const preferences = useSelector(selectPreferences);
  const countryCode = preferences?.countryCode;
  const searchStatus = useSelector(selectSearchStatus);
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!countryCode){
      setDisabled(true);
      return;
    }
    setDisabled(false);
  },[countryCode])

  const handleSearch = async () => {
    if(disabled){
      return;
    }
    // 处理搜索逻辑
    console.log('Search clicked');
  }

  return (
    <div className="search-container">
      <Button
        id="search-button"
        type="primary"
        onClick={handleSearch}
        disabled={disabled}
        loading={searchStatus === 'loading'}
      >
        <FormattedMessage id="SEARCH" defaultMessage="Search"/>
      </Button>
    </div>
  );
}

export default Search;
