import React, { useRef } from 'react';
import PropTypes, { number } from 'prop-types'
import { Upload, message, Radio, Button, InputNumber } from 'antd'
import InputTitle from './reusable/InputTitle';
import classNames from 'classnames/bind'
import { InboxOutlined } from '@ant-design/icons';
import styles from '../styles/main.scss';

const cx = classNames.bind(styles);

const propTypes = {
  // a function to handle upload when the upload button is clicked
  handleUpload: PropTypes.func.isRequired,
  // A boolean to indicate whether import file upload is in progress
  isFileUploading: PropTypes.bool.isRequired,
  // A boolean to indicate whether file upload succeeded
  isFileUploadSucceeded: PropTypes.bool.isRequired
};

const FileUploader = ({
  handleUpload,
  isFileUploading,
  isFileUploadSucceeded
}) => {
  const [rowOption, setRowOption] = React.useState('DEFAULT'); //this determines how we will read the excel. default is read from first non empty row.
  const [fileList, setFileList] = React.useState([]);
  const [row, setRow] = React.useState(1);

  React.useEffect(() => {
    if (isFileUploadSucceeded) {
      resetUpload();
    }
  }, [isFileUploadSucceeded])

  const uploadProps = {
    accept: '.xlsx, .xls, .csv',
    maxCount: 1,
    beforeUpload: file => {
      if (file.size > 10000000) {
        message.error('File is too large. File size cannot exceed 10MB', 7);
      } else {
        setFileList([file]);
      } 
      return false;
    },
    onRemove: () => {
      setFileList([]);
    },
    fileList,
    name: 'productsFile',
    disabled: isFileUploading
  }
  const title = "Spreadsheet Header Row";
  const subTitle = "Used to determine which row to use for the column titles." + 
  " By default, the first non empty row is used as the title row." +  
  " You can also specify the spreadsheet row number to use as title row.";

  const onRowChange = (number) => {
    setRow(number);
  }

  const rowNumberInput = (
    <div className={cx('row-number-input')}>
      <InputTitle title="Enter Row Number" />
      <InputNumber min={1} max={100} value={row} onChange={onRowChange} />
    </div>
  );

  const resetUpload = () => {
    setFileList([]);
    setRow(1);
    setRowOption('DEFAULT');
  }

  const handleChange = (event) => {
    if(event.target.name === 'row_option') {
      if (event.target.value === 'DEFAULT') setRow(1);
      setRowOption(event.target.value);
    }
  }

  const upload = () => {
    handleUpload(fileList[0], rowOption, row);
  }

  return (
    <div className={cx('uploader')} >
      <Upload.Dragger {...uploadProps} >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag CSV or Excel file to this area to upload</p>
      </Upload.Dragger>
      <div className={cx('upload-file-info')}>
        <InputTitle title={title} subTitle={subTitle}/>
        <Radio.Group value={rowOption} name='row_option' onChange={handleChange}>
          <Radio value='DEFAULT'>First Non Empty Row</Radio>
          <Radio value='EXACT'>By Row Number</Radio>
        </Radio.Group>
        {rowOption === 'EXACT' && rowNumberInput}
        <Button 
          type="primary"
          disabled={ row === null || fileList.length === 0 || rowOption === null }
          onClick={upload}
          loading={isFileUploading}
        >
          Upload File
        </Button>
      </div>
    </div>
  );
};

FileUploader.proptypes = propTypes
export default FileUploader;