import React from 'react';
import PropTypes from 'prop-types'
import { Upload, message, Radio, Button, InputNumber } from 'antd'
import InputTitle from './reusable/InputTitle';
import classNames from 'classnames/bind'
import { InboxOutlined } from '@ant-design/icons';
import styles from '../styles/main.scss';

const cx = classNames.bind(styles);

const propTypes = {};

const FileUploader = () => {
  const [rowOption, setRowOption] = React.useState('DEFAULT');

  const uploadProps = {
    accept: '.xlsx, .xls, .csv',
    maxCount: 1,
    beforeUpload: file => false,
    name: 'productsFile'
  }
  const title = "Spreadsheet Header Row";
  const subTitle = "Used to determine which row to use for the column titles." + 
  " By default, the first non empty row is used as the title row." +  
  " You can also specify the spreadsheet row number to use as title row.";

  const rowNumberInput = (
    <div className={cx('row-number-input')}>
      <InputTitle title="Enter Row Number" />
      <InputNumber min={1} max={100} defaultValue={1} />
    </div>
  );

  const handleChange = (event) => {
    setRowOption(event.target.value)
  }

  return (
    <div className={cx('uploader')}>
      <Upload.Dragger {...uploadProps} >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag CSV or Excel file to this area to upload</p>
      </Upload.Dragger>
      <div className={cx('upload-file-info')}>
        <InputTitle title={title} subTitle={subTitle}/>
        <Radio.Group defaultValue="DEFAULT" onChange={handleChange}>
          <Radio value='DEFAULT'>First Non Empty Row</Radio>
          <Radio value='EXACT'>By Row Number</Radio>
        </Radio.Group>
        {rowOption === 'EXACT' && rowNumberInput}
        <Button type="primary">Upload File</Button>
      </div>
    </div>
  );
};

FileUploader.proptypes = propTypes
export default FileUploader;