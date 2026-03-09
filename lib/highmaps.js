//import './pproj4';
import Highcharts from 'highcharts';
import HighchartsMap from 'highcharts/modules/map';

// NOTE: Again, if doing server side rendering, check for window before bothering.
// Highcharts modules crash on the server.
if (typeof window !== 'undefined') {
  HighchartsMap(Highcharts);
  // Highcharts.maps['custom/world'] = customWorld;
}

export default Highcharts;