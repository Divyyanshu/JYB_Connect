Ahh, got it! So now the situation is:

✅ Initial marks were _4_ → No action plan given (because 4 > 4).  
✅ Marks updated to _3_ → Since 3 <= 4, now you _need to give an action plan_.

---

### 🎯 _Handling This in the Database:_

When you update the MaxObt to _3_ in your database, you will need to:

👉 Insert or update the missing action plan, responsibility, plan date, and image.  
👉 This can be handled in two ways:

1. ✅ _Manual Update_ after changing MaxObt.
2. 🔥 _Trigger-Based Automatic Insertion_ if you want it to auto-fill.

---

### ✅ _1. Manual Update after Changing Marks_

If you’re updating marks manually, you can run an UPDATE like this:

sql
UPDATE UserMarks
SET
MaxObt = 3,
action_plan = 'New action plan based on 3 marks',
responsibility = 'Assign new responsibility',
plan_date = DATE('now'),
image = 'path_to_new_image.jpg'
WHERE id = 1;

✅ This way, after updating the marks to 3, you manually update the relevant fields with the correct action plan.

---

### 🔥 _2. Automatic Action Plan Using Trigger_

If you want to automate this process when the marks go _from >4 to <=4_, create a trigger like this:

sql
CREATE TRIGGER update_action_plan
AFTER UPDATE OF MaxObt ON UserMarks
FOR EACH ROW
WHEN NEW.MaxObt <= 4 AND OLD.MaxObt > 4
BEGIN
UPDATE UserMarks
SET
action_plan = 'Default action plan for low marks',
responsibility = 'Assign default responsibility',
plan_date = DATE('now'),
image = 'default_image_path.jpg'
WHERE id = NEW.id;
END;

### 💡 _How This Works:_

- AFTER UPDATE OF MaxObt → Trigger fires after MaxObt is updated.
- WHEN NEW.MaxObt <= 4 AND OLD.MaxObt > 4 → Trigger only fires when marks go _from >4 to <=4_.
- It fills in default values for the action plan and related fields.

---

### 🚀 _Final Flow:_

1. Marks go from 4 → 3.
2. Action plan, responsibility, date, and image get updated automatically.

If you want to customize the action plan based on categories, sub-index, or any other logic, you can tweak the trigger to add conditional logic.

Let me know if you’d like help setting this up in your app! 😎

---

Got it! Here's a full set of queries to _Insert, Get, Update, and Delete_ data in your UserMarks table for SQLite. 🚀

---

## 🎯 _Table Schema Recap:_

sql
CREATE TABLE UserMarks (
id INTEGER PRIMARY KEY AUTOINCREMENT,
category_index INTEGER NOT NULL,
sub_index INTEGER NOT NULL,
MaxObt INTEGER NOT NULL,
gap_area TEXT,
action_plan TEXT,
responsibility TEXT,
plan_date DATE,
image TEXT,
CHECK (
(MaxObt > 4 AND action_plan IS NULL AND responsibility IS NULL AND plan_date IS NULL AND image IS NULL) OR
(MaxObt <= 4 AND action_plan IS NOT NULL AND responsibility IS NOT NULL AND plan_date IS NOT NULL)
)
);

---

## ✅ _1. Insert Data_

To insert a record into the table:

sql
INSERT INTO UserMarks (
category_index,
sub_index,
MaxObt,
gap_area,
action_plan,
responsibility,
plan_date,
image
)
VALUES (
1, -- category_index
2, -- sub_index
3, -- MaxObt (Action Plan will be needed as 3 <= 4)
'Skill gap area', -- gap_area
'New Action Plan',
'User Responsibility',
DATE('now'), -- Plan date (current date)
'path_to_image.jpg'
);

---

## 📚 _2. Get Data (Retrieve Records)_

### Get All Records:

sql
SELECT \* FROM UserMarks;

### Get a Single Record by id:

sql
SELECT \* FROM UserMarks
WHERE id = 1;

### Get Records Where Marks <= 4 (Action Plan Given):

sql
SELECT \* FROM UserMarks
WHERE MaxObt <= 4;

---

## ✏ _3. Update Data_

### Update Marks and Keep Action Plan

If you're updating MaxObt to a value <= 4 and want to assign an action plan:

sql
UPDATE UserMarks
SET
MaxObt = 3,
action_plan = 'Updated Action Plan',
responsibility = 'Updated Responsibility',
plan_date = DATE('now'),
image = 'updated_image_path.jpg'
WHERE id = 1;

### Update Marks and Clear Action Plan if Marks > 4

If the marks increase above 4, clear the action plan and related fields:

sql
UPDATE UserMarks
SET
MaxObt = 5,
action_plan = NULL,
responsibility = NULL,
plan_date = NULL,
image = NULL
WHERE id = 1;

---

## ❌ _4. Delete Data_

### Delete a Specific Record:

sql
DELETE FROM UserMarks
WHERE id = 1;

### Delete All Records Where Marks > 4 (No Action Plan):

sql
DELETE FROM UserMarks
WHERE MaxObt > 4;

---

## ⚡ _Bonus: Handling Automatic Action Plan (Optional Trigger)_

If you want to auto-generate the action plan when marks drop to ≤ 4, use this _trigger_:

sql
CREATE TRIGGER auto_add_action_plan
AFTER UPDATE OF MaxObt ON UserMarks
FOR EACH ROW
WHEN NEW.MaxObt <= 4 AND OLD.MaxObt > 4
BEGIN
UPDATE UserMarks
SET
action_plan = 'Auto-Generated Action Plan',
responsibility = 'Default Responsibility',
plan_date = DATE('now'),
image = 'default_image_path.jpg'
WHERE id = NEW.id;
END;

---

🎉 You’re all set to manage your data! Let me know if you need help integrating these queries with your _React Native app_! 😎
# JYB_Connect
