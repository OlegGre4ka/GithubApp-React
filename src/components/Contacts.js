import React from "react";

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
         this.setState({ users:[ data
       
        ]
      });
      });
  }

  render() {
    const { users } = this.state;
    console.log(users, "in render()");
 
    return (
      <div className="Test">
        {users.map((item,i)=> (
          <h3 key={i}>{item.login}</h3>
        ))}
      </div>
    );
  }
}

// export default Test;
