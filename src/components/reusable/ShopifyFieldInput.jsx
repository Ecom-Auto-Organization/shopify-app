import React from 'react';
import PropTypes from 'prop-types'
import { Select, Input } from 'antd'
import { ShopifyFields, WeightUnits } from '../../utils/index';
import classNames from 'classnames/bind'

import styles from '../../styles/main.scss';

const cx = classNames.bind(styles);

const propTypes = {};

const ShopifyFieldInput = ({items}) => {
  const [field, setField] = React.useState('');

  const shopifyFieldOptions = ShopifyFields.map(field => {
    if (field.value === null) {
      return (<Select.Option key={field.name} value={field.value} disabled>{field.name}</Select.Option>)
    } else {
      return (<Select.Option key={field.name} value={field.value}>{field.name}</Select.Option>)
    }
  })

  const weightUnitOptions = WeightUnits.map(unit => <Select.Option key={unit.name} value={unit.value}>{unit.name}</Select.Option>)

  const defaultOptionNameInput = (<><div className={cx('additional-input')}>Enter Default Option Name</div><Input maxLength={30} /></>);
  const variantWeightUnitInput = (
    <> 
      <div className={cx('additional-input')}>Select Weight Unit</div>
      <Select value="POUNDS" className={cx('shopify-input')}>
        {weightUnitOptions}
      </Select>
    </>
  );

  const locationInput = (
    <>
      <div className={cx('additional-input')}>Select Location</div>
      <Select value="LocationID1" className={cx('shopify-input')}>
        <Select.Option value="LocationID1">BackYard</Select.Option>
        <Select.Option value="LocationID2">Roanridge</Select.Option>
      </Select>
    </>
  );

  let additionalInput = null;
  if (field === 'option1Value' || field == 'option2Value' || field == 'option3Value') {
    additionalInput = defaultOptionNameInput;
  } else if (field === 'variantWeight') {
    additionalInput = variantWeightUnitInput;
  } else if (field === 'variantQuantity') {
    additionalInput = locationInput;
  }

  const handleChange = (value) => {
    setField(value);
  }

  return (
    <>
      <Select placeholder="Select Shopify Field" onChange={handleChange} className={cx('shopify-input')}>
        {shopifyFieldOptions}
      </Select>
      {additionalInput}
    </>
  );
};

ShopifyFieldInput.proptypes = propTypes
export default ShopifyFieldInput;