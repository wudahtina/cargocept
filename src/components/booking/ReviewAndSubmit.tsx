import React from 'react';
import { Shipment } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { createShipment } from '@/services/shipmentService';
import { useNavigate } from 'react-router-dom';

interface ReviewAndSubmitProps {
  data: Partial<Shipment>;
  onSubmit: (data: Shipment) => void;
  onBack: () => void;
}

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({
  data,
  onSubmit,
  onBack,
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const result = await createShipment(data);
      if (result) {
        toast({
          title: "Success!",
          description: `Your shipment has been booked successfully. Tracking ID: ${result.trackingId}`,
        });
        navigate(`/track/${result.trackingId}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create shipment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sender Details */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Sender Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {data.sender?.name}</p>
            <p><span className="font-medium">Email:</span> {data.sender?.email}</p>
            <p><span className="font-medium">Phone:</span> {data.sender?.phone}</p>
            <p><span className="font-medium">Address:</span></p>
            <p className="pl-4">
              {data.sender?.address.street}<br />
              {data.sender?.address.city}, {data.sender?.address.state} {data.sender?.address.postalCode}<br />
              {data.sender?.address.country}
            </p>
          </div>
        </Card>

        {/* Recipient Details */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Recipient Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Name:</span> {data.recipient?.name}</p>
            <p><span className="font-medium">Email:</span> {data.recipient?.email}</p>
            <p><span className="font-medium">Phone:</span> {data.recipient?.phone}</p>
            <p><span className="font-medium">Address:</span></p>
            <p className="pl-4">
              {data.recipient?.address.street}<br />
              {data.recipient?.address.city}, {data.recipient?.address.state} {data.recipient?.address.postalCode}<br />
              {data.recipient?.address.country}
            </p>
          </div>
        </Card>

        {/* Package Details */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Package Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Description:</span> {data.parcelDescription}</p>
            <p><span className="font-medium">Weight:</span> {data.weight} kg</p>
            <p><span className="font-medium">Dimensions:</span></p>
            <p className="pl-4">
              Length: {data.dimensions?.length} cm<br />
              Width: {data.dimensions?.width} cm<br />
              Height: {data.dimensions?.height} cm
            </p>
          </div>
        </Card>

        {/* Service Details */}
        <Card className="p-4">
          <h3 className="font-semibold mb-4">Service Details</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Service ID:</span> {data.serviceId}</p>
            <p><span className="font-medium">Status:</span> Pending</p>
            <p><span className="font-medium">Expected Delivery:</span> 5-7 business days</p>
          </div>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating Shipment...' : 'Create Shipment'}
        </Button>
      </div>
    </div>
  );
};

export default ReviewAndSubmit; 