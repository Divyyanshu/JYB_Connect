import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'myDatabase.db',
    location: 'default',
  },
  () => console.log('Database opened successfully!'),
  error => console.log('Database open error:', error),
);

const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ServiceAttributes (
        DefId TEXT UNIQUE,
        MainParameter TEXT,
        SubParameters TEXT,
        Checkpoints TEXT,
        MaxMarks INTEGER,
        MaxObt TEXT,
        GapArea TEXT,
        ActionPlan TEXT,
        Responsibility TEXT,
        PlanDate TEXT,
        Image TEXT
      );`,
      [],
      () => console.log('Table created successfully!'),
      error => console.log('Table creation error:', error),
    );
  });
};
const insertRecord = (
  DefId,
  MainParameter,
  SubParameters,
  Checkpoints,
  MaxMarks,
  MaxObt,
  GapArea,
  ActionPlan,
  Responsibility,
  PlanDate,
  Image,
) => {
  console.log('Trying to insert record:', {
    DefId,
    MainParameter,
    SubParameters,
    Checkpoints,
    MaxMarks,
    MaxObt,
    GapArea,
    ActionPlan,
    Responsibility,
    PlanDate,
    Image,
  });

  db.transaction(tx => {
    tx.executeSql(
      `INSERT OR REPLACE INTO ServiceAttributes 
(DefId, MainParameter, SubParameters, Checkpoints, MaxMarks, MaxObt, GapArea, ActionPlan, Responsibility, PlanDate, Image) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        DefId,
        MainParameter,
        SubParameters,
        Checkpoints,
        MaxMarks,
        MaxObt,
        GapArea,
        ActionPlan,
        Responsibility,
        PlanDate,
        Image,
      ],
      (_, result) => {
        console.log('Record inserted successfully!', result);
        fetchRecords();
      },
      (_, error) => {
        console.error('SQL Insert Error:', error);
      },
    );
  });
};

const fetchRecords = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ServiceAttributes;`,
        [],
        (_, results) => {
          const records = results.rows.raw();
          console.log('Fetched Records:', records.length);
          resolve(records.length);
        },
        error => {
          console.error('Error fetching records', error);
          reject(error);
        },
      );
    });
  });
};

const getGroupedMainParameters = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT DISTINCT MainParameter FROM ServiceAttributes;`,
        [],
        (_, results) => {
          let mainParameters = [];
          for (let i = 0; i < results.rows.length; i++) {
            mainParameters.push(results.rows.item(i).MainParameter);
          }
          console.log('Distinct MainParameters:', mainParameters);
          resolve(mainParameters);
        },
        error => {
          console.error('Error fetching grouped MainParameters', error);
          reject(error);
        },
      );
    });
  });
};
const getDetailsByMainParameter = (main_parameter, callback) => {
  console.log('Fetching details for:', main_parameter);
  db.transaction(tx => {
    tx.executeSql(
      `SELECT DefId, SubParameters, Checkpoints, MaxMarks, MaxObt  FROM ServiceAttributes WHERE MainParameter = ?;`,
      [main_parameter],
      (_, results) => {
        let detailsList = [];
        console.log('Raw SQL Results:', results);

        for (let i = 0; i < results.rows.length; i++) {
          detailsList.push(results.rows.item(i));
        }

        console.log('Formatted Data:', detailsList);
        callback(detailsList);
      },
      error => console.error('Error fetching details by main parameter', error),
    );
  });
};

