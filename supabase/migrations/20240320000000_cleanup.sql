-- Safely drop tables if they exist
do $$
begin
    -- Drop tables in correct order (respecting foreign key constraints)
    drop table if exists timeline_events cascade;
    drop table if exists shipments cascade;
    drop table if exists service_details cascade;
    drop table if exists contact_submissions cascade;
end $$; 