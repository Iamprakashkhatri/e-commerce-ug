import styled from 'styled-components/macro';

export const Navigation = styled.div`
  color: #fff;
  padding: 0em 0;
  font-size: 0.9em;
`;

export const FixedTop = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 18;
  background: #fff;
  box-shadow: 0 2px 8px -2px gray;
`;

export const SocialLink = styled.div`
  /* display: flex;
  justify-content: space-between; */
`;
export const MobileNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const NavDropdown = styled.div`
  /* display: flex; */
`;

export const NavList = styled.div`
  font-size: 1.2em;
  display: flex;
  @media (max-width: 1199px) {
    margin-right: 6em;
  }
  @media (max-width: 991px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-top: 3em;
  }
`;
export const Nav = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const NavLogo = styled.div``;

export const Navcta = styled.div`
  font-size: 1.2em;
  color: #5a5a5a;
  position: relative;
`;

export const Navcontainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 25px;
  margin-right: auto;
  margin-left: auto;
  /* @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }

  @media (min-width: 992px) {
    max-width: 1080px;
  }

  @media (min-width: 1200px) {
    max-width: 1140px;
  } */
`;
