import React from 'react';
import PropTypes from 'prop-types'
import { Select, Input } from 'antd'
import { ShopifyFields, WeightUnits } from '../../utils/index';
import classNames from 'classnames/bind'

import styles from '../../styles/main.scss';

const cx = classNames.bind(styles);

const propTypes = {
  // the index of the column
  index: PropTypes.number.isRequired,
  // list of user locations
  locations: PropTypes.arrayOf(PropTypes.object),
  // function to handle column config change
  handleColumnConfigChange: PropTypes.func.isRequired,
  // the column for this input
  column: PropTypes.object.isRequired
};

const ShopifyFieldInput = ({
  index,
  locations,
  handleColumnConfigChange,
  column
}) => {
  const [field, setField] = React.useState('');

  const handleWeightUnitChange = (value) => {
    const columnValue = { ...column }
    columnValue.weightUnit = value;
    handleColumnConfigChange(index, columnValue, true);
  }

  const handleDefaultOptionNameChange = (event) => {
    const columnValue = { ...column }
    columnValue.defaultOptionName = event.target.value;
    handleColumnConfigChange(index, columnValue, true);
  }

  const handleLocationChange = (value) => {
    const columnValue = { ...column }
    columnValue.location = value;
    handleColumnConfigChange(index, columnValue, true);
  }

  const shopifyFieldOptions = ShopifyFields.map(field => {
    if (field.value === 'pf' || field.value === 'vf') {
      return (<Select.Option key={field.name} value={field.value} disabled>{field.name}</Select.Option>)
    } else {
      return (<Select.Option key={field.name} value={field.value}>{field.name}</Select.Option>)
    }
  })
  const shopifyLocationOptions = locations.map(location =>
    (<Select.Option key={location.id} value={location.id} >{location.name}</Select.Option>)
  )

  const weightUnitOptions = WeightUnits.map(unit => <Select.Option key={unit.name} value={unit.value}>{unit.name}</Select.Option>)

  const defaultOptionNameInput = (<><div className={cx('additional-input')}>Enter Default Option Name</div><Input maxLength={30} value={column?.defaultOptionName} onChange={handleDefaultOptionNameChange} /></>);
  const variantWeightUnitInput = (
    <> 
      <div className={cx('additional-input')}>Select Weight Unit</div>
      <Select value={column?.weightUnit} className={cx('shopify-input')} onChange={handleWeightUnitChange}>
        {weightUnitOptions}
      </Select>
    </>
  );

  const locationInput = (
    <>
      <div className={cx('additional-input')}>Select Location</div>
      <Select value={column?.location} className={cx('shopify-input')} onChange={handleLocationChange} >
        {shopifyLocationOptions}
      </Select>
    </>
  );

  let additionalInput = null;
  if (column?.field === 'option1Value' || column?.field == 'option2Value' || column?.field == 'option3Value') {
    additionalInput = defaultOptionNameInput;
  } else if (column?.field === 'variantWeight') {
    additionalInput = variantWeightUnitInput;
  } else if (column?.field === 'variantQuantity') {
    additionalInput = (locations.length > 1) ? locationInput : null;
  }

  const handleFieldChange = (value) => {
    setField(value);
    const columnValue = { ...column }
    columnValue.field = value;
    //set initial variant weight
    if(value === 'variantWeight') {
      columnValue.weightUnit = 'POUNDS';
    } else {
      delete columnValue?.weightUnit;
    }
    //set initial default option name
    if(value === 'option1Value' || value == 'option2Value' || value == 'option3Value') {
      columnValue.defaultOptionName = columnValue.name;
    } else {
      delete columnValue?.defaultOptionName;
    }
    // set initial column location
    if (value === 'variantQuantity') {
      columnValue.location = locations[0]?.id;
    } else {
      delete columnValue.location;
    }
    handleColumnConfigChange(index, columnValue, false);
  }

  return (
    <>
      <Select value={column?.field} onChange={handleFieldChange} className={cx('shopify-input')}>
        {shopifyFieldOptions}
      </Select>
      {additionalInput}
    </>
  );
};

ShopifyFieldInput.proptypes = propTypes
export default ShopifyFieldInput;