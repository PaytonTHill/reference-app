import React, { useState, useEffect } from 'react';
import AddReference from './AddReference';
import DeleteReference from './DeleteReference';
import './App.css';

function ReferenceList() {
  const [references, setReferences] = useState([]);

  function fetchReferences() {
    console.log('Fetching references...');
    fetch('https://35.87.198.76/api/references')
      .then(response => response.json())
      .then(data => {
        setReferences(data);
      })
      .catch(error => {
        console.error('Error fetching references:', error);
      });
  }

  function handleDelete(referenceId) {
    // Filter out the deleted reference from the list
    const updatedReferences = references.filter(reference => reference.id !== referenceId);
    setReferences(updatedReferences);
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
              <button
                className="reference-delete-button"
                onClick={() => handleDelete(reference.id)}
              >
                Delete
              </button>
            </div>
            <p>{reference.reference_content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReferenceList;
