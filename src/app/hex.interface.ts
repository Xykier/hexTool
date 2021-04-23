// interface IHex {
//   x: number;
//   y: number;
//   data: {
//     title?: string;
//     description?: string;
//     randomEncounters?: string;
//     notes?: string;
//     icon?: {
//       name: string;
//       color: string;
//     };
//   };
// }

interface IHex {
  title?: string;
  description?: string;
  randomEncounters?: string;
  notes?: string;
  icon?: {
    name: string;
    color: string;
  };
}

interface IHexMap {
  [x: string]: IHex;
}

const getDefaultHex = (): IHex =>  {
  return {
    title: '',
    description: '',
    randomEncounters: '',
    notes: '',
    icon: {
      name: '',
      color: 'black'
    }
  };
};

export { IHex, IHexMap, getDefaultHex };
