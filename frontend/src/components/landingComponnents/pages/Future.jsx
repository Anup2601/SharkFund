import SectionGrid from '../SectionGrid';
import { FaHeadset, FaShieldAlt, FaLightbulb, FaRocket, FaStar, FaSmile, FaEye, FaBullseye, FaHeart } from "react-icons/fa";

const Future = () => {
    return (
      <SectionGrid
        id="vision"
        bgColor="light-bg"
        title="Our Future Strategies"
        items={[
          { icon: FaBullseye, heading: "Mission", text: "Delivering breakthrough products and tools that empower our clients to succeed—while educating and guiding them along the way." },
          { icon: FaEye, heading: "Vision", text: "To be the most trusted platform in trading, where innovation meets opportunity and success becomes a shared goal." },
          { icon: FaHeart, heading: "Values", text: "We uphold a foundation of trust, respect, excellence, and customer-first thinking to shape every decision we make." },
        ]}
      />
    );
  };
  
  export default Future;
  