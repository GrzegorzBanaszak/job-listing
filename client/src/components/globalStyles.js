import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;700&display=swap');
*{
    margin:0;
    padding:0;
    box-sizing:border-box ;
}
body{
    font-family: 'League Spartan', sans-serif;
    color:hsl(180, 29%, 50%);
    background-color:hsl(180, 52%, 96%) ;
}
`;
