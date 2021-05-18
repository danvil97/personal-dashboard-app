import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { selectWidgets, setWidgetDataFromFirestoreThunk } from '../features/widgetsSlice';
import { db } from '../firebase';
import { selectUserId } from '../features/userSlice';

function FirebaseSyncButtton() {
  const widgets = useSelector(selectWidgets);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const getData = async () => {
    dispatch(setWidgetDataFromFirestoreThunk());
  };
  const postData = async () => {
    const response = db
      .collection('users')
      .doc(userId)
      .update({
        addedWidgets: widgets.map((widget) => JSON.stringify(widget)),
      });
    console.log(response);
  };

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
