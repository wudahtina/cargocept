-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admins can view all shipments" ON shipments;

-- Create policy for admins to view all shipments
CREATE POLICY "Admins can view all shipments"
ON shipments
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Drop existing policies if they exist for timeline_events
DROP POLICY IF EXISTS "Admins can view all timeline events" ON timeline_events;

-- Create policy for admins to view all timeline events
CREATE POLICY "Admins can view all timeline events"
ON timeline_events
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
); 