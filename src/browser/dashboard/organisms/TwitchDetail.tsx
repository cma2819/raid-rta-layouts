import { Card, CardMedia, Icon, Typography, useTheme } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import { RunData } from '../../../nodecg/generated/lib';

type Props = {
  runData: RunData;
}

const BaseCard = styled(Card)`
  display: flex;
  width: 100%;
  background-color: ${props => props.color};
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CardContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const TwitchDetail = ({runData}: Props) => {

  const theme = useTheme();

  return (
    <BaseCard color={theme.palette.primary.light}>
      <CardContainer>
        <CardMedia
          style={{width: 128}}
          image={runData.player.twitch?.profileImageUrl}
        />
        <CardContextContainer>
          <Typography component="h6" variant="h6">
            {runData.player.name}
          </Typography>
          <Typography variant="subtitle1">
            <Icon className="fab fa-twitch" />
            {runData.player.twitch?.login}
          </Typography>
        </CardContextContainer>
      </CardContainer>
    </BaseCard>
  );
}