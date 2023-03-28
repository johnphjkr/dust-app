import React, { useState, useEffect } from 'react'
import * as S from './style'

function DustTab({view, onViewChange}) {
    
    const handleViewChange = (newViewOption) => {
        onViewChange(newViewOption);
    }

    return (
        <S.tabContainer className='tabContainer'>
            <S.myAreaBtn className={`myAreaBtn ${view === 'one' ? 'active' : ''}`}
                onClick={() => handleViewChange('one')}>
                <S.buttonImg src='../../../img/one.png'/>
                <S.buttonText>내 지역보기</S.buttonText>
            </S.myAreaBtn>
            <S.allDistrictBtn className={`allDistrictBtn ${view === 'all' ? 'active' : ''}`}
                onClick={() => handleViewChange('all')}>
                <S.buttonImg src='../../../img/all.png'/>
                <S.buttonText>전체 시도보기</S.buttonText>
            </S.allDistrictBtn>
            <S.favoriteBtn className={`favoriteBtn ${view === 'favorite' ? 'active' : ''}`}
                onClick={() => handleViewChange('favorite')}>
                <S.buttonImg src='../../../img/favorite.png'/>
                <S.buttonText>즐겨찾기</S.buttonText>
            </S.favoriteBtn>
        </S.tabContainer>
    )
}

export default DustTab