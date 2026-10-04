import { Layout, Row, Col, Typography } from "antd";
import React from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import HomeContent from "./HomeContent";
import { Container } from "../../StyleGlobal/container";

const { Text, Title } = Typography;

export default function PrivacyPolicy() {
  return (
    <Layout className="home">
      <Navbar />
      <Container>
        <Row style={{ width: "100%", marginTop: "30px" }}>
          <Col xs={24}>
            <Title
              level={1}
              style={{ fontWeight: 700, justifyContent: "center" }}
            >
              Privacy Policy
            </Title>
            <Title level={5} style={{ fontWeight: 600, color: "black" }}>
              Last updated May 12, 2021
            </Title>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Website Terms and Conditions of Use
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              ULTRA GROUP is a conglomerate headquartered in Kathmandu, which
              comprises of ISO 9001:2015 certified companies engaged in the
              manufacturing, import, supply and design of a wide range of
              domestic, commercial and institutional projects and products.
              <br />
              <br />
              This Privacy Policy applies to thewww.ultraestore.comwebsite owned
              and operated by Ultra Home Private Limited, under the umbrella of
              ULTRA GROUP. Your privacy is very important to us and we take
              utmost care to protect your privacy.
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Ultraestore.com Website
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              You may access and browse this website without revealing any of
              your personal information. However, while downloading any of our
              material which has been developed by our internal subject matter
              experts OR while filling in a contact us form, we may collect your
              personal information such as your name, phone number or e-mail id
              that may be necessary to help us provide a better customer
              experience. We maintain the highest levels of confidentiality
              pertaining to your information.
              <br />
              <br />
              This portion of the policy applies to the Website. It does not
              apply to any website of any third party, even if the third-party
              website links to (or is linked from) the website. By accessing,
              using,and/or submitting information through the Website, you
              consent to the practices described in thispolicy about the
              information collected as described herein. If you do not hit the
              agree button on our cookie policy, your information will not be
              stored, or you may delete all cookies from your browser cache
              after visiting the website.
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Information Collection
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              To browse the Website only, you are not required to provide any
              personal information. However,we may gather
              non-personally-identifiable information. Like many commercial
              websites, we utilize “cookies” and other technologies to collect
              non-personally-identifiable information on visitors to the
              Website. Information gathered through cookies and web-server log
              files may include information such as the date and time of visits,
              the pages viewed, IP addresses, links to/from any page, and time
              spent at a site. Information collected from Website submissions
              will be used for the company's internal business purposes like
              sales and marketing.
              <br />
              <br />
              The website may include options for visitors to submit information
              to the company, for example,to request a service demonstration,
              download a report or e-paper, etc. Such forms may provide the
              option of submitting information, such as your name, job title,
              company, email address, or phone number. In addition, when
              submitting information on a Website, your submission will be
              associated with the IP address you are then using, which is
              automatically assigned to your computer by your Internet Service
              Provider. If you have visited the Website and would like to know
              what information, if any, that the company has about you and would
              like to correct such information or have it deleted, you may
              contact us at info@ultragroup.com.np
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Information Usage
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              We use cookie data to measure site traffic and usage activity for
              purposes of improving and enhancing the functionality of the
              Website, to look for possible fraudulent activity, to better
              understand the sources of traffic and transactions on the Website,
              and/or to serve targeted advertisements. Cookies also allow our
              servers to remember your account information for future visits and
              to provide personalized and streamlined information across related
              pages on the Website. You can choose to disable cookies for the
              Website but this may limit your ability to useour Website
              <br />
              <br />
              The company takes measures to maintain the security of its website
              visitor information, and doesnot license or sell such information
              to anyone.
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Data and research privacy for clients
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              Unlike other data service providers, we do not store a database or
              list of business professionals with their personal or business
              information, that companies or individuals can download or access
              in any way. Our data and research services are strictly
              confidential, and will never be stored or shared with third
              parties
              <br />
              <br />
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Cookies
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              Cookies are files with a small amount of data that is commonly
              used as an anonymous unique identifier. These are sent to your
              browser from the website that you visit and are stored on your
              computer’s hard drive. Our website uses these "cookies" to collect
              information and to improve our website. You have the option to
              either accept or refuse these cookies and know when a cookie is
              being sent to your computer. If you choose to refuse our cookies,
              you may not be able to use some portions of our website
              <br />
              <br />
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Service Providers
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              We use third-party service providers to help us operate and
              improve the website. These third parties assist us with analyzing
              how our website is used, performing Service-related services and
              providing the Service on our behalf. We want to inform our website
              users that these third parties have access to your Personal
              Information. The reason is to perform the tasks assigned to them
              onour behalf. All our service providers must adhere to
              confidentiality obligations that are consistentwith this Privacy
              Policy
              <br />
              <br />
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Security
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              We value your trust in providing us your Personal Information,
              thus we are striving to use commercially acceptable means of
              protecting it. But remember that no method of transmission over
              the internet, or method of electronic storage is 100% secure and
              reliable, and we cannot guarantee its absolute security.If you
              feel that the security of any data that we hold about you has been
              compromised, please immediately notify us of the problem by
              contacting us in accordance with the"Contact Us"section below.
              <br />
              <br />
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Links to Other Sites
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              Our website may contain links to other sites. If you click on a
              third-party link, you will be directed to that site. Note that
              these external sites are not operated by us. Therefore, we
              strongly advise you to review the Privacy Policy of these
              websites. We have no control over and assume no responsibility for
              the content, privacy policies, or practices of any third-party
              sites or services.
              <br />
              <br />
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Data Retention Period and Other Information Concerning Data
              Processing
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              We may store personal data only for the period necessary to
              achieve a particular purpose for which it was sent, or in order to
              comply with the law. If the user has consented to the use of
              personal data in connection with the use of the newsletter,
              personal data shall be processed until the consent is withdrawn.
              <br />
              <br />
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Changes to This Privacy Policy
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              We may update our Privacy Policy from time to time. Thus, we
              advise you to review this page periodically for any changes.Any
              changes will become effective when we post a revised version of
              this Privacy Statement.We will inform you via email of revisions
              to the Privacy Policy.
              <br />
              <br />
            </Text>
          </Col>
          <Col xs={24} style={{ marginTop: "20px" }}>
            <Title level={4} style={{ fontWeight: 700 }}>
              Contact Us
            </Title>
          </Col>
          <Col xs={24} style={{ textAlign: "justify" }}>
            <Text>
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us.
              <br />
              Ultra Home Private Limited.
              <br />
              P.O Box: 515, Tripureshwor, Kathmandu
              <br />
              Email: info@ultragroup.com.np
              <br />
              <br />
            </Text>
          </Col>
        </Row>
      </Container>

      <Footer />
    </Layout>
  );
}
