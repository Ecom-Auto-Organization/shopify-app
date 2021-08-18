import React, { useRef } from 'react';
import PropTypes from 'prop-types'
import { Input, Radio, Button, Table, Alert, Tag } from 'antd'
import ListRenderer from './reusable/ListRenderer';
import InputTitle from './reusable/InputTitle';
import ShopifyFieldInput from './reusable/ShopifyFieldInput';
import { ProductStatus } from '../utils';
import classNames from 'classnames/bind'
import { InfoCircleFilled } from '@ant-design/icons';
import styles from '../styles/main.scss';

const cx = classNames.bind(styles);

const propTypes = {
  // an array with spreadsheet column details
  columnDetails: PropTypes.arrayOf(PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      sampleData: PropTypes.arrayOf(PropTypes.string)
    }
  )),
  // A boolean to indicate whether file upload succeeded
  isFileUploadSucceeded: PropTypes.bool.isRequired,
  // list of user locations
  locations: PropTypes.arrayOf(PropTypes.object),
  // function to handle column config change
  handleColumnConfigChange: PropTypes.func.isRequired,
  // the configurations of the columns
  columnConfig: PropTypes.arrayOf(PropTypes.object),
  // function to import products
  handleProductImport: PropTypes.func.isRequired,
  // a boolean indicating that product import is in progress
  isImportingProduct: PropTypes.bool.isRequired,
  // function to auto detect shopify fields from file columns
  handleAutoDetect: PropTypes.func.isRequired,
};

const ImportDetailForm = ({
  columnDetails,
  isFileUploadSucceeded,
  locations,
  handleColumnConfigChange,
  columnConfig,
  handleProductImport,
  isImportingProduct,
  handleAutoDetect
}) => {
  const [tags, setTags] = React.useState([]);
  const [tagInput, setTagInput] = React.useState('');
  const [defaultStatus, setDefaultStatus] = React.useState(ProductStatus.draft);
  const [publishedState, setPublishedState] = React.useState(false);
  const scrollRef = useRef();

  React.useEffect(() => {
    if (isFileUploadSucceeded) {
      scrollRef.current.scrollIntoView({ behavior: "auto", block: "start" });
    }
  }, [isFileUploadSucceeded])
  const columns = [
    {
      title: 'Spreadsheet Column',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Sample Data',
      dataIndex: 'sampleData',
      ellipsis: { showTitle: false},
      render: (text, record) => <ListRenderer items={record.sampleData} />
    },
    {
      title: 'Shopify Field Input',
      key: 'index',
      render: (text, record) => <ShopifyFieldInput index={record.index} locations={locations} handleColumnConfigChange={handleColumnConfigChange} column={columnConfig[record.index]} />
    }
  ];

  const productTags = tags.length > 0 ? tags.map(tag => (<Tag className={cx('product-tag')} key={tag} closable onClose={() => handleClose(tag)} >{tag}</Tag>)) : null;

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  }

  const handlePublishStateChange = (event) => {
    setPublishedState(event.target.value);
  }

  const handleProductStatusChange = (event) => {
    setDefaultStatus(event.target.value);
  }

  const handleTagInputSubmit = () => {
    const matchTags = tags.filter(tag => tag.toLowerCase() === tagInput.toLowerCase());
    if (tagInput !== '' && matchTags.length === 0) {
      const tempTags = [...tags, tagInput];
      setTagInput('');
      setTags(tempTags);
    }
  }

  const importProducts = () => {
    const options = {
      addedTags: tags,
      defaultStatus: defaultStatus,
      defaultPublishedStatus: publishedState
    }
    handleProductImport(options);
  }

  const autoDetect = () => {
    handleAutoDetect();
  }
  const handleClose = (removedTag) => {
    const tempTags = tags.filter(tag => tag !== removedTag);
    setTags(tempTags);
  }

  return (
    <div className={cx('import-details')} ref={scrollRef}>
      <div className={cx('import-options')}>
        <div className={cx('option-input')}>
          <InputTitle title="Default Product Status" subTitle="Used if product status is not provided for a given product within your spreadsheet."/>
          <Radio.Group value={defaultStatus} onChange={handleProductStatusChange} disabled={isImportingProduct} >
            <Radio value={ProductStatus.draft} >Draft</Radio>
            <Radio value={ProductStatus.active} >Active</Radio>
          </Radio.Group>
        </div>
        <div className={cx('option-input')}>
          <InputTitle title="Default Published State" subTitle="Used if product published state is not provided for a given product within your spreadsheet."/>
          <Radio.Group value={publishedState} onChange={handlePublishStateChange} disabled={isImportingProduct} >
            <Radio value={false}>Not Published</Radio>
            <Radio value={true}>Published</Radio>
          </Radio.Group>
        </div>
        <div className={cx('option-input', 'last')}>
          <InputTitle title="Add Tags" subTitle="Add tags to the uploaded products."/>
          <Input 
            placeholder="eg. summer" 
            className={cx('tag-input')} 
            value={tagInput}
            onChange={handleTagInputChange} 
            onPressEnter={handleTagInputSubmit} 
            disabled={isImportingProduct}
          />
          {productTags}
        </div>
      </div>
      <Alert
        message="Shopify Field Matching Tips"
        description={
          <>Use the section below to match your spreadsheet 
          columns to product fields in shopify. For more information on 
          shopify product fields, check out <a href="https://help.shopify.com/en/manual/products/details" target="_blank">shopify's documentations</a></>}
        type="info"
        showIcon
        icon={<InfoCircleFilled />}
        closable
        className={cx('match-field-info')}
      />
      <div className={cx('match-fields')}>
        <div className={cx('match-field-header')}>
          <span>Match Column Fields</span>
          <span><Button onClick={autoDetect}>Auto Detect Fields</Button></span>
        </div>
          <Table rowKey="index" columns={columns} dataSource={columnDetails} pagination={false} loading={false} loading={isImportingProduct} /> 
          <div className={cx('import-product')}>
            <Button 
              type="primary" 
              onClick={importProducts} 
              loading={isImportingProduct} 
            >
              Import Products
            </Button>
          </div>
      </div>
    </div>
  );
};

ImportDetailForm.proptypes = propTypes
export default ImportDetailForm;