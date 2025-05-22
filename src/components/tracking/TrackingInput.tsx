
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface TrackingInputProps {
  fullWidth?: boolean;
  className?: string;
}

const TrackingInput: React.FC<TrackingInputProps> = ({ 
  fullWidth = false, 
  className = '' 
}) => {
  const [trackingId, setTrackingId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      navigate(`/track/${trackingId.trim()}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex flex-col sm:flex-row gap-2 ${fullWidth ? 'w-full' : 'cargocept-tracking-input'} ${className}`}
    >
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder="Enter your tracking number"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="pl-10 py-6 text-base"
          required
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
      </div>
      <Button type="submit" className="py-6">
        Track
      </Button>
    </form>
  );
};

export default TrackingInput;
