import React, { useState, useEffect } from 'react';
import AddReference from './AddReference';
import './App.css';

function ReferenceList() {
  const [references, setReferences] = useState([]);

  function fetchReferences() {
    console.log('Fetching references...');
    fetch('http://35.87.198.76/api/references') // Update the URL to '/api/references'
      .then(response => response.json())
      .then(data => {
        setReferences(data);
      })
      .catch(error => {
        console.error('Error fetching references:', error);
      });
  }

  useEffect(() => {
    fetchReferences();
  }, []);

  return (
    <div>
      <AddReference />

      <div id="reference-list">
        {references.map(reference => (
          <div key={reference.id} className="reference">
            <div className="reference-header">
              <h3>{reference.name}</h3>
              <p>{reference.email}</p>
            </div>
            <p>{reference.reference_content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReferenceList;
