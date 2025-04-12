import './Section.css';

function Section({ id, title, dark }) {
  return (
    <section id={id} className={`section ${dark ? 'dark' : 'light'}`}>
      <h2>{title}</h2>
    </section>
  );
}

export default Section;