const getDetailsByMaxObtain = main_parameter => {
  console.log('Fetching details for:', main_parameter);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT DefId, SubParameters, Checkpoints, MaxMarks, MaxObt FROM ServiceAttributes WHERE MainParameter = ? AND (MaxObt IS NULL OR MaxObt = '');`,
        [main_parameter],
        (_, results) => {
          let detailsList = [];
          console.log('Raw SQL Results:', results);
          for (let i = 0; i < results.rows.length; i++) {
            detailsList.push(results.rows.item(i));
          }
          console.log('Formatted Data:', detailsList);
          resolve(detailsList);
        },
        (_, error) => {
          console.error('Error fetching details by main parameter', error);
          reject(error);
        },
      );
    });
  });
};
const getDetailsValuesFromServiceAttributes = DefId => {
  console.log('Fetching details for:', DefId);

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ServiceAttributes WHERE DefId = ?;`,
        [DefId],
        (_, results) => {
          if (results.rows.length > 0) {
            console.log('Raw SQL Results DefId:', results.rows.item(0));
            resolve(results.rows.item(0));
          } else {
            reject(new Error('No data found for the given DefId'));
          }
        },
        (_, error) => {
          console.error('Error fetching details by main parameter', error);
          reject(error);
        },
      );
    });
  });
};

const getDvrScoreData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT MainParameter, 
                SUM(CAST(MaxMarks AS INTEGER)) AS TotalMaxMarks, 
                SUM(CAST(MaxObt AS INTEGER)) AS TotalMaxObt 
         FROM ServiceAttributes 
         GROUP BY MainParameter;`,
        [],
        (_, results) => {
          let detailsList = [];
          for (let i = 0; i < results.rows.length; i++) {
            detailsList.push(results.rows.item(i));
          }
          console.log('DVR Data:', detailsList);
          resolve(detailsList);
        },
        error => {
          console.error('Error fetching DVR data:', error);
          reject(error);
        },
      );
    });
  });
};

export const ServiceAttributeTable = (DefId, MaxObt) => {
  console.log('CALL DATA', DefId, MaxObt);
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE ServiceAttributes SET MaxObt = ? WHERE DefId = ?;',
        [newAge, userId],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
};

const updateServiceAttributes = (
  DefId,
  MaxObt,
  GapArea,
  ActionPlan,
  Responsibility,
  PlanDate,
  Image,
) => {
  console.log('Updating ServiceAttributes:', {
    DefId,
    MaxObt,
    GapArea,
    ActionPlan,
    Responsibility,
    PlanDate,
    Image,
  });

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE ServiceAttributes 
         SET MaxObt = ?, 
             GapArea = ?, 
             ActionPlan = ?, 
             Responsibility = ?, 
             PlanDate = ?, 
             Image = ?
         WHERE DefId = ?;`,
        [MaxObt, GapArea, ActionPlan, Responsibility, PlanDate, Image, DefId],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
};

