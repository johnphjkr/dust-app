import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DustCard from '@/components/DustCard'
import DustLocation from '@/components/DustLocation'
import DustTab from "@/components/DustTab"
import * as S from './style'

function DustApp() {
  
  const [dataList, setDataList] = useState([]);
  const [defaultData, setDefaultData] = useState({});
  const [view, setView] = useState('one');
  const [favoriteData, setFavoriteData] = useState([]);

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
    
  const [sidoName, setSidoName] = useState('서울');
  const [stationName, setStationName] = useState('서초구');
  const handleStationChange = (name) => {
    setStationName(name);
  }
  const handleViewChange = (viewOption) => {
    setView(viewOption);
  }

  const fetchData = async (i) => {
    const response = await axios.get('/api/B552584/ArpltnInforInqireSvc', { params: getParameters(sidoName) })
    console.log('ㅇㅇㅇ')
    console.log('데이터' + response.data) // .data 라고 해야 데이터에 접근
    //return response.data;
  }

  const fetchData2 = async () => {
    const response = await axios.get('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/6dd85928-7919-46c7-ab66-0931df3fe4aa/data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20230328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20230328T061447Z&X-Amz-Expires=86400&X-Amz-Signature=e7d17e56d2bb94488886ae676cd5b1e7a5886a4114a4949585c834fd77e8a760&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22data.json%22&x-id=GetObject')
    return response.data;
  }

  useEffect(() => {
    fetchData2()
  }, [])

  const getData = async () => {
    const data = await fetchData2();
    setDataList(data.response.body.items);

    return data.response.body.items;
  }
  useEffect(() => {
    getData()
  }, [])

  let stationLists = dataList.filter(item => item.stationName !== undefined).map(item => item.stationName);
  console.log('stationLists : ' + stationLists);
  
  const [allData, setAllData] = useState([]);

  const getFavoriteData = () => {
    const filteredData = dataList.filter(item => item.favorite === true);
    if (filteredData.length > 0) {
        setFavoriteData(filteredData);
    }
    else {
      setFavoriteData([]);
    }
  };
  

  useEffect(() => {
    getFavoriteData();
  }, [dataList]);

  useEffect(() => {
    const data = dataList.find(item => item.stationName === stationName && item.sidoName === sidoName);
    if (data) {
      setDefaultData(data);
    }
  }, [sidoName, stationName, dataList]);

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
  
  return (
    <S.dustApp>
      <DustLocation sidoName={sidoName} stationName={stationName} sidoList={sidoList} stationList={stationLists} onStationChange={handleStationChange} />
      <S.dustAppCardArea>
        {view === 'one' ?
          <DustCard stationName={defaultData.stationName} sidoName={defaultData.sidoName} pm10Grade={defaultData.pm10Grade} pm10Value={defaultData.pm10Value} dataTime={defaultData.dataTime} favorite={defaultData.favorite} onFavChange={toggleFavorite} />
          : null}
        {view === 'all' ? allData.map(item =>
          <DustCard stationName={item.stationName} sidoName={item.sidoName} pm10Grade={item.pm10Grade} pm10Value={item.pm10Value} dataTime={item.dataTime} favorite={item.favorite} onFavChange={toggleFavorite} />
        )
          : null}
        {view === 'favorite' ? favoriteData.map(item =>
          <DustCard stationName={item.stationName} sidoName={item.sidoName} pm10Grade={item.pm10Grade} pm10Value={item.pm10Value} dataTime={item.dataTime} favorite={item.favorite} onFavChange={toggleFavorite} />
        )
          : null}
      </S.dustAppCardArea>
      <DustTab view={view} onViewChange={handleViewChange} />
    </S.dustApp>
  )
}

export default DustApp