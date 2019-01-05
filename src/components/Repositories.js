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
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { history } from "history";
import Moment from "moment";
import { FaRegHeart } from "react-icons/fa";
import ReposDetailed from "./ReposDetailed";
export default class Repositories extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: [],
      repos: [],
      countLike: null,
      defaulWord: true,
      itemID: []
    };
  }

  componentDidMount() {
    this.searchRepos(this.props.searchWord);
  }

  searchRepos(val) {
    fetch(`https://api.github.com/search/repositories?q=${val}`)
      // eslint-disable-next-line no-const-assign
      .then(response => response.json())

      .then(data => {
        this.setState({
          repos: [data],
          items: data.items
        });
        this.getLikeFromLocalStorage();
      });
  }
  itemFilterById = id => {
    const { items } = this.state;
    const itemID1 = items.filter(item => item.id === id);
    this.setState({ itemID: itemID1 });
    // return
    this.props.itemsForDetailed(itemID1);
    // this.props.history.push("/repositories/:id");
  };
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
            {this.state.defaulWord && <> Default</>} Request{" "}
            <span>{this.props.searchWord}</span> found: {repo.total_count}
          </h1>
        ))}
        <div className="Row row">
          {items.map(item => (
            <Card key={item.id} className="Card col-lg-4">
              <CardBody className="CardBody">
                <CardTitle className="CardTitle">
                  <p>
                    Project:
                    <Link
                      className="Link"
                      to={`/repositories/${item.id}`}
                      onClick={() => this.itemFilterById(item.id)}
                    >
                      {item.name}
                    </Link>
                    {/* <span
                      className="Link"
                      // to={`/repositories/${item.id}`}
                      onClick={() => this.itemFilterById(item.id)}
                    >
                      {item.name}
                    </span> */}
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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.searchWord === "") {
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchWord !== prevProps.searchWord) {
      this.searchRepos(this.props.searchWord);
      this.setState({ defaulWord: false });
    }
  }
}
