import React from "react";
import "./repositories.scss";
import {
  Card,
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
    searchWord: "react"
  };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      repos: [],
      countLike: null
    };
  }
 
  componentDidMount() {
    this.searchRepos(this.props.searchWord);
  }
 
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
        });
        this.getLikeFromLocalStorage();
      });
  }
  // створюємо унікальний ключ для локалсторадж
  uniqueKey = id => {
    const keyLocaleStorage =
      id.toString() + "-" + id.toString().slice(-3) + "git-app-react";
    return keyLocaleStorage;
  };
// отримуємо по ключу значення з локалсторадж, додаємо в об"єкт і сетаємо в state
  getLikeFromLocalStorage() {
    // eslint-disable-next-line no-redeclare
    const { items } = this.state;
    const itemsFor = [...items];
    // eslint-disable-next-line array-callback-return
    itemsFor.map(item => {
   
      item.countLike = localStorage.getItem(this.uniqueKey(item.id));

    });
    return this.setState({
      items: itemsFor
    });
  }
// при кліку збільшуємо на 1 і сетаємо в localStorage
  addLike = id => {
    const { items } = this.state;

    console.log(items, "countLike in addLike()");
    // eslint-disable-next-line array-callback-return
    items.map(item => {
      // eslint-disable-next-line no-cond-assign
      if (item.id === id) {
        localStorage.setItem(this.uniqueKey(item.id), ++item.countLike);
        this.setState({ countLike: item.countLike });
      }
    });
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
                    Project:<span> {item.name}</span>
                  </p>
                  <span>
                    <FaRegHeart
                      onClick={() => this.addLike(item.id)}
                      className="Heart-Icon"
                    />
                    {/* <small>{this.state.countLike}</small> */}
                    <small>{item.countLike}</small>
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
