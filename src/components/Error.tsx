import React from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface IErrorProps {
  error: FetchBaseQueryError | SerializedError;
}

export function Error({ error }: IErrorProps) {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data);

    return (
      <div>
        <div>An error has occurred:</div>
        <div>{errMsg}</div>
      </div>
    );
  }

  return <div>{error.message}</div>;
}
