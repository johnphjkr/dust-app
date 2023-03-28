import styled from 'styled-components'

export const dustApp = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    align-items:center;
    justify-content: center;
    margin-left:10px;
`

export const dustAppCardArea = styled.div`
    width:100%;
    height:730px;
    overflow-y:scroll;

    &::-webkit-scollbar{
        width:6px;
    }

    &::-webkit-scollbar-track{
        background-color:transparent;
    }

    &::-webkit-scrollbar-thumb{
        border-radius:3px;
        background-color:gray;
    }

    &::-webkit-scollbar-button{
        width:0px;
        height:0px;
    }
`