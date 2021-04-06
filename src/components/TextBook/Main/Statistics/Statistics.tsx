/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Chart, ChartType, registerables } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';

import { Statistic } from '@/types/response.types';
import getStatistic from '@/utils/getStatistic';

Chart.register(...registerables);

interface Config {
  type: ChartType;
  data: {
    labels: string[];
    datasets: {
      label: string;
      backgroundColor: string;
      borderColor: string;
      data: number[];
    }[];
  };
  options: {
    responsive: boolean;
  };
}

const Statistics = (): JSX.Element => {
  const [readyToRender, setReadyToRender] = useState(false);
  const [allWordsLearned, setAllWordsLearned] = useState(0);
  const [chartLabels, setChartLabels] = useState(['00.00.0000']);
  const [chartData, setChartData] = useState([0]);
  const [data, setData] = useState({
    labels: chartLabels,
    datasets: [
      {
        label: '',
        backgroundColor: '',
        borderColor: '',
        data: chartData,
      },
    ],
  });
  const [options, setOptions] = useState({
    responsive: true,
  });
  const [config, setConfig] = useState<Config>({
    type: 'line',
    data,
    options,
  });

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartEl = 'statisticChart';

  useEffect(() => {
    getStatistic()
      .then((responseStatistic: Statistic) => {
        // setStatistic(responseStatistic)
        setReadyToRender(true);
        setChartLabels(Object.keys(responseStatistic.optional.allStats));
        setChartData(Object.values(responseStatistic.optional.allStats));
        setAllWordsLearned(responseStatistic.learnedWords);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    setData({
      labels: chartLabels,
      datasets: [
        {
          label: 'Статистика изученных слов',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: chartData,
        },
      ],
    });
  }, [chartData]);

  useEffect(() => {
    setConfig({
      type: 'line',
      data,
      options,
    });
  }, [data]);

  useEffect(() => {
    if (readyToRender) {
      console.log(config);
      const chart = new Chart(chartEl, config);
    }
  }, [config]);

  return (
    <div>
      <div>
        <canvas id="statisticChart" width="400" height="400" ref={chartRef} />
      </div>
      <div>{allWordsLearned}</div>
    </div>
  );
};

export default Statistics;
