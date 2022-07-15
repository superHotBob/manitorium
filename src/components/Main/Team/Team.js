import maks from "../../../assets/images/main/maks-kusnetsoff.png";
import leon from "../../../assets/images/main/leon-rebelsky.png";
import "./Team.css";

function Team() {
  const team = [
    {
      photo: maks,
      name: "It’s Maks Kusnetsoff",
      career: "Data scientist, AI expert",
      text: "Text about Max",
    },
    {
      photo: leon,
      name: "It’s Leon Rebelsky",
      career: "PhD, Quantitative",
      text: "About Leon",
    },
  ];

  return (
    <section className="team">
      <p className="team__title">Our team</p>
      <ul className="team__list">
        {team.map((item, i) => (
          <li className="team__item" key={i}>
            <div className="team__photo-box">
              <div className="team__photo-back" />
              <img className="team__photo" src={item.photo} alt={item.name} />
            </div>
            <div className="team__text-box">
              <p className="team__name">{item.name}</p>
              <p className="team__career">{item.career}</p>
              <p className="team__text">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Team;
