import React from 'react';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
import moment from 'moment';

export const ShopifyFields = [
  {
    name: 'Select Shopify Field',
    value: null
  },
  {
    name: 'Product Fields',
    value: 'pf'
  },
  {
    name: 'Handle',
    value: 'handle'
  },
  {
    name: 'Title',
    value: 'title'
  },
  {
    name: 'Description',
    value: 'descriptionHtml'
  },
  {
    name: 'Vendor',
    value: 'vendor'
  },
  {
    name: 'Product Type',
    value: 'productType'
  },
  {
    name: 'Tags',
    value: 'tags'
  },
  {
    name: 'Published',
    value: 'published'
  },
  {
    name: 'Option1 Name',
    value: 'option1Name'
  },
  {
    name: 'Option2 Name',
    value: 'option2Name'
  },
  {
    name: 'Option3 Name',
    value: 'option3Name'
  },
  {
    name: 'Product Images',
    value: 'imageSrc'
  },
  {
    name: 'Status',
    value: 'status'
  },
  {
    name: 'SEO Title',
    value: 'seoTitle'
  },
  {
    name: 'SEO Description',
    value: 'seoDescription'
  },
  {
    name: 'Custom Collections',
    value: 'customCollections'
  },
  {
    name: 'Variant Fields',
    value: 'vf'
  },
  {
    name: 'Variant SKU',
    value: 'variantSku'
  },
  {
    name: 'Barcode',
    value: 'variantBarcode'
  },
  {
    name: 'Option1 Value',
    value: 'option1Value'
  },
  {
    name: 'Option2 Value',
    value: 'option2Value'
  },
  {
    name: 'Option3 Value',
    value: 'option3Value'
  },
  {
    name: 'Variant Weight',
    value: 'variantWeight'
  },
  {
    name: 'Variant Quantity',
    value: 'variantQuantity'
  },
  {
    name: 'Track Quantity',
    value: 'variantTracked'
  },
  {
    name: 'Inventory Policy',
    value: 'variantInventoryPolicy'
  },
  {
    name: 'Price',
    value: 'variantPrice'
  },
  {
    name: 'Compare At Price',
    value: 'variantCompareAtPrice'
  },
  {
    name: 'Requires Shipping',
    value: 'variantRequireShipping'
  },
  {
    name: 'Taxable',
    value: 'variantTaxable'
  },
  {
    name: 'Variant Image',
    value: 'variantImage'
  },
  {
    name: 'Variant Tax Code',
    value: 'variantTaxcode'
  },
  {
    name: 'Variant Cost',
    value: 'variantCost'
  }
]

export const WeightUnits = [
  {
    name: 'Pounds',
    value: 'POUNDS'
  },
  {
    name: 'Grams',
    value: 'GRAMS'
  },
  {
    name: 'Kilograms',
    value: 'KILOGRAMS'
  },
  {
    name: 'Ounces',
    value: 'OUNCES'
  }
]

export const ProductStatus = {
  active: 'ACTIVE',
  draft: 'DRAFT'
}

export const TaskType = {
  create_products: 'IMPORT_CREATE'
}

export const MenuKeyToUrl = {
  DASHBOARD: '/dashboard',
  IMPORT: '/import',
  JOBS: '/jobs',
  SETTINGS: '/settings',
  CUSTOMER: '/customer'
}

export const UrlToMenuKey = {
  dashboard: 'DASHBOARD',
  import: 'IMPORT',
  jobs: 'JOBS',
  settings: 'SETTINGS',
  customer: 'CUSTOMER'
}

export const HttpCodes = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
}

export const JobStatus = status => {
  let statusTag = null;
  switch(status) {
    case 'SUBMITTED':
      statusTag = <Tag icon={<ClockCircleOutlined />} color="default">Submitted</Tag>;
      break;
    case 'PREPARING':
      statusTag = <Tag icon={<SyncOutlined spin/>} color="cyan">Preparing</Tag>;
      break;
    case 'RUNNING':
      statusTag = <Tag icon={<SyncOutlined spin/>} color="processing">Running</Tag>;
      break;
    case 'COMPLETED':
      statusTag = <Tag icon={<CheckCircleOutlined />} color="success">Completed</Tag>;
      break;
    case 'PARTIALLY COMPLETED': 
      statusTag = <Tag icon={<ExclamationCircleOutlined />} color="warning">Partial Complete</Tag>;
      break;
    case 'FAILED': 
      statusTag = <Tag icon={<CloseCircleOutlined />} color="error">Failed</Tag>;
      break;
  }
  return statusTag;
}

export const JobType = type => {
  let jobType = '';
  switch(type) {
    case 'IMPORT_CREATE':
      jobType = 'Create Products';
      break;
    default:
      jobType = 'Unknown';
  }
  return jobType;
}

export const JobColumns = [
  {
    title: 'Start Time',
    key: 'start_time',
    render: record => {
      if(record.status === 'SUBMITTED' || record.status === 'PREPARING') {
        return <>Not Started</>;
      } else {
        return <>{moment(record.start_time).format('MMM D, YYYY h:MMa')}</>;
      }
    }
  },
  {
    title: 'Job Type',
    dataIndex: 'type',
    key: 'type',
    render: text => JobType(text)
  },
  {
    title: 'Status',
    key: 'status',
    render: (record) => {
      const status = record.status;
      return JobStatus(status);
    }
  },
  {
    title: 'Success/Total',
    key: 'total_products',
    render: (record) => (
      <>{ record.total_success ? record.total_success : 0 } / { record.total_products ? record.total_products : 0 }</>
    )
  }
];