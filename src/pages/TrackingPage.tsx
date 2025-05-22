
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import TrackingInput from '@/components/tracking/TrackingInput';
import ShipmentStatus from '@/components/tracking/ShipmentStatus';
import ShipmentTimeline from '@/components/tracking/ShipmentTimeline';
import { useShipmentTracking } from '@/hooks/useShipmentTracking';
import { Card, CardContent } from '@/components/ui/card';
import { Package } from 'lucide-react';

const TrackingPage = () => {
  const { trackingId } = useParams<{ trackingId: string }>();
  const { shipment, isLoading } = useShipmentTracking(trackingId);

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Track Your Shipment</h1>
          <div className="mb-10">
            <TrackingInput fullWidth />
          </div>

          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin mb-4">
                <Package className="h-10 w-10 text-primary" />
              </div>
              <p className="text-lg">Searching for your shipment...</p>
            </div>
          )}

          {!isLoading && trackingId && !shipment && (
            <Card>
              <CardContent className="py-12 text-center">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Shipment Not Found</h3>
                <p className="text-muted-foreground">
                  We couldn't find a shipment with the tracking number: <strong>{trackingId}</strong>
                </p>
                <p className="mt-4">
                  Please verify the tracking number and try again.
                </p>
              </CardContent>
            </Card>
          )}

          {shipment && (
            <div className="space-y-8">
              <ShipmentStatus shipment={shipment} />
              <ShipmentTimeline events={shipment.timeline} />
            </div>
          )}

          {!trackingId && !isLoading && (
            <div className="text-center py-12 border border-dashed border-border rounded-lg">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">Enter a Tracking Number</h3>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Enter your Cargocept tracking number above to see the current status and history of your shipment.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default TrackingPage;
