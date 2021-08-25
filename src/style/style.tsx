import styled, { createGlobalStyle } from 'styled-components'

export const Global = createGlobalStyle
`
*{
   margin: 0;
   padding: 0;
   font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
}
`

export const NavS = styled.header
`
.active{
   color: red;
}
width: 100%;
a{
   text-decoration: none;
}
li{
   list-style-type: none;
}
p{

}
`