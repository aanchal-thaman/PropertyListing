import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="fLists">
        <ul className="fList">
          <li className="fListItem">Mumbai</li>
          <li className="fListItem">Navi Mumbai</li>
          <li className="fListItem">Thane</li>
          <li className="fListItem">Suburban</li>
        </ul>
        <ul className="fList">
          <li className="fListItem">Apartments </li>
          <li className="fListItem">Resorts </li>
          <li className="fListItem">Villas</li>
          <li className="fListItem">Guest houses</li>
        </ul>

        <ul className="fList">
          <li className="fListItem">Curtomer Service</li>
          <li className="fListItem">Sustainability</li>
          <li className="fListItem">Safety Resource Center</li>
          <li className="fListItem">Terms & conditions</li>
        </ul>
      </div>
      <div className="fText">Copyright © 2023 Aanchal Booking.</div>
    </div>
  );
};

export default Footer;
