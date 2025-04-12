import './Section.css';

function Section({ id, title, dark }: { id: string; title: string; dark: boolean }) {
  return (
    <section id={id} className={`section ${dark ? 'dark' : 'light'}`}>
      <h2>{title}</h2>
    </section>
  );
}

export default Section;
