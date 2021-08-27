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
        return <>{moment(record.start_time).format('MMM D, YYYY h:mma')}</>;
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

export const AutoDetectField = (columns, locationId) => {
  let fieldSet = new Set();
  const modifiedColumns = columns.map(column => {
    if (column.name.toLowerCase() === 'title' || (column.name.toLowerCase().includes('title') && column.name.toLowerCase().includes('product'))) {
      if (!fieldSet.has('title')) {
        column.field = 'title';
        fieldSet.add('title');
      }
    } else if (column.name.toLowerCase() === 'handle' || (column.name.toLowerCase().includes('handle') && column.name.toLowerCase().includes('product'))) {
      if (!fieldSet.has('handle')) {
        column.field = 'handle';
        fieldSet.add('handle');
      }
    } else if (column.name.toLowerCase().includes('description') || (column.name.toLowerCase().includes('body') && column.name.toLowerCase().includes('html'))) {
      column.field = 'descriptionHtml';
    } else if (column.name.toLowerCase().includes('vendor')) {
      if (!fieldSet.has('vendor')) {
        column.field = 'vendor';
        fieldSet.add('vendor');
      }
    } else if ((column.name.toLowerCase().includes('type') && column.name.length < 6) || (column.name.toLowerCase().includes('product') && column.name.toLowerCase().includes('type'))) {
      if (!fieldSet.has('productType')) {
        column.field = 'productType';
        fieldSet.add('productType');
      }
    } else if (column.name.toLowerCase().includes('tag') && column.name.length < 5) {
      if (!fieldSet.has('tags')) {
        column.field = 'tags';
        fieldSet.add('tags');
      }
    } else if (column.name.toLowerCase().includes('publish') && column.name.length < 10) {
      if (!fieldSet.has('published')) {
        column.field = 'published';
        fieldSet.add('published');
      }
    } else if (column.name.toLowerCase().includes('option') && column.name.toLowerCase().includes('name') && (column.name.toLowerCase().includes('1') || column.name.toLowerCase().includes('one'))) {
      if (!fieldSet.has('option1Name')) {
        column.field = 'option1Name';
        fieldSet.add('option1Name');
      }
    } else if (column.name.toLowerCase().includes('option') && column.name.toLowerCase().includes('name') && (column.name.toLowerCase().includes('2') || column.name.toLowerCase().includes('two'))) {
      if (!fieldSet.has('option2Name')) {
        column.field = 'option2Name';
        fieldSet.add('option2Name');
      }
    } else if (column.name.toLowerCase().includes('option') && column.name.toLowerCase().includes('name') && (column.name.toLowerCase().includes('3') || column.name.toLowerCase().includes('three'))) {
      if (!fieldSet.has('option3Name')) {
        column.field = 'option3Name';
        fieldSet.add('option3Name');
      }
    } else if ((column.name.toLowerCase().includes('image') && column.name.length < 7) ||
      (column.name.toLowerCase().includes('image') && (column.name.toLowerCase().includes('src') || column.name.toLowerCase().includes('source'))) || 
      (column.name.toLowerCase().includes('image') && column.name.toLowerCase().includes('product'))) {
      column.field = 'imageSrc';
    } else if (column.name.toLowerCase().includes('status') && column.name.length < 8) {
      if (!fieldSet.has('status')) {
        column.field = 'status';
        fieldSet.add('status');
      }
    } else if (column.name.toLowerCase().includes('seo') && column.name.toLowerCase().includes('title')) {
      if (!fieldSet.has('seoTitle')) {
        column.field = 'seoTitle';
        fieldSet.add('seoTitle');
      }
    } else if (column.name.toLowerCase().includes('seo') && column.name.toLowerCase().includes('description')) {
      if (!fieldSet.has('seoDescription')) {
        column.field = 'seoDescription';
        fieldSet.add('seoDescription');
      }
    } else if (column.name.toLowerCase().includes('collection')) {
      if (!fieldSet.has('customCollections')) {
        column.field = 'customCollections';
        fieldSet.add('customCollections');
      }
    } else if ((column.name.toLowerCase().includes('sku') && column.name.length < 5) || (column.name.toLowerCase().includes('sku') && column.name.toLowerCase().includes('variant'))) {
      if (!fieldSet.has('variantSku')) {
        column.field = 'variantSku';
        fieldSet.add('variantSku');
      }
    } else if (column.name.toLowerCase().includes('barcode')) {
      if (!fieldSet.has('variantBarcode')) {
        column.field = 'variantBarcode';
        fieldSet.add('variantBarcode');
      }
    } else if (column.name.toLowerCase().includes('option') && column.name.toLowerCase().includes('value') && (column.name.toLowerCase().includes('1') || column.name.toLowerCase().includes('one'))) {
      if (!fieldSet.has('option1Value')) {
        column.field = 'option1Value';
        column.defaultOptionName = column.name;
        fieldSet.add('option1Value');
      }
    } else if (column.name.toLowerCase().includes('option') && column.name.toLowerCase().includes('value') && (column.name.toLowerCase().includes('two') || column.name.toLowerCase().includes('2'))) {
      if (!fieldSet.has('option2Value')) {
        column.field = 'option2Value';
        column.defaultOptionName = column.name;
        fieldSet.add('option2Value');
      }
    } else if (column.name.toLowerCase().includes('option') && column.name.toLowerCase().includes('value') && (column.name.toLowerCase().includes('three') || column.name.toLowerCase().includes('3'))) {
      if (!fieldSet.has('option3Value')) {
        column.field = 'option3Value';
        column.defaultOptionName = column.name;
        fieldSet.add('option3Value');
      }
    } else if ((column.name.toLowerCase().includes('weight') && column.name.length < 8) || (column.name.toLowerCase().includes('weight') && column.name.toLowerCase().includes('variant'))) {
      if (!fieldSet.has('variantWeight')) {
        column.field = 'variantWeight';
        column.weightUnit = 'POUNDS';
        fieldSet.add('variantWeight');
      }
    } else if (column.name.toLowerCase().includes('available') || column.name.toLowerCase().includes('quantity')) {
      if (!fieldSet.has('variantQuantity')) {
        column.field = 'variantQuantity';
        column.location = locationId;
        fieldSet.add('variantQuantity');
      }
    } else if (column.name.toLowerCase().includes('track') && column.name.length < 9) {
      if (!fieldSet.has('variantTracked')) {
        column.field = 'variantTracked';
        fieldSet.add('variantTracked');
      }
    } else if (column.name.toLowerCase().includes('inventory') && column.name.toLowerCase().includes('policy')) {
      if (!fieldSet.has('variantInventoryPolicy')) {
        column.field = 'variantInventoryPolicy';
        fieldSet.add('variantInventoryPolicy');
      }
    } else if (column.name.toLowerCase().includes('price') && !column.name.toLowerCase().includes('compare')) {
      if (!fieldSet.has('variantPrice')) {
        column.field = 'variantPrice';
        fieldSet.add('variantPrice');
      }
    } else if (column.name.toLowerCase().includes('price') && column.name.toLowerCase().includes('compare')) {
      if (!fieldSet.has('variantCompareAtPrice')) {
        column.field = 'variantCompareAtPrice';
        fieldSet.add('variantCompareAtPrice');
      }
    } else if (column.name.toLowerCase().includes('require') && column.name.toLowerCase().includes('ship')) {
      if (!fieldSet.has('variantRequireShipping')) {
        column.field = 'variantRequireShipping';
        fieldSet.add('variantRequireShipping');
      }
    } else if (column.name.toLowerCase().includes('taxable')) {
      if (!fieldSet.has('variantTaxable')) {
        column.field = 'variantTaxable';
        fieldSet.add('variantTaxable');
      }
    } else if (column.name.toLowerCase().includes('image') && column.name.toLowerCase().includes('variant')) {
      if (!fieldSet.has('variantImage')) {
        column.field = 'variantImage';
        fieldSet.add('variantImage');
      }
    } else if (column.name.toLowerCase().includes('tax') && column.name.toLowerCase().includes('code')) {
      if (!fieldSet.has('variantTaxcode')) {
        column.field = 'variantTaxcode';
        fieldSet.add('variantTaxcode');
      }
    } else if (column.name.toLowerCase().includes('cost')) {
      if (!fieldSet.has('variantCost')) {
        column.field = 'variantCost';
        fieldSet.add('variantCost');
      }
    }
    return column;
  });
  return {
    columns: modifiedColumns,
    fieldSet: fieldSet
  };
}