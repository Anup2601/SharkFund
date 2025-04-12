import './landing.css';
import Navbar from '../components/Navbar';
import SectionImageText from '../components/SectionImageText';
import SectionGrid from '../components/SectionGrid';
import SectionTextButton from '../components/SectionTextButton';
import SectionContact from '../components/SectionContact';
import Footer from '../components/Footer';
import { FaHeadset, FaShieldAlt, FaLightbulb, FaRocket, FaStar, FaSmile, FaEye, FaBullseye, FaHeart } from "react-icons/fa";


function Landing() {
  return (
    <div>
      <Navbar />

      <SectionImageText
        id="home"
        bgColor="dark-bg"
        image="/images/banner.png"
        title="We are world leading product innovation team"
        text="SharkFund is a full-service marketing agency that's been purpose-built to help organizations thrive in an increasingly complex landscape. We work strategy to execution Using our Think Beyond process to help partners identify clear opportunity and launch market-leading products and services."
        buttonText="GET STARTED"
      />

      <SectionImageText
        id="company"
        bgColor="light-bg"
        image="/images/financial.png"
        title="“Flattening” the world of trading with SharkFund "
        text="SharkFund has built a flexible and modern trading and risk platform employing the latest software design and infrastructure technologies. The platform provides a comprehensive solution that will evolve with our clients. We provide a fully integrated, scalable, and future proofed platform to support our clients entire workflow including: Portfolio management, trade execution, settlement, compliance, reconciliation, finance, risk, administration, and client reporting - all managed from a single source in a modern cloud infrastructure. Our platform will allow our clients to take an enterprise-wide and holistic approach to using and reviewing their data, ensuring that they are prepared to meet the technological challenges of increasing regulatory, compliance and investor demands."
      />

      <SectionGrid
        id="section3"
        bgColor="dark-bg"
        title="WHY CHOOSE US"
        items={[
          { icon: FaHeadset, heading: "Lifetime Support", text: "Sustaining Support puts you in control of your upgrade strategy." },
          { icon: FaShieldAlt, heading: "High Security", text: "Prevent a security breach by keeping data out of reach." },
          { icon: FaLightbulb, heading: "Opportunity", text: "Grab a golden opportunity to make some profit with SharkFund." },
        ]}
      />

      <SectionImageText
        id="section4"
        bgColor="light-bg"
        image="/images/cultural.png"
        title="We founded SharkFund with"
        text="security-first mentality and ethos of asking for permission, not forgiveness. We have worked hard to provide you with a high-integrity choice and we look forward to earning and maintaining your trust. SharkFund is a trust company regulated by the Department of Financial Services. We are subject to capital reserve requirements, cybersecurity requirements, and banking compliance standards set forth by the Banking Law. SharkFund is also a fiduciary and Qualified Custodian."
        buttonText="GET STARTED"
      />

      <SectionTextButton
        id="section5"
        bgColor="dark-bg"
        title="VALUE OF ASSOCIATION"
        text="SharkFund uses its proprietary technology and international experience to offer low cost, seamless global access to multiple types of securities for both institutional and individual investors."
        buttonText="JOIN THE COMMUNITY"
      />

      <SectionGrid
        id="features"
        bgColor="light-bg"
        title="Key Features What you can find in SharkFund"
        items={[
          { icon: FaRocket, heading: "Simplicity", text: "We strive to remove barriers and make online trading and investing accessible to everyone by making the process simpler and more transparent." },
          { icon: FaLightbulb, heading: "Innovation", text: "Since our founding, we have provided new ways of trading and investing online." },
          { icon: FaStar, heading: "Quality", text: "A user experience-focused mindset inspires every decision we make." },
          { icon: FaSmile, heading: "Enjoyment", text: "Our interface is intuitive and user-friendly, ensuring a simple and enjoyable experience." },
          { icon: FaEye, heading: "Openness", text: "Transparency is a core part of our company." },
          { icon: FaShieldAlt, heading: "Security", text: "SharkFund has built a leading security program to help protect customers and their assets." },
        ]}
      />

      <SectionImageText
        id="section7"
        bgColor="dark-bg"
        image="/images/office.png"
        title="Raise the money you need fast with SharkFund"
        text="Crowdfunding refers to the method through which the capital can be raised by the business through a large number of individuals beyond friends, family, relatives, and customers by posting the project details that the company is planning to start on the website of crowdfunding and other social media platforms. SharkFund is the USA’s leading crowdfunding platform offering crowdfunding to individuals, nonprofits, and businesses."
      />

      <SectionGrid
        id="vision"
        bgColor="light-bg"
        title="Our Future Strategies"
        items={[
          { icon: FaBullseye, heading: "Mission", text: "Our mission is to offer the best products and services, build the best technology and educate you ready for success." },
          { icon: FaEye, heading: "Vision", text: "Our vision is to create the best trading experience for you to be successful." },
          { icon: FaHeart, heading: "Values", text: "SharkFund is committed to core values - Integrity, Customer Focused Culture, Trust, Respect, Passion for Excellence, Teamwork." },
        ]}
/>

      <SectionTextButton
        id="contact"
        bgColor="dark-bg"
        title="SharkFund's Values"
        text="At SharkFund, giving back is a core value—a central part of our culture globally. We live that commitment through long-lasting partnerships, community-based delivery and engaging our best asset— our developers and maintainers. Our firm's commitment to sustainability informs our operations, governance, risk management, diversity efforts, philanthropy and research."
        buttonText="Get Started"
      />

      {/* Section 10 - Get in Touch */}
        <SectionContact
          id="section10"
          bgColor="light-bg"
        />

      <Footer />
    </div>
  );
}

export default Landing;
