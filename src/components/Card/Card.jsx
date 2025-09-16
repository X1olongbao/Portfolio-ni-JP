import './Card.css'

function Card() {
  return (
    <div className="custom-flex" style={{ flexDirection: "row", maxWidth: "900px" }}>
      <div className="theme-card" style={{ flex: 1, marginRight: "1rem" }}>
        <div className="theme-card-body">
          <h2 className="theme-card-title">Skills</h2>
          <ul className="theme-card-list">
            <li><strong>Frontend:</strong> React, Dart</li>
            <li><strong>Backend:</strong> ???, ???, ???</li>
            <li><strong>Tools:</strong> Git, Figma</li>
            <li><strong>Soft Skills:</strong> Teamwork, Communication</li>
          </ul>
        </div>
      </div>
      <div className="theme-card" style={{ flex: 1, marginLeft: "1rem" }}>
        <div className="theme-card-body">
          <h2 className="theme-card-title">About Me</h2>
          <p>
            A curious and critical thinker who embraces challenges and takes risks to grow. 
            Staying active in sports has shaped my discipline, resilience, and teamwork—qualities I bring into my journey as a web developer.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Card