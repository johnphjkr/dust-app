import React from 'react'
import * as S from './style'

function DustCard({ stationName, sidoName, pm10Grade, pm10Value, dataTime, favorite, onFavChange }) {
    let pmGrade = '';
    let color = '';
    if (pm10Value < 31) {
        pmGrade = '좋음';
    }
    if (pm10Value < 81 && pm10Value >30) {
        pmGrade = '보통';
    }
    if (pm10Value < 151 && pm10Value > 80) {
        pmGrade = '나쁨';
    }
    if (pm10Value > 150) {
        pmGrade = '매우나쁨';
    }
    if (pm10Value === '–') {
        pmGrade = '알수없음';
    }

    function getBackgroundColor(pm10Value) {
        if (pm10Value < 31) {
            return { backgroundColor: '#2970db' };
        } else if (pm10Value < 81 && pm10Value > 30) {
            return { backgroundColor: '#27cc27' };
        } else if (pm10Value < 151 && pm10Value > 80) {
            return { backgroundColor: 'yellow' };
        } else if (pm10Value > 150) {
            return { backgroundColor: 'red' };
        }
        else if (pm10Value === '–') {
            return { backgroundColor: 'grey' };
        }
    }
    function getColor(pm10Value) {
        if (pm10Value < 31) {
            return { color: '#2970db' };
        } else if (pm10Value < 81 && pm10Value > 30) {
            return { color: '#27cc27' };
        } else if (pm10Value < 151 && pm10Value > 80) {
            return { color: 'yellow' };
        } else if (pm10Value > 150) {
            return { color: 'red' };
        }
        else if (pm10Value === '–') {
            return { backgroundColor: 'grey' };
        }
    }
    const handleFavChange = (event) => {
        onFavChange(stationName, !favorite);
    }

    return (
        <S.dustCard style={getBackgroundColor(pm10Value)}>
            <S.dustCardFirstRow>
                <S.districtName className='districtName'>{stationName}</S.districtName>
                <S.cityName className='cityName'>{sidoName}</S.cityName>
                {favorite === true ? 
                    <S.starBtn className='starBtn' value={favorite} onClick={handleFavChange}>★</S.starBtn>
                : <S.starBtn className='starBtn' value={favorite} onClick={handleFavChange}>☆</S.starBtn>}
            </S.dustCardFirstRow>
            <S.dustStatus className='dustStatus'style={getColor(pm10Value)}>{pmGrade}</S.dustStatus>
            <S.dustNumber className='dustNumber'>미세먼지 수치 : {pm10Value}</S.dustNumber>
            <S.dateInfo className='dateInfo'>({dataTime} 기준)</S.dateInfo>
        </S.dustCard>
        
    )
}

export default DustCard