import "./SectionGrid.css";

const SectionGrid = ({ id, bgColor, title, items }) => {
  return (
    <section id={id} className={`section-grid ${bgColor}`}>
      <div className="container">
        <h2 className="section-title">{title}</h2>
        <div className="grid">
          {items.map((item, index) => (
            <div className="grid-item" key={index}>
              <div className="icon">
                {typeof item.icon === "string" ? (
                  <img src={item.icon} alt={item.heading} />
                ) : (
                  <item.icon size={40} />
                )}
              </div>
              <h3>{item.heading}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionGrid;
