import React from 'react';
import PropTypes from 'prop-types'
import { Upload } from 'antd'
import FileUploader from './FileUploader'
import ImportDetailForm from './ImportDetailForm';
import classNames from 'classnames/bind'
import styles from '../styles/main.scss';

const cx = classNames.bind(styles);

const propTypes = {};

const ProductImportPage = ({items}) => {

  const columnDetails = [
    {
      name: "title",
      index: 0,
      sampleData: [
        "a big cup",
        "a green skirt",
        "a blue chair"
      ],
      field: null
    },
    {
      name: "body html",
      index: 1,
      sampleData: [
        "a very very big cup",
        "a green skirt with pockets",
        "a very blue chair"
      ],
      field: null
    },
    {
      name: "description2",
      index: 2,
      sampleData: [
        "very exquisite",
        "very nice",
        "modern looking"
      ],
      field: null
    },
    {
      name: "description3",
      index: 3,
      sampleData: [
        "and very cheap",
        "classy",
        "easy to put together"
      ],
      field: null
    },
    {
      name: "price",
      index: 4,
      sampleData: [
        5,
        23,
        200
      ],
      field: null
    },
    {
      name: "image src",
      index: 5,
      sampleData: [
        "https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/dc/dd/84/5e/5e84dddc68ee5d56dd7334be/BC-1086-05.jpg,https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/86/08/f7/5c/5cf70886de06fd046b578b8c/BC-1016-02.jpg",
        "https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/30/23/f8/5c/5cf82330e5e4ad046b2854aa/BC-1044-03.jpg",
        "https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/40/4c/85/5d/5d854c4020ded144ad9ee830/BC-1047-03.jpg"
      ],
      field: null
    },
    {
      name: "image2",
      index: 6,
      sampleData: [
        "https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/f9/22/f8/5c/5cf822f9de06fd0464a8ec4a/BC-1033-03.jpg", NaN,
        "https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/c4/6a/1f/5e/5e1f6ac4dbc703ad5b827747/BC-1047-18.jpg"
      ],
      field: null
    },
    {
      name: "image3",
      index: 7,
      sampleData: [
        "https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/1c/23/f8/5c/5cf8231cde06fd0464a8ec4c/BC-1043-03.jpg",
        "https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/3e/23/f8/5c/5cf8233ede06fd0464a8ec50/BC-1045-18.jpg",
        "https://files.plytix.com/api/v1.1/file/public_files/pim/assets/a1/ae/d4/5c/5cd4aea1a3dec0046811d88f/images/dc/dd/84/5e/5e84dddc68ee5d56dd7334be/BC-1086-05.jpg"
      ],
      field: null
    },
    {
      name: "option1 value",
      index: 8,
      sampleData: [
        "white",
        "green",
        "blue"
      ],
      field: null
    },
    {
      name: "inventory",
      index: 9,
      sampleData: [
        34,
        3,
        45
      ],
      field: null
    },
    {
      name: "collection",
      index: 10,
      sampleData: [
        "new Collection",
        "new Collection", NaN
      ],
      field: null
    }
  ] 
  
  return (
    <div>
      <FileUploader />
      <ImportDetailForm columnDetails={columnDetails} />
    </div>
  );
};

ProductImportPage.proptypes = propTypes
export default ProductImportPage;