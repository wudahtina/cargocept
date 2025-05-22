
import React from 'react';
import { TimelineEvent } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface ShipmentTimelineProps {
  events: TimelineEvent[];
}

const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({ events }) => {
  // Sort events by timestamp (newest first)
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipment Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-6">
          {events.length > 1 && (
            <div className="cargocept-timeline-connector" />
          )}
          {sortedEvents.map((event, index) => (
            <div key={event.id} className="flex items-start gap-4">
              <div className="cargocept-timeline-dot">
                <div className="bg-background w-2 h-2 rounded-full" />
              </div>
              
              <div className="space-y-1 flex-1">
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.timestamp), 'MMM dd, yyyy - h:mm a')}
                </p>
                <p className="font-medium">{event.description}</p>
                {event.location && (
                  <p className="text-sm">{event.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentTimeline;
