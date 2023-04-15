import React from 'react';
import UploadFileForm from '../components/UploadFileForm';

const HomePage = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <UploadFileForm />
    </div>
  );
};

export default HomePage;
