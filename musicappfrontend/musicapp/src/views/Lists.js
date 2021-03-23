import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { allLists } from "../actions/listActions";
import CardList from "../components/CardList";

function Lists(props) {
  const dispatch = useDispatch();
  const allListReducer = useSelector((state) => state.allList);
  const { lists } = allListReducer;

  useEffect(() => {
    dispatch(allLists());
  }, [])

  return(
  <div>
  { !lists ? <div>Loading...</div> :
      <Container style={{marginTop: "80px", height:"562px"}} fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <h5 style={{color:"white"}}>
            PlayLists
          </h5>
        </Row>
        <Row>
        {lists['lists'].map(list =>
            <Col xs="3" style={{}}>
              <CardList title={list.title} id={list.id}/>
            </Col>
          )}
        </Row>
      </Container>
  }
  </div>)
};

export default Lists;