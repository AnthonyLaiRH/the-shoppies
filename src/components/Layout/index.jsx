import React from 'react';

import { Pane } from 'evergreen-ui';

export const Layout = (props) => {
  return (
    <Pane
      height={"80vh"}
      width={"80%"}
      marginX={"10%"}
      marginY={"10vh"}
      display="block"
      alignItems="center"
      justifyContent="center"
    >
      {props.children}
    </Pane>
  )
}
