import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DustCard from '@/components/DustCard'
import DustLocation from '@/components/DustLocation'
import DustTab from "@/components/DustTab"
import * as S from './style'

function DustApp() {

  const [dataList, setDataList] = useState([]);
  const [defaultData, setDefaultData] = useState({sidoName: '서울', stationName: '서초구'});
  const [view, setView] = useState('one');
  const [favoriteData, setFavoriteData] = useState([]);
  const [stationData, setStationData] = useState([]);

  const getParameters = (sidoName = '서울') => {
    return {
      serviceKey: 'pT2xD/gbZZY5DNIRb5SOq3EIVpYox+ywUKYDdflftnrsX6CyIFDlmhJtAfpxvfQjR2vvQaL0ah93lxhGlrjeBw==',
      returnType: 'json',
      numOfRows: '100',
      pageNo: '1',
      sidoName: sidoName,
      ver: '1.0',
    }
  };
  const sidoList = ['전국', '서울', '부산', '대구', '인천', '광주', '대전', '울산', '경기', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주', '세종']

  const fetchData = async (sidoName) => {
    const response = await axios.get('/api/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty', { params: getParameters(sidoName) });
    return response.data;
  }

  const getData = async (sidoName) => {
    const data = await fetchData(sidoName);
    setDataList(data.response.body.items);
    return data.response.body.items;
  }

  useEffect(() => {
    getData('서울'); // 초기 실행시 서울 데이터를 가져옴
  }, []);

  useEffect(() => {
    setStationData(dataList.filter(item => item.stationName !== undefined).map(item => item.stationName));
  }, [dataList]);

  const handleSidoChange = (name) => {
    getData(name);
  };

  const handleStationChange = (name) => {
    setDefaultData(dataList.find(item => item.stationName === name));
  };

  useEffect(() => {
    const data = dataList.find(item => item.stationName === defaultData.stationName && item.sidoName === defaultData.sidoName);
    if (data) {
      setDefaultData(data);
    }
  }, [dataList]);

  useEffect(() => {
    const data = dataList
      .filter(item => item.stationName !== undefined)
      .map(item => ({
        stationName: item.stationName,
        sidoName: item.sidoName,
        pm10Grade: item.pm10Grade,
        pm10Value: item.pm10Value,
        dataTime: item.dataTime,
        favorite: item.favorite !== undefined ? item.favorite : false
      }));
    setAllData(data);
  }, [dataList]);

  const toggleFavorite = (stationName, favorite) => {
    const newDataList = dataList.map((item) => {
      if (item.stationName === stationName) {
        return {
          ...item,
          favorite: favorite,
        };
      }
      return item;
    });
    setDataList(newDataList);
  };

  const getFavoriteData = () => {
    const filteredData = dataList.filter(item => item.favorite === true);
    if (filteredData.length > 0) {
      setFavoriteData(filteredData);
    } else {
      setFavoriteData([]);
    }
  };

  useEffect(() => {
    getFavoriteData();
  }, [dataList]);

  const handleViewChange = (viewOption) => {
    setView(viewOption);
  }

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    const data = dataList
      .filter(item => item.stationName !== undefined)
      .map(item => ({
        stationName: item.stationName,
        sidoName: item.sidoName,
        pm10Grade: item.pm10Grade,
        pm10Value: item.pm10Value,
        dataTime: item.dataTime,
        favorite: item.favorite !== undefined ? item.favorite : false
      }));
    setAllData(data);
  }, [dataList]);

  return (
    <S.dustApp>
      <DustLocation
        sidoName={defaultData.sidoName}
        stationName={defaultData.stationName}
        sidoList={sidoList}
        stationList={stationData}
        onSidoChange={handleSidoChange}
        onStationChange={handleStationChange}
      />
      <S.dustAppCardArea>
        {view === 'one' ? (
          <DustCard
            stationName={defaultData.stationName}
            sidoName={defaultData.sidoName}
            pm10Grade={defaultData.pm10Grade}
            pm10Value={defaultData.pm10Value}
            dataTime={defaultData.dataTime}
            favorite={defaultData.favorite}
            onFavChange={toggleFavorite}
          />
        ) : null}
        {view === 'all'
          ? allData.map(item => (
              <DustCard
                key={`${item.stationName}-${item.sidoName}`}
                stationName={item.stationName}
                sidoName={item.sidoName}
                pm10Grade={item.pm10Grade}
                pm10Value={item.pm10Value}
                dataTime={item.dataTime}
                favorite={item.favorite}
                onFavChange={toggleFavorite}
              />
            ))
          : null}
        {view === 'favorite'
          ? favoriteData.map(item => (
              <DustCard
                key={`${item.stationName}-${item.sidoName}`}
                stationName={item.stationName}
                sidoName={item.sidoName}
                pm10Grade={item.pm10Grade}
                pm10Value={item.pm10Value}
                dataTime={item.dataTime}
                favorite={item.favorite}
                onFavChange={toggleFavorite}
              />
            ))
          : null}
      </S.dustAppCardArea>
      <DustTab view={view} onViewChange={handleViewChange} />
    </S.dustApp>
  )
}

export default DustApp
