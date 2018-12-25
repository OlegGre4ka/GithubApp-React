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
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      repos: [],
      countLike: ""
    };
    // this.props.searchWord = "angular";
    // this.count = 0;
    this.addLike = this.addLike.bind(this);
  }

  componentDidMount() {
    // this.searchRepos(this.searchValue);
    this.searchRepos(this.props.searchWord );

  }

  searchRepos(val) {
    fetch(`https://api.github.com/search/repositories?q=${val}`)
      // eslint-disable-next-line no-const-assign
      .then(response => response.json())

      .then(data => {
        console.log(data, "data");
        this.setState({
         
          repos: [data],
          items: data.items
        });
      });
  }
  addLike() {
    // eslint-disable-next-line react/no-direct-mutation-state
    this.setState({ countLike: ++this.state.countLike });
    console.log(this.state.countLike, "addLike");

  }
  render() {
    const { repos, items } = this.state;
    // console.log(repos, items, "in render()");

    return (
      <div className="Repositories container">
        {repos.map((repo, i) => (
          <h1 key={i}>
            Default Request {this.props.searchWord} found: {repo.total_count}
          </h1>
        ))}
        <div className="Row row">
          {items.map((item, i) => (
            <Card
              key={i}
              className="Card col-lg-4"
              style={{ marginTop: "15px" }}
            >
              <CardBody className="CardBody">
                <CardTitle className="CardTitle">
                  <span>Project: {item.name}</span>
                  <span>
                    <FaRegHeart onClick={this.addLike} className="Heart-Icon" />
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
                <CardLink href={item.html_url}>{item.html_url}</CardLink>
                {/* <CardLink href="#">Another Link</CardLink> */}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    );
  }
}
