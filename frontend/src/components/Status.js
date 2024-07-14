import React, { useEffect, useState } from 'react';

const Status = () => {
  const [status, setStatus] = useState('');
  const apiUrl ='http://localhost:5000';

  useEffect(() => {
    fetch(`${apiUrl}/api/status`)
      .then(response => response.json())
      .then(data => setStatus(data.status))
      .catch(error => console.error('Error fetching status:', error));
  }, [apiUrl]);

  return (
    <div>
      <h1>Backend Status: {status}</h1>
    </div>
  );
};

export default Status;