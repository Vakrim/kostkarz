import React from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Box, DragData } from './Box';
import { boxesState, boxState } from './boxState';
import { subtract, Vec2 } from './lib/vec2';
import { Lines } from './Lines';

export function App() {
  const boxes = useRecoilValue(boxesState);
  const setBoxPosition = useRecoilCallback(
    ({ set }) => (id: number, position: Vec2) => {
      set(boxState(id), (b) => ({ ...b, position }));
    },
  );

  return (
    <Wrapper
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        const dragData = JSON.parse(e.dataTransfer.getData('text')) as DragData;
        setBoxPosition(
          dragData.id,
          subtract({ x: e.pageX, y: e.pageY }, dragData.handlePosition),
        );
      }}
    >
      {boxes.map((boxId) => (
        <Box key={boxId} id={boxId} />
      ))}
      <Lines />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-width: 100vw;
`;
