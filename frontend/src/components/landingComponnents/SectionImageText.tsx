import "./SectionImageText.css";

interface SectionImageTextProps {
  id: string;
  bgColor: string;
  image: string;
  title: string;
  text: string;
  buttonText?: string;
}

const SectionImageText = ({ id, bgColor, image, title, text, buttonText }: SectionImageTextProps) => {
  return (
    <section id={id} className={`section-image-text ${bgColor}`}>
      <div className="container">
        <div className="content">
          <div className="image">
            <img src={image} alt={title} />
          </div>
          <div className="text">
            <h2>{title}</h2>
            <p>{text}</p>
            {buttonText && <button className="btn">{buttonText}</button>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionImageText;
