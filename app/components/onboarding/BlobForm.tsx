'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';

interface Blob {
  id: string;
  title: string;
  description: string;
}

interface BlobFormProps {
  category: string;
  blobs: Blob[];
  onAdd: (blob: Omit<Blob, 'id'>) => void;
  onRemove: (id: string) => void;
}

export default function BlobForm({ category, blobs, onAdd, onRemove }: BlobFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (title.trim() && description.trim()) {
      onAdd({ title, description });
      setTitle('');
      setDescription('');
      setIsAdding(false);
    }
  };

  const characterCount = description.length;
  const minCharacters = 50;

  return (
    <div className="space-y-6">
      {/* Guidance */}
      <Card>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Add Your {category}
          </h3>
          <p className="text-muted-foreground">
            Provide detailed descriptions (at least {minCharacters} words). The more context you give,
            the better AI can tailor your resume bullets for specific jobs.
          </p>
        </div>
      </Card>

      {/* Existing blobs */}
      {blobs.length > 0 && (
        <div className="space-y-4">
          {blobs.map((blob) => (
            <Card key={blob.id} hover>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">{blob.title}</h4>
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {blob.description}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(blob.id)}
                  className="text-muted-foreground hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add new blob */}
      {!isAdding ? (
        <Button
          variant="secondary"
          onClick={() => setIsAdding(true)}
          className="w-full"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add {category}
        </Button>
      ) : (
        <Card glass>
          <div className="space-y-4">
            <Input
              label="Title"
              placeholder={`e.g., Software Engineering Intern at ${category === 'Work Experience' ? 'Google' : 'Local Nonprofit'}`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Textarea
              label="Description"
              placeholder="Describe your experience in detail. Include what you did, technologies/skills used, impact made, etc. The more detail, the better!"
              rows={8}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              characterCount={characterCount}
              minCharacters={minCharacters}
            />

            <div className="flex gap-3">
              <Button
                variant="glass"
                onClick={handleAdd}
                disabled={!title.trim() || !description.trim() || characterCount < minCharacters}
                className="flex-1"
              >
                Save
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setIsAdding(false);
                  setTitle('');
                  setDescription('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {blobs.length === 0 && !isAdding && (
        <div className="text-center py-12 text-muted-foreground">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p>No {category.toLowerCase()} added yet. Click the button above to add your first one!</p>
        </div>
      )}
    </div>
  );
}
