import React from "react";
import './not-found-page.scss';

// eslint-disable-next-line no-undef
const NotFoundPage =(context) => {
  setTimeout( () => {
        context.history.push({pathname: '/repositories'})},3000)
  return(
    <div>
    <h2>Not found this page!</h2>
  </div>
  )
 
 };

export default NotFoundPage;
