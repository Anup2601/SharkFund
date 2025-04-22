import SectionGrid from '../SectionGrid';
import { FaHeadset, FaShieldAlt, FaLightbulb, FaRocket, FaStar, FaSmile, FaEye, FaBullseye, FaHeart } from "react-icons/fa";

const Features = () => {
    return (
        <SectionGrid
        id="features"
        bgColor="light-bg"
        title="Key Features What you can find in SharkFund"
        items={[
          { icon: FaRocket, heading: "Simplicity", text: "We remove complexity from trading, making every process streamlined and accessible for both beginners and experts." },
          { icon: FaLightbulb, heading: "Innovation", text: "We’re constantly evolving, introducing revolutionary methods to invest smarter and trade faster." },
          { icon: FaStar, heading: "Quality", text: "Every product and service is built around a user-first philosophy, ensuring exceptional performance and usability." },
        ]}
      />
    );
  };
  
  export default Features;
  