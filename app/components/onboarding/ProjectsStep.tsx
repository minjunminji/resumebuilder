'use client';

import { useState } from 'react';
import BlobForm from './BlobForm';

interface Blob {
  id: string;
  title: string;
  description: string;
}

export default function ProjectsStep() {
  const [blobs, setBlobs] = useState<Blob[]>([]);

  const handleAdd = (blob: Omit<Blob, 'id'>) => {
    setBlobs([...blobs, { ...blob, id: Date.now().toString() }]);
  };

  const handleRemove = (id: string) => {
    setBlobs(blobs.filter((b) => b.id !== id));
  };

  return (
    <BlobForm
      category="Projects"
      blobs={blobs}
      onAdd={handleAdd}
      onRemove={handleRemove}
    />
  );
}
