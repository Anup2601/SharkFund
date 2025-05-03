import SectionGrid from '../SectionGrid';
import { FaHeadset, FaShieldAlt, FaLightbulb, FaRocket, FaStar, FaSmile, FaEye, FaBullseye, FaHeart } from "react-icons/fa";

const Services = () => {
    return (
        <div>
            <SectionGrid
                id="section3"
                bgColor="dark-bg"
                title="WHY CHOOSE US"
                items={[
                { icon: FaHeadset, heading: "Lifetime Support", text: "Our commitment doesn’t end at delivery. We provide ongoing, dedicated support to ensure long-term success and peace of mind." },
                { icon: FaShieldAlt, heading: "High Security", text: "Our top-tier encryption and threat monitoring systems protect your data and assets around the clock." },
                { icon: FaLightbulb, heading: "Opportunity", text: "Capitalize on next-gen trading and investment possibilities through our global network and smart technologies." },
                ]}
            />
        </div>
    );
  };
  
  export default Services;
  