import './Card.css';

function Card(props) {
  return (
    <div className="custom-flex">
      <div className="theme-card">
        <div className="theme-card-body">
          <h2 className="theme-card-title">{props.skillsTitle}</h2>
          <ul className="theme-card-list">
            {props.skills.map(function(item, idx) {
              return (
                <li key={idx}>
                  <strong>{item.label}:</strong> {item.list}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="theme-card">
        <div className="theme-card-body">
          <h2 className="theme-card-title">{props.aboutMeTitle}</h2>
          <p>{props.aboutMe}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;