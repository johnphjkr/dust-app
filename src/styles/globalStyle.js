import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    ::-webkit-scrollbar {
        width: 6px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: lightgray;
    }

    ::-webkit-scrollbar-button {
        width: 0px;
        height: 0px;
    }
`