const create_KPI_Performance_Table = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS KPI_PERFORMANCE (
        parameter TEXT,
        month_plan TEXT,
        percentage_criteria TEXT,
        mtd_plan TEXT,
        mtd_actual TEXT,
        percentage_achieve TEXT,
        gap_area TEXT,
        counter_measure_plan TEXT,
        responsibility TEXT,
        plan_closure_date TEXT,
        image_path TEXT
      );`,
      [],
      () => console.log('KPI_PERFORMANCE table created successfully'),
      (_, error) => console.log('Error creating table:', error),
    );
  });
};

const insert_KPI_Performance_Record = (
  parameter,
  month_plan,
  percentage_criteria,
  mtd_plan,
  mtd_actual,
  percentage_achieve,
  gap_area,
  counter_measure_plan,
  responsibility,
  plan_closure_date,
  image_path,
) => {
  return new Promise((resolve, reject) => {
    console.log('Trying to insert record:', {
      parameter,
      month_plan,
      percentage_criteria,
      mtd_plan,
      mtd_actual,
      percentage_achieve,
      gap_area,
      counter_measure_plan,
      responsibility,
      plan_closure_date,
      image_path,
    });

    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO KPI_PERFORMANCE (
          parameter, month_plan, percentage_criteria, mtd_plan,
          mtd_actual, percentage_achieve, gap_area, counter_measure_plan,
          responsibility, plan_closure_date, image_path
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          parameter,
          month_plan,
          percentage_criteria,
          mtd_plan,
          mtd_actual,
          percentage_achieve,
          gap_area,
          counter_measure_plan,
          responsibility,
          plan_closure_date,
          image_path,
        ],
        (_, result) => {
          console.log(
            'Record inserted into KPI_PERFORMANCE successfully!',
            result,
          );
          resolve(result);
        },
        (_, error) => {
          console.error('SQL Insert KPI_PERFORMANCE Error:', error);
          reject(error);
        },
      );
    });
  });
};

const fetch_KPI_Performance_Data = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM KPI_PERFORMANCE`,
        [],
        (_, countResult) => {
          const totalRecords = countResult.rows.item(0).count;
          if (totalRecords === 0) {
            console.warn('No data found in KPI_PERFORMANCE table!');
            resolve([]);
            return;
          }

          tx.executeSql(
            'SELECT * FROM KPI_PERFORMANCE',
            [],
            (_, res) => {
              const fetchedData = [];
              for (let i = 0; i < res.rows.length; i++) {
                fetchedData.push(res.rows.item(i));
              }
              resolve(fetchedData);
            },
            (_, error) => {
              console.error('SQL Fetch KPI_PERFORMANCE Error:', error);
              reject(error);
            },
          );
        },
        (_, error) => {
          console.error('Error counting records:', error);
          reject(error);
        },
      );
    });
  });
};
const clearKPIPerformanceData = () => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM KPI_PERFORMANCE;`,
      [],
      (_, result) =>
        console.log('KPI_PERFORMANCE table cleared successfully', result),
      (_, error) => console.log('Error clearing table:', error),
    );
  });
};
// update query updateKPIPerformanceData !
const updateKPIPerformanceData = args => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE KPI_PERFORMANCE 
         SET
         mtd_plan = ?,
         mtd_actual= ?,
         percentage_achieve = ?,
         gap_area = ?,
         counter_measure_plan = ?,
         responsibility = ?,
         plan_closure_date = ?,
         image_path = ?
         WHERE parameter = ?;`,
        [
          (mtd_plan = args.mtd_plan),
          (mtd_actual = args.mtd_actual),
          (percentage_achieve = args.percentage_achieve),
          (gap_area = args.gap_area),
          (counter_measure_plan = args.counter_measure_plan),
          (responsibility = args.responsibility),
          (plan_closure_date = args.plan_closure_date),
          (image_path = args.image_path),
          (parameter = args.parameter),
        ],
        (_, result) => resolve(result),
        (_, error) => reject(error),
      );
    });
  });
};
// ManPowerAvailability : -
const createManPowerAvailability = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ManPowerAvailability (
         type TEXT,
         value TEXT,
         available TEXT,
         trained TEXT,
         available_percentage TEXT,
         trained_percentage TEXT,
         gap_area TEXT,
         counter_measure_plan TEXT,
         responsibility TEXT,
         plan_closure_date TEXT,
         image_path TEXT
       );`,
      [],
      () => console.log('Table Created: ManPowerAvailability'),
      error => console.error('Table Creation Error:', error),
    );
  });
};

const insertDataManPowerAvailability = (
  type,
  value,
  available,
  trained,
  available_percentage,
  trained_percentage,
  gap_area,
  counter_measure_plan,
  responsibility,
  plan_closure_date,
  image_path,
) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ManPowerAvailability (
           type,
           value,
           available,
           trained,
           available_percentage,
           trained_percentage,
           gap_area,
           counter_measure_plan,
           responsibility,
           plan_closure_date,
           image_path
         ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        [
          type || '',
          value || '',
          available || '',
          trained || '',
          available_percentage || '',
          trained_percentage || '',
          gap_area || '',
          counter_measure_plan || '',
          responsibility || '',
          plan_closure_date || '',
          image_path || '',
        ],
        (_, result) => {
          console.log('Data Inserted:', result);
          resolve(result);
        },
        (_, error) => {
          console.error('Insert Error:', error);
          reject(error);
        },
      );
    });
  });
};

const fetchDataManPowerAvailability = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM ManPowerAvailability;',
      [],
      (_, {rows}) => callback(rows.raw()),
      error => console.error('Fetch Error:', error),
    );
  });
};

const clearTableManPowerAvailability = () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM ManPowerAvailability;',
      [],
      () => console.log('Table Cleared'),
      error => console.error('Clear Table Error:', error),
    );
  });
};
const updateManPowerAvailabilityData = ({
  type,
  available,
  trained,
  available_percentage,
  trained_percentage,
  gap_area,
  counter_measure_plan,
  responsibility,
  plan_closure_date,
  image_path,
}) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE ManPowerAvailability
         SET
           available = ?,
           trained = ?,
           available_percentage = ?,
           trained_percentage = ?,
           gap_area = ?,
           counter_measure_plan = ?,
           responsibility = ?,
           plan_closure_date = ?,
           image_path = ?
         WHERE type = ?;`,
        [
          available,
          trained,
          available_percentage,
          trained_percentage,
          gap_area,
          counter_measure_plan,
          responsibility,
          plan_closure_date,
          image_path,
          type,
        ],
        (_, result) => {
          console.log('Update Success:', result);
          resolve(result);
        },
        (_, error) => {
          console.error('Update Error:', error);
          reject(error);
        },
      );
    });
  });
};

const createCompanyTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS AccompaniedByCompany (id INTEGER PRIMARY KEY AUTOINCREMENT, post TEXT, name TEXT, mobile TEXT);',
    );
  });
};
const createDealerTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS AccompaniedByDealer (id INTEGER PRIMARY KEY AUTOINCREMENT, post TEXT, name TEXT, mobile TEXT);',
    );
  });
};

const dropAllTables = async () => {
  db.transaction(tx => {
    tx.executeSql(
      'DROP TABLE IF EXISTS ServiceAttributes',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to drop ServiceAttributes', error);
      },
    );

    tx.executeSql(
      'DROP TABLE IF EXISTS KPI_PERFORMANCE',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to drop KPI_PERFORMANCE', error);
      },
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS ManPowerAvailability',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to drop ManPowerAvailability', error);
      },
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS AccompaniedByCompany',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to drop AccompaniedByCompany', error);
      },
    );
    tx.executeSql(
      'DROP TABLE IF EXISTS AccompaniedByDealer',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to drop AccompaniedByDealer', error);
      },
    );
  });
};
const clearAllTables = async () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM KPI_PERFORMANCE',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to clear KPI_PERFORMANCE', error);
      },
    );
    tx.executeSql(
      'DELETE FROM ManPowerAvailability',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to clear ManPowerAvailability', error);
      },
    );
    tx.executeSql(
      'DELETE FROM MomManualTable',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to clear AccompaniedByCompany', error);
      },
    );
    tx.executeSql(
      'DELETE FROM AccompaniedByCompany',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to clear AccompaniedByCompany', error);
      },
    );
    tx.executeSql(
      'DELETE FROM AccompaniedByDealer',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to clear AccompaniedByDealer', error);
      },
    );
  });
};
//complaint analyis
const createTableComplaintAnalysis = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS CustomerComplaintAnalysis (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        received TEXT,
        closed TEXT,
        within72 TEXT,
        occurrence TEXT,
        gapArea TEXT,
        counterMeasure TEXT,
        responsibility TEXT,
        planClosureDate TEXT
      )`,
      [],
      () => {},
      error => console.log('Create Table Error:', error),
    );
  });
};

const insertComplaintAnalysis = formData => {
  const {
    received,
    closed,
    within72,
    occurrence,
    gapArea,
    counterMeasure,
    responsibility,
    planClosureDate,
  } = formData;

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO CustomerComplaintAnalysis (received, closed, within72, occurrence, gapArea, counterMeasure, responsibility, planClosureDate)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        received,
        closed,
        within72,
        occurrence,
        gapArea,
        counterMeasure,
        responsibility,
        planClosureDate,
      ],
      () => {
        console.log('Data inserted successfully');
      },
      error => {
        console.log('Insert Error:', error);
      },
    );
  });
};

const fetchDataComplaintAnalysis = (setFormData, setIsSubmitted) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM CustomerComplaintAnalysis ORDER BY id DESC LIMIT 1`,
      [],
      (tx, results) => {
        if (results.rows.length > 0) {
          const data = results.rows.item(0);
          setFormData(data);
          setIsSubmitted(true);
        }
      },
      error => console.log('Fetch Data Error:', error),
    );
  });
};
const clearCustomerComplaintAnalysisTableData = () => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM CustomerComplaintAnalysis`,
      [],
      () => {
        console.log('All data cleared from the table.');
      },
      error => console.log('Clear Table Data Error:', error),
    );
  });
};
const getMOMFromServiceAttributes = () => {
  console.log('Fetching MOM from ServiceAttributes');

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ServiceAttributes WHERE TRIM(GapArea) != '';`,
        [],
        (_, results) => {
          let detailsList = [];
          for (let i = 0; i < results.rows.length; i++) {
            detailsList.push(results.rows.item(i));
          }
          console.log('ServiceAttributes Data:', detailsList);
          resolve(detailsList);
        },
        (_, error) => {
          console.error('Error fetching ServiceAttributes:', error);
          reject(error);
        },
      );
    });
  });
};

