import styled from "styled-components";

export const Footercopy = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;
