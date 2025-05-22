import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery } from '@tanstack/react-query';
import { getServices } from '@/services/shipmentService';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { formatCurrency } from '@/utils/format';
import { Service } from '@/types/service';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Shipment } from '@/types';
import { Button } from '@/components/ui/button';

const serviceSchema = z.object({
  serviceId: z.string().min(1, 'Please select a shipping service'),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceSelectionFormProps {
  data: Partial<Shipment>;
  onUpdate: (data: Partial<Shipment>) => void;
  onNext: () => void;
  onBack: () => void;
}

const ServiceSelectionForm: React.FC<ServiceSelectionFormProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      serviceId: data.serviceId || '',
    },
  });

  const selectedServiceId = form.watch('serviceId');
  const selectedService = services?.find(s => s.id === selectedServiceId);

  const calculatePrice = (weight: number = 1) => {
    if (!selectedService) return 0;
    return selectedService.base_price + (weight * selectedService.price_per_kg);
  };

  const onSubmit = (values: ServiceFormData) => {
    onUpdate({ serviceId: values.serviceId });
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Select Shipping Service</h2>
          <p className="text-muted-foreground">
            Choose the shipping service that best fits your needs
          </p>
        </div>

        {isLoading ? (
          <div>Loading services...</div>
        ) : (
          <FormField
            control={form.control}
            name="serviceId"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid gap-4"
                  >
                    {services?.map((service) => (
                      <Card
                        key={service.id}
                        className={`cursor-pointer transition-colors ${
                          selectedServiceId === service.id
                            ? 'border-primary'
                            : 'hover:border-muted-foreground/50'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-4">
                            <RadioGroupItem
                              value={service.id}
                              id={service.id}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <Label
                                htmlFor={service.id}
                                className="text-base font-medium cursor-pointer"
                              >
                                {service.title}
                              </Label>
                              <p className="text-sm text-muted-foreground mt-1">
                                {service.description}
                              </p>
                              <div className="mt-2 space-y-1">
                                <p className="text-sm">
                                  <span className="font-medium">Base Price:</span>{' '}
                                  {formatCurrency(service.base_price)}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Price per kg:</span>{' '}
                                  {formatCurrency(service.price_per_kg)}
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Delivery Time:</span>{' '}
                                  {service.delivery_time_min}-{service.delivery_time_max} business days
                                </p>
                                <p className="text-sm">
                                  <span className="font-medium">Weight Range:</span>{' '}
                                  {service.min_weight}-{service.max_weight} kg
                                </p>
                                {service.is_international && (
                                  <p className="text-sm text-blue-600">
                                    International Shipping Available
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {selectedService && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Price Estimate</h3>
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Base Price:</span>{' '}
                  {formatCurrency(selectedService.base_price)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Price per kg:</span>{' '}
                  {formatCurrency(selectedService.price_per_kg)}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Estimated Total (1kg):</span>{' '}
                  {formatCurrency(calculatePrice(1))}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Estimated Total (5kg):</span>{' '}
                  {formatCurrency(calculatePrice(5))}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Estimated Total (10kg):</span>{' '}
                  {formatCurrency(calculatePrice(10))}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">
            Next
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceSelectionForm; 