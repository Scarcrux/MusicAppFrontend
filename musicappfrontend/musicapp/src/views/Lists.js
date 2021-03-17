import React, { useEffect } from 'react';
import { listLists } from '../actions/listActions';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';

function Lists(props) {
  const dispatch = useDispatch();
  const listList = useSelector(state => state.listList);
  const { loading: loadingLists, lists, error: errorLists } = listList;

  useEffect(() => {
    dispatch(listLists());
    return () => {};
  }, [])

  return 
  /*<div className="orgs content-margined">
  { loadingOrgs ? <div>Loading...</div> :
    errorOrgs ? <div>{errorOrgs}</div> :
      <Container style={{marginTop: "40px", paddingTop: "30px", paddingBottom:"20px"}} fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <h5 style={{color:"white"}}>
            Organizations
          </h5>
        </Row>
        <Row>
          {orgs.map(org =>
            <Col xs="4" style={{marginBottom:"30px"}}>
              <CardOrg id={org.id}
                public={true}
                name={org.organization_name}
                address={org.address}
                phone={org.phone}
                type={org.type}
                url={org.url}
              />
            </Col>
          )}
        </Row>
      </Container>
  }
  </div>*/
}

export default Lists;