const getMOMFromKPI_Performance = () => {
  console.log('Fetching MOM from KPI_PERFORMANCE');

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM KPI_PERFORMANCE WHERE TRIM(gap_area) != '';`,
        [],
        (_, results) => {
          let detailsList = [];
          for (let i = 0; i < results.rows.length; i++) {
            detailsList.push(results.rows.item(i));
          }
          console.log('KPI_PERFORMANCE Data:', detailsList);
          resolve(detailsList);
        },
        (_, error) => {
          console.error('Error fetching KPI_PERFORMANCE:', error);
          reject(error);
        },
      );
    });
  });
};

const getMOMFromManPowerAvailability = () => {
  console.log('Fetching MOM from ManPowerAvailability');

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ManPowerAvailability WHERE TRIM(gap_area) != '';`,
        [],
        (_, results) => {
          let detailsList = [];
          for (let i = 0; i < results.rows.length; i++) {
            detailsList.push(results.rows.item(i));
          }
          console.log('ManPowerAvailability Data:', detailsList);
          resolve(detailsList);
        },
        (_, error) => {
          console.error('Error fetching ManPowerAvailability:', error);
          reject(error);
        },
      );
    });
  });
};
const getMOMFromComplaintAnalysis = () => {
  console.log('Fetching MOM from CustomerComplaintAnalysis');

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM CustomerComplaintAnalysis WHERE gapArea IS NOT NULL AND TRIM(gapArea) != '';`,
        [],
        (_, results) => {
          const rows = results.rows;
          const detailsList = [];

          for (let i = 0; i < rows.length; i++) {
            const item = rows.item(i);
            detailsList.push(item);
          }

          console.log('ComplaintAnalysis Data:', detailsList);
          resolve(detailsList);
        },
        (_, error) => {
          console.error('Error fetching ComplaintAnalysis:', error);
          reject(error);
        },
      );
    });
  });
};
const createRepeatCardTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS RepeatCard (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        card_no INTEGER,
        card_percent TEXT
      );`,
      [],
      () => {
        console.log('RepeatCard table created successfully');
      },
      error => {
        console.log('Error creating RepeatCard table: ', error);
      },
    );
  });
};
const clearRepeatCardTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM RepeatCard`,
      [],
      () => {
        console.log('All data from RepeatCard table deleted successfully.');
      },
      error => console.log('Clear RepeatCard Table Error:', error),
    );
  });
};

const clearServiceAttributeTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM ServiceAttributes`,
      [],
      () => {
        console.log(
          'All data from ServiceAttributes table deleted successfully.',
        );
      },
      error => console.log('Clear ServiceAttributes Table Error:', error),
    );
  });
};

export const createMOMTable = async () => {
  const db = await getDBConnection();
  await db.executeSql(
    `CREATE TABLE IF NOT EXISTS MOMEntries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parameters TEXT,
      clPlRemarks TEXT,
      countermeasurePlan TEXT,
      targetDate TEXT,
      responsibility TEXT
    );`,
  );
};
export const insertMOMEntry = async entry => {
  const db = await getDBConnection();
  await db.executeSql(
    `INSERT INTO MOMEntries (parameters, clPlRemarks, countermeasurePlan, targetDate, responsibility)
     VALUES (?, ?, ?, ?, ?)`,
    [
      entry.parameters,
      entry.clPlRemarks,
      entry.countermeasurePlan,
      entry.targetDate,
      entry.responsibility,
    ],
  );
};

