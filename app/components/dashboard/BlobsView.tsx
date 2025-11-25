'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

interface Blob {
  id: string;
  category: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function BlobsView() {
  // Mock data - will be replaced with real data from backend
  const [blobs, setBlobs] = useState<Blob[]>([
    {
      id: '1',
      category: 'Work Experience',
      title: 'Software Engineering Intern at Google',
      description: 'Developed features for Google Search using Python and Java. Worked with a team of 5 engineers to implement new ranking algorithms...',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      category: 'Projects',
      title: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented payment processing with Stripe...',
      createdAt: '2024-02-20',
    },
  ]);

  const [selectedBlob, setSelectedBlob] = useState<Blob | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Work Experience', 'Projects', 'Volunteering', 'School Involvement', 'Awards & Achievements'];

  const filteredBlobs = blobs.filter((blob) => {
    const matchesSearch = blob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blob.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blob.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    setBlobs(blobs.filter((b) => b.id !== id));
    if (selectedBlob?.id === id) {
      setSelectedBlob(null);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">My Experiences</h1>
        <p className="text-muted-foreground text-lg">
          Manage your experience database
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search experiences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-full sm:w-64">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Blobs Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left: Blob List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {filteredBlobs.length} {filteredBlobs.length === 1 ? 'Experience' : 'Experiences'}
            </h2>
            <Button variant="glass" size="sm">
              Add New
            </Button>
          </div>

          {filteredBlobs.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-muted-foreground">No experiences found</p>
              </div>
            </Card>
          ) : (
            filteredBlobs.map((blob) => (
              <Card
                key={blob.id}
                hover
                className={`cursor-pointer ${selectedBlob?.id === blob.id ? 'ring-2 ring-accent' : ''}`}
                onClick={() => setSelectedBlob(blob)}
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                      {blob.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(blob.id);
                      }}
                      className="text-muted-foreground hover:text-red-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{blob.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {blob.description}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Added {new Date(blob.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Right: Blob Detail */}
        <div className="lg:sticky lg:top-8 h-fit">
          {selectedBlob ? (
            <Card glass>
              <div>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent">
                    {selectedBlob.category}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <Input
                      label="Title"
                      defaultValue={selectedBlob.title}
                    />
                    <Textarea
                      label="Description"
                      defaultValue={selectedBlob.description}
                      rows={12}
                    />
                    <Button variant="glass" className="w-full" onClick={() => setIsEditing(false)}>
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-foreground mb-4">
                      {selectedBlob.title}
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {selectedBlob.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <h3 className="text-sm font-semibold text-foreground mb-3">
                        Version History
                      </h3>
                      <div className="space-y-2">
                        <div className="text-sm p-3 rounded-lg bg-background">
                          <p className="text-foreground mb-1">
                            Original version
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Created {new Date(selectedBlob.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>
          ) : (
            <Card>
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <p className="text-muted-foreground">
                  Select an experience to view details
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
