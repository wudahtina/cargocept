import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Shipment } from '@/types';

const packageFormSchema = z.object({
  parcelDescription: z.string().min(10, 'Please provide a detailed description'),
  weight: z.number().min(0.1, 'Weight must be greater than 0'),
  dimensions: z.object({
    length: z.number().min(1, 'Length must be greater than 0'),
    width: z.number().min(1, 'Width must be greater than 0'),
    height: z.number().min(1, 'Height must be greater than 0'),
  }),
});

type PackageFormValues = z.infer<typeof packageFormSchema>;

interface PackageDetailsFormProps {
  data: Partial<Shipment>;
  onUpdate: (data: Partial<Shipment>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PackageDetailsForm: React.FC<PackageDetailsFormProps> = ({
  data,
  onUpdate,
  onNext,
  onBack,
}) => {
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageFormSchema),
    defaultValues: {
      parcelDescription: data.parcelDescription || '',
      weight: data.weight || 0,
      dimensions: data.dimensions || {
        length: 0,
        width: 0,
        height: 0,
      },
    },
  });

  const onSubmit = (values: PackageFormValues) => {
    onUpdate(values);
    onNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="parcelDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your package contents in detail..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (kg)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="5.5"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Dimensions (cm)</h3>
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="dimensions.length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Length</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="30"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensions.width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Width</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="20"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dimensions.height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        placeholder="15"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </Form>
  );
};

export default PackageDetailsForm; 