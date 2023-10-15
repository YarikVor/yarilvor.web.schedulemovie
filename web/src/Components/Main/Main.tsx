import { PropsWithChildren } from "react";
import { Container, Content, FlexboxGrid } from "rsuite";

const Main = (props: PropsWithChildren<{}>) => {
  return (
    <Container>
      <Content>
        <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>{props.children}</FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default Main;
