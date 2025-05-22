-- Disable email confirmation requirement
ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;

-- Update auth settings to disable email confirmation
UPDATE auth.config
SET confirm_email = false,
    confirm_phone = false;

-- Create a trigger to automatically confirm new users
CREATE OR REPLACE FUNCTION auth.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Set email_confirmed_at to current timestamp
  NEW.email_confirmed_at = NOW();
  -- Set phone_confirmed_at to current timestamp if phone exists
  IF NEW.phone IS NOT NULL THEN
    NEW.phone_confirmed_at = NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION auth.handle_new_user(); 