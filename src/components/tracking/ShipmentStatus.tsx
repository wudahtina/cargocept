
import { Shipment } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface ShipmentStatusProps {
  shipment: Shipment;
}

const ShipmentStatus = ({ shipment }: ShipmentStatusProps) => {
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
    Accepted: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
    Processing: 'bg-purple-100 text-purple-800 hover:bg-purple-100',
    'In Transit': 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100',
    'Out for Delivery': 'bg-cyan-100 text-cyan-800 hover:bg-cyan-100',
    Delivered: 'bg-green-100 text-green-800 hover:bg-green-100',
    Failed: 'bg-red-100 text-red-800 hover:bg-red-100',
    Cancelled: 'bg-gray-100 text-gray-800 hover:bg-gray-100',
  };

  // Format UK-style addresses and phone numbers
  const formatUKPostcode = (postcode: string) => {
    return postcode.toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Shipment Details</CardTitle>
          <Badge className={statusColors[shipment.status]}>
            {shipment.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">From</h3>
            <p className="font-medium">{shipment.sender.name}</p>
            <p>{shipment.sender.address.street}</p>
            <p>
              {shipment.sender.address.city}, {formatUKPostcode(shipment.sender.address.postalCode)}
            </p>
            <p>{shipment.sender.address.country}</p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-medium text-muted-foreground">To</h3>
            <p className="font-medium">{shipment.recipient.name}</p>
            <p>{shipment.recipient.address.street}</p>
            <p>
              {shipment.recipient.address.city}, {formatUKPostcode(shipment.recipient.address.postalCode)}
            </p>
            <p>{shipment.recipient.address.country}</p>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Tracking Number</h3>
              <p className="font-mono font-medium">{shipment.trackingId}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Service</h3>
              <p>Premium Shipping</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Expected Delivery</h3>
              <p>
                {format(new Date(shipment.expectedDeliveryDate), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Package Information</h3>
              <p>
                {shipment.parcelDescription}
                <br />
                Weight: {shipment.weight} kg
                <br />
                Dimensions: {shipment.dimensions.length} × {shipment.dimensions.width} × {shipment.dimensions.height} cm
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShipmentStatus;
