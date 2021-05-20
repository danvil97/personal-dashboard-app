import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton } from '@material-ui/core';
import { MdCached, MdCheck, MdSend } from 'react-icons/md';

import {
  selectWidgetsStatus,
  sendWidgetDataToFirestoreThunk,
  setWidgetDataFromFirestoreThunk,
} from '../features/widgetsSlice';

const ICON_COLORS = {
  isLoading: '#000099',
  isModified: '#e81d02',
  upToDate: '#13a439',
};
function FirebaseSyncButtton() {
  const dispatch = useDispatch();
  const widgetsStatus = useSelector(selectWidgetsStatus);

  const getData = async () => {
    dispatch(setWidgetDataFromFirestoreThunk());
  };
  const postData = async () => {
    dispatch(sendWidgetDataToFirestoreThunk());
  };

  if (widgetsStatus.isLoading)
    return (
      <IconButton size="small">
        <MdCached color={ICON_COLORS.isLoading} />
      </IconButton>
    );
  if (widgetsStatus.isModified)
    return (
      <IconButton onClick={postData} size="small">
        <MdSend color={ICON_COLORS.isModified} />
      </IconButton>
    );
  if (!widgetsStatus.isModified)
    return (
      <IconButton onClick={getData} size="small">
        <MdCheck color={ICON_COLORS.upToDate} />
      </IconButton>
    );

  return (
    <>
      <Button onClick={getData} color="secondary" variant="outlined">
        Get Data
      </Button>

      <Button onClick={postData} color="secondary" variant="outlined">
        Post Data
      </Button>
    </>
  );
}

export default FirebaseSyncButtton;
