/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { IconButton, makeStyles, TextField } from '@material-ui/core';

import WidgetToolbar from '../WidgetToolbar';
import { updateWidget } from '../../features/widgetsSlice';

const useStyles = makeStyles(() => ({
  linkItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '4px',
  },
  linkFavicon: { marginRight: '8px' },
  linkAnchor: { textDecoration: 'none', color: '#000' },
}));

function QuickLinksWidget({ id, links }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  return (
    <div className="commonWidget">
      <WidgetToolbar title="Links" id={id} />
      <div className={classes.noteText}>
        {!links.length && <div>You don&apos;t have any links saved yet</div>}
        {links.map((link, idx) => (
          <div className={classes.linkItem} key={idx}>
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
      url: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};

QuickLinksWidget.defaultProps = {};

export default QuickLinksWidget;