export const getMOMEntries = async () => {
  const db = await getDBConnection();
  const results = await db.executeSql(`SELECT * FROM MOMEntries`);
  const rows = results[0].rows;
  const entries = [];
  for (let i = 0; i < rows.length; i++) {
    entries.push(rows.item(i));
  }
  return entries;
};

// Mom manually table
const createTableMomManuallyTable = () => {
  db.executeSql(
    `
    CREATE TABLE IF NOT EXISTS MomManualTable (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parameter TEXT,
      remarks TEXT,
      counterMeasure TEXT,
      targetDate TEXT,
      responsibility TEXT
    )
  `,
    [],
    result => {
      console.log('Table created or already exists');
    },
    error => {
      console.error('Error creating table:', error);
    },
  );
};

const insertDataMomManuallyTable = formData => {
  const query = `
    INSERT INTO MomManualTable (parameter, remarks, counterMeasure, targetDate, responsibility)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    formData.parameter,
    formData.remarks,
    formData.counterMeasure,
    formData.targetDate,
    formData.responsibility,
  ];

  return new Promise((resolve, reject) => {
    db.executeSql(
      query,
      values,
      () => {
        console.log('Data inserted successfully!');
        resolve();
      },
      error => {
        console.error('Error inserting data:', error);
        reject(error);
      },
    );
  });
};
const fetchDataMomManuallyTable = () => {
  console.log('Fetching MomManualTable');

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * from MomManualTable`,
        [],
        (_, results) => {
          let detailsList = [];
          for (let i = 0; i < results.rows.length; i++) {
            detailsList.push(results.rows.item(i));
          }
          console.log('MomSuccess Data:', detailsList);
          resolve(detailsList);
        },
        (_, error) => {
          console.error('Error fetching MomData:', error);
          reject(error);
        },
      );
    });
  });
};

// Tick status showing :- queries
const isAllMaxObtFilled = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ServiceAttributes WHERE MaxObt IS NULL OR MaxObt = '';`,
        [],
        (_, results) => {
          if (results.rows.length > 0) {
            // Kuch values empty/null hain
            resolve(false);
          } else {
            resolve(true); // Sab filled hain
          }
        },
        (_, error) => {
          console.error('Error in isAllMaxObtFilled:', error);
          reject(error);
        },
      );
    });
  });
};

export {
  db,
  createTable,
  insertRecord,
  fetchRecords,
  getGroupedMainParameters,
  getDetailsByMainParameter,
  getDvrScoreData,
  getDetailsByMaxObtain,
  clearKPIPerformanceData,
  updateServiceAttributes,
  getDetailsValuesFromServiceAttributes,
  create_KPI_Performance_Table,
  insert_KPI_Performance_Record,
  updateKPIPerformanceData,
  fetch_KPI_Performance_Data,
  createManPowerAvailability,
  insertDataManPowerAvailability,
  fetchDataManPowerAvailability,
  clearTableManPowerAvailability,
  updateManPowerAvailabilityData,
  createCompanyTable,
  createDealerTable,
  clearAllTables,
  dropAllTables,
  createTableComplaintAnalysis,
  insertComplaintAnalysis,
  fetchDataComplaintAnalysis,
  getMOMFromServiceAttributes,
  getMOMFromKPI_Performance,
  getMOMFromManPowerAvailability,
  getMOMFromComplaintAnalysis,
  clearRepeatCardTable,
  clearCustomerComplaintAnalysisTableData,
  clearServiceAttributeTable,
  createRepeatCardTable,
  insertDataMomManuallyTable,
  fetchDataMomManuallyTable,
  createTableMomManuallyTable,
  isAllMaxObtFilled,
};
