import React, { useState } from 'react';

const DeleteReference = ({ referenceId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://35.87.198.76/api/deleteReference/${referenceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Reference deleted successfully
        onDelete(referenceId);
      } else {
        // Error deleting reference
        console.error('Failed to delete reference');
      }
    } catch (error) {
      console.error('Error deleting reference:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  );
};

export default DeleteReference;
