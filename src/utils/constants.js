export const BACKEND_ACCEPTED_DATE_MOMENT_FORMAT = 'YYYY-MM-DD';

export const MONTHS = [
  {name: 'January', value: 1},
  {name: 'February', value: 2},
  {name: 'March', value: 3},
  {name: 'April', value: 4},
  {name: 'May', value: 5},
  {name: 'June', value: 6},
  {name: 'July', value: 7},
  {name: 'August', value: 8},
  {name: 'September', value: 9},
  {name: 'October', value: 10},
  {name: 'November', value: 11},
  {name: 'December', value: 12},
];
export const YEARS = Array.from(
  {length: 50},
  (_, i) => new Date().getFullYear() - i,
);

export const CATEGORIES = [
  {
    title: 'Vehicle Handover',
    data: [
      {
        DEFID:
          '55F8B468-D7BF-4066-838A-5BB3085C49FE55F8B468-D7BF-4066-838A-5BB3085C49FE',
        subParameter: 'Politeness & courtesy of the person who received you',
        checkpoints: 'Sample of 3 customers at reception area',
        MaxObt: '',
      },
      {
        subParameter: 'Entry of vehicle into the workshop',
        checkpoints:
          'Vehicle log register, tagging, greeting and directing by security guard',
        MaxObt: '',
      },
      {
        subParameter: 'Attended within reasonable time (within 10 minutes)',
        checkpoints: 'Sample of 3 customers at reception area',
        MaxObt: '',
      },
      {
        subParameter: 'Explanation of work done on vehicle',
        checkpoints:
          'Check sample of 3 customers. Just mentioning in Job card will not suffice',
        MaxObt: '',
      },
      {
        subParameter:
          'Explanation of estimate delivery time & cost to customer & authentication',
        checkpoints:
          'Check sample of 3 customers. Just mentioning in Job card will not suffice',
        MaxObt: '',
      },
    ],
  },
  {
    title: 'Service Advisor Performance',
    data: [
      {
        subParameter: 'Availability of Trained Service Advisor',
        checkpoints: 'Trained manpower availability',
        MaxObt: '',
      },
      {
        subParameter: 'Courteous behaviour of Service Advisor',
        checkpoints:
          'Sample of 3 customers. Good listener & polite to customer.',
        MaxObt: '',
      },
      {
        subParameter: 'Job card filling',
        checkpoints:
          'Check sample of 3 Job cards. Customer voice is filled properly',
        MaxObt: '',
      },
      {
        subParameter:
          'Confirmation of problems from customer after filling job card',
        checkpoints: 'Check sample of 3 Job Card from current and previous day',
        MaxObt: '',
      },
      {
        subParameter: 'Test ride with customer during reception',
        checkpoints:
          'As per customer request. In case of criticality, customer should be informed and test ride taken',
        MaxObt: '',
      },
    ],
  },
  {
    title: 'Service Quality',
    data: [
      {
        subParameter: 'State of Customer Lounge',
        checkpoints: 'Use of the right equipment, safety aids',
        MaxObt: '',
      },
      {
        subParameter: 'Job Card Opening/ Delivery area',
        checkpoints: 'Check sample of 3 customers',
        MaxObt: '',
      },
      {
        subParameter: 'Cleanliness of Washroom',
        checkpoints: 'Check sample during visit',
        MaxObt: '',
      },
      {
        subParameter: 'Workshop Area',
        checkpoints: 'Check during visit',
        MaxObt: '',
      },
    ],
  },
  {
    title: 'Vehicle Delivery',
    data: [
      {
        subParameter: 'Availability of Trained CRM/ CRE',
        checkpoints: 'Training team data',
        MaxObt: '',
      },
      {
        subParameter:
          'Vehicle readiness information communicated to customer through phone call or SMS',
        checkpoints: 'Check sample during visit',
        MaxObt: '',
      },
      {
        subParameter:
          'Test ride with customer during delivery in case of criticality',
        checkpoints: 'Check sample during visit',
        MaxObt: '',
      },
      {
        subParameter: 'Explanation of Job Card & Itemized Invoice',
        checkpoints: 'Check for sample of 3 customers',
        MaxObt: '',
      },
      {
        subParameter:
          'SA Offers feedback form to customer & takes feedback on service',
        checkpoints: 'Check sample of 1-2 cases',
        MaxObt: '',
      },
      {
        subParameter: 'Post service follow-up is done',
        checkpoints: 'Check sample during visit',
        MaxObt: '',
      },
    ],
  },
];

export const LOCAL_STORAGE_KEYS = {
  CREATE_DEALER: 'CREATE_DEALER',
  DEALER_EVALUATION: 'DEALER_EVALUATION',
  KEY_PERFORMANCE: 'KEY_PERFORMANCE',
  MAN_POWER_AVAILABILITY_TRAINING: 'MAN_POWER_AVAILABILITY_TRAINING',
  WORKSHOP_PICTURES: 'WORKSHOP_PICTURES',
  CUSTOMER_COMPLAINT: 'CUSTOMER_COMPLAINT',
  REPEAT_JC_NOS: 'REPEAT_JC_NOS',
};

// dealer code :-

export const DEALER_CODES_LISTS = [
  {id: '1', title: 'Dealer Code #123', status: 'Pending', date: '12-08-2025'},
  {
    id: '2',
    title: 'Dealer Code #124',
    status: 'Completed',
    date: '05-07-2024',
  },
  {
    id: '3',
    title: 'Dealer Code #125',
    status: 'In Progress',
    date: '19-03-2023',
  },
  {id: '4', title: 'Dealer Code #126', status: 'Pending', date: '27-09-2022'},
  {id: '5', title: 'Dealer Code #127', status: 'Pending', date: '14-06-2021'},
  {
    id: '6',
    title: 'Dealer Code #128',
    status: 'Completed',
    date: '21-11-2020',
  },
  {
    id: '7',
    title: 'Dealer Code #129',
    status: 'In Progress',
    date: '30-01-2019',
  },
  {id: '8', title: 'Dealer Code #130', status: 'Pending', date: '08-05-2018'},
  {id: '9', title: 'Dealer Code #131', status: 'Pending', date: '17-12-2017'},
  {
    id: '10',
    title: 'Dealer Code #132',
    status: 'Completed',
    date: '26-04-2016',
  },
  {
    id: '11',
    title: 'Dealer Code #133',
    status: 'In Progress',
    date: '13-08-2015',
  },
  {
    id: '12',
    title: 'Dealer Code #134',
    status: 'Pending',
    date: '22-10-2014',
  },
];
