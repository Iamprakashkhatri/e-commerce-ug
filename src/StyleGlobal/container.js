import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 1em;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    padding: 0 1em;
  }

  @media (min-width: 768px) {
    padding: 0 50px;
  }

  @media (min-width: 992px) {
    padding: 0 100px;
  }
  @media (min-width: 1200px) {
    padding: 0 100px;
  }
  ${'' /* @media (min-width: 1900px) {
    max-width: 1840px;
  } */}
`;

export const Admincontainer = styled.div`
  padding: 8px 38px;
  width: 100%;
`;
