import React from 'react';
import PropTypes, { object } from 'prop-types'
import { message } from 'antd'
import FileUploader from './FileUploader'
import ImportDetailForm from './ImportDetailForm';
import { TaskType, AutoDetectField } from '../utils';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../styles/main.scss';

const cx = classNames.bind(styles);

const propTypes = {
  // A boolean to indicate whether import file upload is in progress
  isFileUploading: PropTypes.bool.isRequired,
  // A boolean to indicate whether file upload failed
  isFileUploadFailed: PropTypes.bool.isRequired,
  // a function to upload file
  uploadFile: PropTypes.func.isRequired,
  // a function to reset upload details
  resetUploadDetails: PropTypes.func.isRequired,
  // the details of the file being uploaded
  uploadDetails: PropTypes.arrayOf(object).isRequired,
  // A boolean to indicate whether file upload succeeded
  isFileUploadSucceeded: PropTypes.bool.isRequired,
  // a boolean indicating that product import is in progress
  isImportingProduct: PropTypes.bool.isRequired,
  // a boolean indicating that product import was successful
  isProductImportSucceeded: PropTypes.bool.isRequired,
  // a boolean indicating that product import failed
  isProductImportFailed: PropTypes.bool.isRequired,
  // id for the new job created by the product import
  newJobId: PropTypes.string.isRequired,
  // function to create a job to import product
  importProduct: PropTypes.func.isRequired,
  // function to clear upload file success flag
  clearUploadFileSuccessFlag: PropTypes.func.isRequired
};

const ProductImportPage = ({
  isFileUploading,
  isFileUploadFailed,
  isFileUploadSucceeded,
  uploadFile,
  resetUploadDetails,
  uploadDetails,
  isImportingProduct,
  isProductImportSucceeded,
  isProductImportFailed,
  newJobId,
  importProduct,
  clearUploadFileSuccessFlag
}) => {
  const [columnFieldSet, setColumnFieldSet] = React.useState(new Set());
  const [columnConfig, setColumnConfig] = React.useState([]);
  React.useEffect(() => {
    if (isFileUploadFailed) {
      message.error('An error occured whiles uploading the file.', 7);
    } else if (isFileUploadSucceeded) {
      message.success('File uploaded successfully.', 3);
    }
  }, [isFileUploadFailed, isFileUploadSucceeded])
  const columnDetails = uploadDetails.columnDetails ? [...uploadDetails.columnDetails] : null;
  const locations = uploadDetails.locations ? [...uploadDetails.locations] : null;
  const multipleFieldSet = new Set(['descriptionHtml', 'imageSrc']);

  React.useEffect(() => {
    if (uploadDetails.columnDetails) {
      const uploadDetailsCopy = JSON.parse(JSON.stringify(uploadDetails));
      setColumnConfig(uploadDetailsCopy.columnDetails.map(column => {
        delete column.sampleData;
        return column
      }))
    }
  }, [uploadDetails, setColumnConfig])

  React.useEffect(() => {
    if (isProductImportFailed) {
      message.error('An issue occured whiles creating a job to import products.', 7);
    } else if (isProductImportSucceeded) {
      message.success('Product import job created successfully.', 3);
      resetUploadDetails();
      clearUploadFileSuccessFlag();
    }
  }, [isProductImportFailed, isProductImportSucceeded])

  if (isProductImportSucceeded) {
    return (<Redirect to={{ pathname: `/jobs/${newJobId}` }} />);
  }

  const handleUpload = (fileObj, rowOption, rowNumber) => {
    const formData = new FormData();
    formData.append('file', fileObj);
    formData.append('header-option', rowOption);
    if (rowOption === 'EXACT') formData.append('header-row', rowNumber);
    setColumnFieldSet(new Set());
    uploadFile(formData);
  }

  const handleProductImport = (options) => {
    if (!columnFieldSet.has('title')) {
      message.error('Title field is required. Please match the title field.', 10);
    } else if (columnFieldSet.has('option1Name') && !columnFieldSet.has('option1Value')) {
      message.error('Option 1 Name was set, but with no matching Option 1 value.', 10);
    } else if (columnFieldSet.has('option2Name') && !columnFieldSet.has('option2Value')) {
      message.error('Option 2 Name was set, but with no matching Option 2 value.', 10);
    } else if (columnFieldSet.has('option3Name') && !columnFieldSet.has('option3Value')) {
      message.error('Option 3 Name was set, but with no matching Option 3 value.', 10);
    } else {
      const taskType = TaskType.create_products;
      const fileId = uploadDetails.fileId;
      const fields = [ ...columnConfig ];
      importProduct(taskType, fileId, options, fields);
    }
  }

  const handleColumnConfigChange = (index, columnValue, isAdditionalFieldInfo) => {
    let tempFieldSet = new Set(columnFieldSet);
    const tempConfig = [ ...columnConfig ];
    if (tempFieldSet.has(columnValue.field) && !multipleFieldSet.has(columnValue.field) && !isAdditionalFieldInfo) {
      message.error('This field can only be assigned to one column.', 5);
      return;
    }
    if (tempConfig[index].field != null && tempFieldSet.has(tempConfig[index].field)) {
      tempFieldSet.delete(tempConfig[index].field);
    }
    tempConfig[index] = columnValue;
    if (tempConfig[index].field !== null) {
      tempFieldSet.add(tempConfig[index].field);
    }
    setColumnFieldSet(tempFieldSet)
    setColumnConfig(tempConfig);
  }

  const handleAutoDetect = () => {
    const tempConfig = [ ...columnConfig ];
    const autoDectResults = AutoDetectField(tempConfig, locations[0]?.id);
    setColumnConfig(autoDectResults.columns);
    setColumnFieldSet(autoDectResults.fieldSet);
    message.success('Auto Dectect Successful. Please ensure fields were matched correctly', 10);
  }

  return (
    <div>
      <FileUploader handleUpload={handleUpload} isFileUploading={isFileUploading} isFileUploadSucceeded={isFileUploadSucceeded} />
      {columnDetails !== null && 
      <ImportDetailForm 
        columnDetails={columnDetails}   
        isFileUploadSucceeded={isFileUploadSucceeded} 
        locations={locations} 
        handleColumnConfigChange={handleColumnConfigChange} 
        columnConfig={columnConfig} 
        handleProductImport={handleProductImport}
        isImportingProduct={isImportingProduct}
        handleAutoDetect={handleAutoDetect}
      />}
    </div>
  );
};

ProductImportPage.proptypes = propTypes
export default ProductImportPage;