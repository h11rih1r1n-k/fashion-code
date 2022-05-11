import { RouteComponentProps, withRouter } from "react-router-dom";
import { MenuItemType } from "@types";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }: MenuItemType & RouteComponentProps ) => {
  return (
    <div
      className={`${size} menu-item`}
      onClick={(e) => history.push(`${match.url}${linkUrl}`)}
    >
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
        className="background-image"
      ></div>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default withRouter(MenuItem);