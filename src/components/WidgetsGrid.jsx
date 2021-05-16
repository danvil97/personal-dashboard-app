/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { Responsive, WidthProvider } from 'react-grid-layout';

import { selectWidgets, updateWidgetGridSettings } from '../features/widgetsSlice';
import chooseWidget from '../utils/chooseWidget';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ReactGridLayout = WidthProvider(Responsive);

const useStyles = makeStyles(() => ({
  gridItem: {
    backgroundColor: '#FCF9F9',
    boxShadow: '0px 0px 3px 0px rgb(0 0 0 / 25%)',
    borderRadius: '5px',
    margin: '8px',
    overflowY: 'hidden',
  },
}));

function WidgetsGrid() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);
  const [layout, setLayout] = useState();

  const handleLayoutChange = (newLayout) => {
    setLayout(newLayout);
    dispatch(updateWidgetGridSettings(newLayout));
  };

  return (
    <ReactGridLayout
      className="layout"
      rowHeight={100}
      layout={layout}
      isResizable
      isDraggable
      cols={{ lg: 7, md: 7, sm: 4, xs: 2, xxs: 2 }}
      breakpoints={{ lg: 1750, md: 1500, sm: 768, xs: 480, xxs: 0 }}
      draggableHandle=".draggableHandle"
      onLayoutChange={handleLayoutChange}
    >
      {widgets.map((widget) => {
        const customMinMax = {
          x: 0,
          y: 0,
          ...widget.gridSettings,
        };
        const widgetContent = chooseWidget(widget.name, { id: widget.id, ...widget });
        return (
          <div
            key={widget.id}
            data-grid={customMinMax}
            className={`${classes.gridItem} app-grid-item`}
          >
            {widgetContent}
          </div>
        );
      })}
    </ReactGridLayout>
  );
}

export default WidgetsGrid;
