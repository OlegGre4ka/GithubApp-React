import React from "react";
import "./repos-detailed.scss";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  CardSubtitle,
} from "reactstrap";
import Moment from "moment";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
export default class ReposDetailed extends React.Component {
  constructor(props,context) {
    super(props, context);
    this.state = {
      items: [],
      repos: [],
      countLike: null,
      defaulWord: true
    };
  }

  componentDidMount() {
    console.log(this.props.items, this.props.match,'items in detailed')
    // eslint-disable-next-line no-undef
    if(this.props.items===undefined){
      this.props.history.push('/repositories')
    } else{
      const items = [...this.props.items];
      this.setState({ items: items });
    }
  
  
  }

  // searchRepos(val) {
  //   console.log(this.props.searchWord, "this.props");

  //   fetch(`https://api.github.com/search/repositories?q=${val}`)
  //     // eslint-disable-next-line no-const-assign
  //     .then(response => response.json())

  //     .then(data => {
  //       console.log(data, "data");
  //       this.setState({
  //         repos: [data],
  //         items: data.items
  //       });
  //       this.getLikeFromLocalStorage();
  //       // this.props.itemsForApp(this.state.items);
  //     });
  // }
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
      const likeFormLocalStorage = localStorage.getItem(
        this.uniqueKey(item.id)
      );
      item.like = likeFormLocalStorage;
      if (likeFormLocalStorage === "brown") {
        item.thumbsUp = false;
        item.thumbsDown = true;
    
      } else if (likeFormLocalStorage === "red") {
        item.thumbsUp = true;
        item.thumbsDown = false;
      } else {
        item.thumbsUp = true;
        item.thumbsDown = false;
      }
    });
    return this.setState({
      items: itemsFor
    });
  }
 

  addLike = id => {
    const { items } = this.state;
    // eslint-disable-next-line array-callback-return
    items.map(item => {
      //     // eslint-disable-next-line no-cond-assign
      if (item.id === id) {
        console.log(id, item.id, "--id--item.id--");
        if (item.thumbsUp === true && item.like === null) {
          item.like = "red";
          localStorage.setItem(this.uniqueKey(item.id), item.like);

          this.setState({ like: item.like });
        } else if (item.thumbsUp === true && item.like === "red") {
          item.like = "brown";
          item.thumbsUp =false;
          item.thumbsDown= true;
          localStorage.setItem(this.uniqueKey(item.id), item.like);

          this.setState({
            thumbsUp: item.thumbsUp,
            thumbsDown: item.thumbsDown,
            like: item.like
          });
        } else if (item.thumbsDown === true) {
          item.like = null;
          item.thumbsUp =true;
          item.thumbsDown= false;
          localStorage.removeItem(this.uniqueKey(item.id));
          this.setState({ thumbsUp:item.thumbsUp, thumbsDown: item.thumbsDown, like: item.like });
        }
      }
    });
  };

  render() {
    const { items } = this.state;
console.log(this.props,'match.id-detailed')
    return (
      <div className="Repos-Detailed container">
        <div className="Row row">
          <div className="col-lg-3" />

          {items.map(item => (
            <Card key={item.id} className="Card col-lg-6">
              <CardBody className="CardBody">
             
                <img
                  width="20%"
                  src={item.owner.avatar_url}
                  aria-hidden
                  alt={item.name}
                />
                <CardTitle className="CardTitle">
                  <p>
                    Project: <span>{item.name}</span>
                  </p>
                  <span>
                    {item.thumbsUp && (
                      <FaRegThumbsUp
                        style={{ color: item.like }}
                        onClick={() => this.addLike(item.id)}
                        className="Heart-Icon"
                      />
                    )}

                    {item.thumbsDown && (
                      <FaRegThumbsDown
                        style={{ color: item.like }}
                        onClick={() => this.addLike(item.id)}
                        className="Heart-Icon"
                      />
                    )}
                  </span>
                </CardTitle>
                <CardTitle>Owner: {item.owner.login}</CardTitle>
                <CardText>Language: {item.language}</CardText>
              </CardBody>

              <CardBody>
                <p> Created:</p>
                  <CardSubtitle>
                    {Moment(item.created_at).format("MMMM Do YYYY, k:mm:ss")}
                  </CardSubtitle>
            
                <p> Updated:</p>
                  <CardSubtitle>
                    {Moment(item.updated_at).format("MMMM Do YYYY, k:mm:ss")}
                  </CardSubtitle>

                <CardText>
                  Clone URL:
                  <br /> {item.clone_url}
                </CardText>

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
          <div className="col-lg-3" />
        </div>
      </div>
    );
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, "prevProps");

  //   if (nextProps.searchWord === "") {
  //     return false;
  //   }
  //   return true;
  // }

}
