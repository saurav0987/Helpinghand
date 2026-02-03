USE smart_city_portal;

INSERT INTO users (name, email, password, role)
VALUES
  ('Admin User', 'admin@smartcity.gov', '$2a$10$7EqJtq98hPqEX7fNZaFWoOHi7zCKa1X0i8QXW9I2x9o1a5C4L7i1a', 'admin'),
  ('Aarav Singh', 'aarav@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOHi7zCKa1X0i8QXW9I2x9o1a5C4L7i1a', 'citizen'),
  ('Priya Nair', 'priya@example.com', '$2a$10$7EqJtq98hPqEX7fNZaFWoOHi7zCKa1X0i8QXW9I2x9o1a5C4L7i1a', 'citizen');

INSERT INTO complaints (user_id, category, description, location, status)
VALUES
  (2, 'Road', 'Potholes near Sector 21 need repair.', 'Sector 21 Main Road', 'Pending'),
  (3, 'Water', 'Low water pressure in the evening.', 'Green Park', 'In Progress');

INSERT INTO appointments (user_id, patient_name, doctor_name, appointment_date, appointment_time, status)
VALUES
  (2, 'Aarav Singh', 'Dr. Mehta', '2024-10-12', '10:30 AM', 'Scheduled'),
  (3, 'Priya Nair', 'Dr. Kapoor', '2024-10-15', '02:00 PM', 'Scheduled');

INSERT INTO bills (user_id, bill_type, amount, due_date, payment_status)
VALUES
  (2, 'Electricity', 1450.00, '2024-10-05', 'Unpaid'),
  (3, 'Water', 620.00, '2024-10-09', 'Paid');

INSERT INTO announcements (title, body)
VALUES
  ('City Marathon', 'Traffic diversions will be in place this Sunday from 6 AM to 1 PM.'),
  ('Smart Meter Upgrade', 'Electricity meter upgrades begin in Zone 3 starting next week.');
