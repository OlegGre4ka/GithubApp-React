import React from "react";
import "./repositories.scss";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import Moment from "moment";
import { FaRegHeart } from "react-icons/fa";

export default class Repositories extends React.Component {
  static defaultProps = {
    searchWord: "react-search"
  };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      repos: [],
      itemID: [],
      countLike: ''
    };
  }

  componentDidMount() {
    this.searchRepos(this.props.searchWord);
  }
  // componentDidUpdate() {
  //   console.log(this.props.searchWordApp, "props.searchWordApp from App");

  //   this.searchRepos(this.props.searchWordApp);
  // }
  searchRepos(val) {
    console.log(this.props.searchWord, "this.props");

    fetch(`https://api.github.com/search/repositories?q=${val}`)
      // eslint-disable-next-line no-const-assign
      .then(response => response.json())

      .then(data => {
        console.log(data, "data");
        this.setState({
          repos: [data],
          items: data.items
          // id:this.state.items.id
        });
      })
        const { items } = this.state;
        items.slice().map(item => this.getLikeFromLocaleStorage(item.id));
        // this.setState({ itemID: itemID });
        // console.log(itemID, this.state.itemID, "itemID in searchRepos");
      // });

    // this.getLikeFromLocaleStorage(this.state.itemID);
  }
  // створюємо унікальний ключ для локалсторадж
  uniqueKey = id => {
    const keyLocaleStorage =
      id.toString() + "-" + id.toString().slice(-3) + "git-app-react";
    return keyLocaleStorage;
  };
  // Отримуємо дані з локалсторадж
  getLikeFromLocaleStorage = id => {
    // console.log(id, "this.state.is init");
    const keys = Object.keys(window.localStorage);
    // console.log(keys, "keys from localStorage");
    const getID = keys.filter(key => key === this.uniqueKey(id));

    console.log(this.uniqueKey(id), "uniqueID");
    console.log(getID[0], "getID");
    this.setState({ countLike: localStorage.getItem(getID[0]) });
    console.log(this.state.countLike, "countLike after setState getItem");
    //  if (!!this.countLike === true) {
    //    this.isPressed = true;
    //    this.count = true;
    //  }
  };
  addLike = id => {
    console.log(id, this.state.countLike, "in addLike");
    // eslint-disable-next-line react/no-direct-mutation-state
    this.setState({ countLike: ++this.state.countLike });
    console.log(this.state.countLike, "after setState in addLike");

    window.localStorage.setItem(this.uniqueKey(id), this.state.countLike);
    // console.log(this.state.countLike, "addLike");
  };
  render() {
    const { repos, items } = this.state;

    return (
      <div className="Repositories container">
        {repos.map((repo, i) => (
          <h1 key={i}>
            Default Request {this.props.searchWord} found: {repo.total_count}
          </h1>
        ))}
        <div className="Row row">
          {items.map(item => (
            <Card key={item.id} className="Card col-lg-4">
              <CardBody className="CardBody">
                <CardTitle className="CardTitle">
                  <p>
                    {" "}
                    Project:<span> {item.name}</span>
                  </p>
                  <span>
                    <FaRegHeart
                      onClick={() => this.addLike(item.id)}
                      className="Heart-Icon"
                    />
                    <small>{this.state.countLike}</small>
                  </span>
                </CardTitle>
                <CardSubtitle>Language: {item.language}</CardSubtitle>
              </CardBody>

              <CardBody>
                <CardText>
                  Description:
                  <br />
                  <small> {item.description}</small>
                </CardText>
                <CardLink
                  href={item.html_url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.html_url}
                </CardLink>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}

