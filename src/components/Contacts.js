import React from "react";
import './contacts.scss';
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  CardText,
  CardImg,
  CardFooter
} from "reactstrap";
import Moment from 'moment';
export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    fetch(`https://api.github.com/users/OlegGre4ka`)
      //   {
      //     method: 'GET',
      //     headers: {

      //       'Content-type'  : 'application/json'
      //     }
      // eslint-disable-next-line no-const-assign
      .then(response => response.json())

      .then(data => {
        console.log(data,'data in contacts')
        this.setState({ users: [data] });
      });
  }

  render() {
    const { users } = this.state;
    console.log(users, "in render()");

    return (
      <div className="Contacts container">
        <div className="row">
          <div className="col-lg-3" />
          {users.map((user, i) => (
            // <h3 key={i}>{item.login}</h3>

            <Card key={i} className="col-lg-6">
              <CardImg
                top
                width="100%"
                src={user.avatar_url}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>{user.login}</CardTitle>
                <CardText>
                  <span>Github API URL:</span>
                  <br />
                  <a href={user.html_url} target="noopener noorefer">
                    {user.html_url}
                  </a>
                </CardText>
                <CardText>
                    <span>Public repositiries:</span> {user.public_repos}
                </CardText>
                <CardText>
                  <small className="text-muted">
                    Created: {Moment(user.created_at).format("MMMM Do YYYY, k:mm:ss")}
                  </small>
                  <br />
                  <small className="text-muted">
                    Updated: {Moment(user.updated_at).format("MMMM Do YYYY, k:mm:ss")}
                  </small>
                </CardText>
                <CardFooter>
                <div className="card-title">Contacts</div>

                <CardText>
                  <span>Email:</span>
                  <br />
                  <a href="mailto:gre4kae@gmail.com">gre4kae@gmail.com</a>
                </CardText>

                <CardText>
                  <span>Skype:</span>
                  <br />
                  <a href="skype:gre4kae">gre4kae</a>
                </CardText>

                <CardText>
                  <label>Linkedin:</label>
                  <br />
                  <a
                    href="https://www.linkedin.com/in/oleg-grechka-b14488172/"
                    target="noopener noorefer"
                  >
                    https://www.linkedin.com/in/oleg-grechka-b14488172/
                  </a>
                </CardText>

                <CardText>
                  <span>Telegram:</span>
                  <br />
                  <a href="https://t.me/gre4kae" target="noopener noorefer">
                    https://t.me/gre4kae
                  </a>
                </CardText>
                </CardFooter>
              </CardBody>
            </Card>
          ))}
          <div className="col-lg-3" />
        </div>
      </div>
    );
  }
}
