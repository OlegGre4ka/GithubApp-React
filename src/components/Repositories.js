import React from "react";
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
export default class Repositories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      repos: []
    };
    this.searchValue = "angular";
  }

  componentDidMount() {
    this.searchRepos(this.searchValue);
  }

  searchRepos(val) {
    fetch(`https://api.github.com/search/repositories?q=${val}`)
      // eslint-disable-next-line no-const-assign
      .then(response => response.json())

      .then(data => {
        console.log(data, "data");
        this.setState({
          // objRepositiries: { data
          // total_count: data.total_count,
          repos: [data],
          items: data.items
          // }
        });
      });
  }
  render() {
    const { repos, items } = this.state;
    // const { items } = this.state.repos;
    // const items =repos.filter(repo=>repo===repo.items);
    console.log(repos, items, "in render()");

    return (
      <div className="Repositories container">
       {repos.map((repo, i) => (
            <h1 key={i}>
              Default Request {this.searchValue} found: {repo.total_count}
            </h1>
          ))}
        <div className="Row row">
         
          {items.map((item, i) => (
            // console.log(item),
            <Card key={i} className="Card col-lg-4" style={{marginTop:'15px'}}>
              <CardBody>
                <CardTitle>Project: {item.name}</CardTitle>
                <CardSubtitle>Language: {item.language}</CardSubtitle>
              </CardBody>
              {/* <img
                width="100%"
                src={}
                alt="Card image cap"
              /> */}
              <CardBody>
                <CardText>
                  Description:<br />
               <small>  {item.description}</small>
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
