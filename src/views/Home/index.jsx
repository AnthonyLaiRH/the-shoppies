import React from 'react';

import { TitleText, Wrapper } from './styled';
import { Layout } from '../../components/Layout';
import { SearchArea } from '../../components/SearchArea';
import { NominationArea } from '../../components/NominationArea';

export const Home = () => {
  return (
    <Layout>
      <TitleText>The Shoppies</TitleText>
      <Wrapper>
        <SearchArea/>
        <NominationArea/>
      </Wrapper>
    </Layout>
  )
}
