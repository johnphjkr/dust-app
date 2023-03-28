import React, { useState, useEffect } from 'react'
import * as S from './style'

function DustLocation({ sidoName, stationName, sidoList, stationList, onStationChange }) {
    const [sido, setSido] = useState(sidoName);
    useEffect(() => {
        setSido(sidoName)
    }, [sidoName])

    const [station, setStation] = useState(stationName);
    useEffect(() => {
        setStation(stationName)
    }, [stationName])

    const handleSidoChange = (event) => {
        setSido(event.target.value);
    }

    const handleStationChange = (event) => {
        const newStationName = event.target.value;
        setStation(newStationName);
        onStationChange(newStationName);
    }

    return (
        <S.locationContainer>
            <S.citySelect className='citySelect' value={sido} onChange={handleSidoChange}>
                {sidoList.map((element) => {
                    return <option>{element}</option>
                })}
            </S.citySelect>
            <S.stationSelect className='stationSelect' value={station} onChange={handleStationChange}>
                {stationList.map((element) => {
                    return <option>{element}</option>
                })}
            </S.stationSelect>
        </S.locationContainer>
    )
}

export default DustLocation