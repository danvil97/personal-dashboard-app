/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { IconButton, makeStyles, TextField } from '@material-ui/core';
import { TiDeleteOutline } from 'react-icons/ti';

import WidgetToolbar from '../../WidgetToolbar';
import { removeQuickLink, updateWidget } from '../../../features/widgetsSlice';
import AddLinkPopover from './AddLinkPopover';

const useStyles = makeStyles(() => ({
  linkItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
    '&:hover .link-removeButton': { display: 'block' },
  },
  linkFavicon: { marginRight: '8px' },
  linkAnchor: { textDecoration: 'none', color: '#000' },
  removeButton: { marginLeft: 'auto', display: 'none' },
}));

function QuickLinksWidget({ id, links }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLinkRemove = (linkId) => {
    dispatch(removeQuickLink({ id, linkId }));
  };

  const customTools = [<AddLinkPopover key={0} id={id} />];
  return (
    <div className="commonWidget">
      <WidgetToolbar title="Links" id={id} customTools={customTools} />
      <div className={classes.noteText}>
        {!links.length && <div>You don&apos;t have any links saved yet</div>}
        {links.map((link) => (
          <div className={classes.linkItem} key={link.id}>
            <img
              className={classes.linkFavicon}
              height="16"
              width="16"
              src={`https://www.google.com/s2/favicons?domain=${link.url}`}
              alt={link.name}
            />
            <a
              className={classes.linkAnchor}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              {link.name}
            </a>
            <IconButton
              onClick={() => {
                handleLinkRemove(link.id);
              }}
              size="small"
              className={`${classes.removeButton} link-removeButton`}
            >
              <TiDeleteOutline />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}

QuickLinksWidget.propTypes = {
  id: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

QuickLinksWidget.defaultProps = {};

export default QuickLinksWidget;
