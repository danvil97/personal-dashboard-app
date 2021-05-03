/* eslint-disable import/no-extraneous-dependencies */
import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import WidgetBase from './WidgetBase';

const ReactGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(() => ({
  gridItem: {
    backgroundColor: '#FCF9F9',
    boxShadow: '-2px 2px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '5px',
    margin: '8px',
  },
}));

function WidgetsGrid() {
  const [layout] = useState();
  const classes = useStyles();

  return (
    <ReactGridLayout
      className="layout"
      rowHeight={100}
      layout={layout}
      isResizable
      isDraggable
      cols={{ lg: 7, md: 5, sm: 4, xs: 2, xxs: 2 }}
      breakpoints={{ lg: 1750, md: 1500, sm: 768, xs: 480, xxs: 0 }}
      draggableHandle=".draggableHandle"
    >
      <div key="a" minW={2} minH={2} maxW={3} className={`${classes.gridItem} app-grid-item`}>
        <WidgetBase title="i am title">
          Hi i am widgetHi i am widgetHi i am widgetHi i am widgetHi i am widget
        </WidgetBase>
      </div>
      <div key="b" minW={2} minH={1} className={`${classes.gridItem} app-grid-item`}>
        <WidgetBase title="i am title">
          Hi i am widgetHi i am widgetHi i am widgetHi i am widgetHi i am widget
        </WidgetBase>
      </div>
      <div key="c" minW={2} minH={1} className={`${classes.gridItem} app-grid-item`}>
        <WidgetBase title="i am title">
          Hi i am widgetHi i am widgetHi i am widgetHi i am widgetHi i am widget
        </WidgetBase>
      </div>
    </ReactGridLayout>
  );
}

export default WidgetsGrid;
