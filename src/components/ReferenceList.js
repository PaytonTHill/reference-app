import React, { useState, useEffect } from 'react';
import AddReference from './AddReference';
import DeleteReference from './DeleteReference';
import './App.css';

function ReferenceList() {
  const [references, setReferences] = useState([]);
  const [userId, setUserId] = useState(''); // Assuming you have a way to get the current user ID
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  function fetchReferences() {
    console.log('Fetching references...');
    fetch('https://paytonhill.com/api/references')
      .then((response) => response.json())
      .then((data) => {
        setReferences(data);
        setShowDeleteButtons(false); // Reset the showDeleteButtons state when references are fetched
      })
      .catch((error) => {
        console.error('Error fetching references:', error);
      });
  }

  function handleDelete(referenceId) {
    // Filter out the deleted reference from the list
    const updatedReferences = references.filter(
      (reference) => reference.id !== referenceId
    );
    setReferences(updatedReferences);
  }

  function handleReferenceAdded(referenceId) {
    // Fetch the updated list of references after a new reference is added
    fetchReferences();
    setShowDeleteButtons(true); // Show delete buttons after a new reference is added
  }

  useEffect(() => {
    fetchReferences();
  }, []);

  return (
    <div>
      <AddReference onReferenceAdded={handleReferenceAdded} />

      <div id="reference-list">
        {references.map((reference) => (
          <div key={reference.id} className="reference">
            <div className="reference-header">
              <h3>{reference.name}</h3>
              <p>{reference.email}</p>
              {showDeleteButtons && (
                <DeleteReference
                  referenceId={reference.id}
                  onDelete={handleDelete}
                  isOwner={reference.userId === userId} // Compare the user ID with the reference owner's ID
                />
              )}
            </div>
            <p>{reference.reference_content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReferenceList;
