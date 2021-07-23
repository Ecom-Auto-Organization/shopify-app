import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import styles from '../../styles/main.scss';

const cx = classNames.bind(styles)

const propTypes = {
  // list of strings to render
  items: PropTypes.arrayOf(PropTypes.string),
}

const ListRenderer = ({items}) => {
  const [expand, setExpand] = React.useState(false);

  let itemsToRender = [];

  if (items !== undefined && items.length > 0) itemsToRender = items.slice(0,1);
  if (expand) itemsToRender = items.slice(0);
  let triggerMessage = expand ? 'show less' : 'show more';

  const listContent = itemsToRender.map((item, index) => {
    const itemStr = String(item).trim();
    let liClass = '';
    if (itemStr.includes('https://') && !itemStr.includes(" ")) liClass = 'url-ellipsis';
    return (<li key={index} className={cx(liClass)}>{item}</li>)
  })

  return (
    <>
      {
        itemsToRender.length > 0 ? 
        <ul className={cx('item-list')}>
          {listContent}
          {items.length > 1 && <li className={cx('trigger')}><a onClick={() => setExpand(!expand)}>{triggerMessage}</a></li>}
        </ul> : null}
    </>
  );
};

ListRenderer.proptypes = propTypes
export default ListRenderer;
