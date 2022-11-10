import './App.css';
import axios from 'axios';
import { useState } from 'react';

const locationIds = {
  mskId: '524894',
  spbId: '498817',
};

const units = {
  metric: 'metric',
  imperial: 'imperial',
};

const appId = 'b99a37f6cbd6ffdaa77f4abf103989a8';

function App() {
  const [mskData, setMskData] = useState({
    metric: '-',
    imperial: '-',
  });

  const [spbData, setSpbData] = useState({
    metric: '-',
    imperial: '-',
  });

  const fetchTemp = async (locationId, unit) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?id=${locationId}&appid=${appId}&units=${unit}`);
    return response.data.main.temp;
  }

  const fetchAllTemp = () => {
    fetchTemp(locationIds.mskId, units.imperial)
      .then((res) => {
        setMskData((state) => {
          return {...state, imperial: res};
        })
      })
      .catch((e) => {console.error(e)});
    fetchTemp(locationIds.mskId, units.metric)
      .then((res) => {
        setMskData((state) => {
          return {...state, metric: res};
        })
      })
      .catch((e) => {console.error(e)});
    fetchTemp(locationIds.spbId, units.imperial)
      .then((res) => {
        setSpbData((state) => {
          return {...state, imperial: res};
        })
      })
      .catch((e) => {console.error(e)});
    fetchTemp(locationIds.spbId, units.metric)
      .then((res) => {
        setSpbData((state) => {
          return {...state, metric: res};
        })
      })
      .catch((e) => {console.error(e)});
  };

  return (
    <div className="App">
      <h1>Weather info</h1>
      <button
          onClick={fetchAllTemp}
          style={{
            display: 'block',
            margin: '20px auto',
          }}
      >
          Get info
      </button>
      <table
        border={1}
        cellPadding={3}
        width="600px"
        align="center"
      >
        <thead>
          <tr>
            <td>Unit</td>
            <td>Moscow</td>
            <td>Saint Petersburg</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>°F</td>
            <td>{mskData.imperial}</td>
            <td>{spbData.imperial}</td>
          </tr>
          <tr>
            <td>°С</td>
            <td>{mskData.metric}</td>
            <td>{spbData.metric}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
