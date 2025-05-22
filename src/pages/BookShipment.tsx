import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Package, ArrowRight, ArrowLeft } from 'lucide-react';
import SenderDetailsForm from '@/components/booking/SenderDetailsForm';
import RecipientDetailsForm from '@/components/booking/RecipientDetailsForm';
import PackageDetailsForm from '@/components/booking/PackageDetailsForm';
import ServiceSelectionForm from '@/components/booking/ServiceSelectionForm';
import ReviewAndSubmit from '@/components/booking/ReviewAndSubmit';
import { useNavigate } from 'react-router-dom';
import { createShipment } from '@/services/shipmentService';
import { Shipment } from '@/types';

const steps = [
  { id: 'sender', title: 'Sender Details' },
  { id: 'recipient', title: 'Recipient Details' },
  { id: 'package', title: 'Package Details' },
  { id: 'service', title: 'Service Selection' },
  { id: 'review', title: 'Review & Submit' },
];

const BookShipment = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Shipment>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (finalData: Shipment) => {
    try {
      const result = await createShipment(finalData);
      if (result) {
        toast({
          title: "Success!",
          description: "Your shipment has been booked successfully.",
        });
        navigate(`/track/${result.trackingId}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create shipment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <SenderDetailsForm
            data={formData}
            onUpdate={(data) => setFormData({ ...formData, ...data })}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <RecipientDetailsForm
            data={formData}
            onUpdate={(data) => setFormData({ ...formData, ...data })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <PackageDetailsForm
            data={formData}
            onUpdate={(data) => setFormData({ ...formData, ...data })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <ServiceSelectionForm
            data={formData}
            onUpdate={(data) => setFormData({ ...formData, ...data })}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ReviewAndSubmit
            data={formData as Shipment}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Book a Shipment</h1>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index <= currentStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index < currentStep ? (
                        <Package className="w-5 h-5" />
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    <span className="text-sm mt-2">{step.title}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        index < currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
            </CardHeader>
            <CardContent>{renderStep()}</CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default BookShipment; 