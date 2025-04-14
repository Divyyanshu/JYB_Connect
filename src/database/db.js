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
      'CREATE TABLE IF NOT EXISTS AccompaniedBy (id INTEGER PRIMARY KEY AUTOINCREMENT, post TEXT, name TEXT, mobile TEXT);',
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
      'DROP TABLE IF EXISTS AccompaniedBy',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to drop AccompaniedBy', error);
      },
    );
  });
};
const clearAllTables = async () => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM ServiceAttributes',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to clear ServiceAttributes', error);
      },
    );

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
      'DELETE FROM AccompaniedByCompany',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to clear AccompaniedByCompany', error);
      },
    );

    tx.executeSql(
      'DELETE FROM AccompaniedBy',
      [],
      (_, results) => {},
      error => {
        console.error('Failed to clear AccompaniedBy', error);
      },
    );
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
};
