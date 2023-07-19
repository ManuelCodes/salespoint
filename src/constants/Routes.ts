import path from 'path';
import Sales from '../components/sales/Sales'

export default '';
const routes = [
    {
        path: "/",
        exact: true,
        /*sidebar: () => <div>home!</div>,*/
        Sales: () => Sales
    }
];
/*

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h2>Home</h2>
  },
  {
    path: "/bubblegum",
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h2>Bubblegum</h2>
  },
  {
    path: "/shoelaces",
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h2>Shoelaces</h2>
  }
];
*/
