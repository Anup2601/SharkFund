import SectionGrid from '../SectionGrid';
import { FaHeadset, FaShieldAlt, FaLightbulb, FaRocket, FaStar, FaSmile, FaEye, FaBullseye, FaHeart } from "react-icons/fa";

const Features = () => {
    return (
        <SectionGrid
        id="features"
        bgColor="light-bg"
        title="Key Features What you can find in SharkFund"
        items={[
          { icon: FaSmile, heading: "Enjoyment", text: "We believe finance shouldn’t be frustrating. Our intuitive platform is designed to deliver a stress-free, enjoyable experience." },
          { icon: FaEye, heading: "Openness", text: "We lead with clarity—sharing insights, updates, and decisions openly to build trust at every level." },
          { icon: FaShieldAlt, heading: "Security", text: "With robust security protocols and compliance standards, your investments are always safeguarded." },
        ]}
      />
    );
  };
  
  export default Features;
  