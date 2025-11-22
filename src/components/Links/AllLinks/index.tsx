import { FaYoutube, FaInstagram } from 'react-icons/fa';

export default function AllLinks() {
  const iconStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    transition: 'transform 0.2s ease',
  };

  return (
    <div className="allinks">
      <a
        href="https://www.instagram.com/totesband/"
        target="_blank"
        rel="noopener noreferrer"
        title="Följ oss på Instagram"
        style={iconStyle}
        className="hover:scale-110"
      >
        <FaInstagram size={62} color="#E4405F" />
      </a>
      <a
        href="https://www.youtube.com/@OfficiallyTotes"
        target="_blank"
        rel="noopener noreferrer"
        title="Prenumerera på YouTube"
        style={iconStyle}
        className="hover:scale-110"
      >
        <FaYoutube size={62} color="#FF0000" />
      </a>
    </div>
  );
}
