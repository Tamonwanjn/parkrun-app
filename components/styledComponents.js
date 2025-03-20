import styled from 'styled-components'

import { mediaIpad, mediaIpadmini, mediaMobile } from './layoutStyledCom'

export const HeaderContainer = styled.div`
  width: 100%;
  ${mediaMobile.Mobile`
    width: 100%;
  `}
  ${mediaIpadmini.Ipadmini`
    width: 100%;
  `}
  ${mediaIpad.Ipad`
    width: 100%;
  `}
`

export const Navber = styled.div`
    display: none;
    font-size: 35px;
    // line-height: 100px;
    cursor: pointer;
    transition: color .3s;
  ${mediaMobile.Mobile`
    display: block !important; 
  `}
  ${mediaIpadmini.Ipadmini`
    display: block !important; 
  `}
  ${mediaIpad.Ipad`
    display: block !important; 
  `}
`
