import React, { useState, useContext, useEffect } from "react";
import { ActionTypes, Store } from "../../store";
import { useRequest } from "../../hooks";
import { search as searchCompany } from "../../services";
import { useDebounce } from "../../hooks";
import {
  FormGroup,
  Form,
  Row,
  Col,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { CompanyResults } from "./CompanyResults";

export function CompanySearch() {
  const { dispatch } = useContext(Store);
  const [query, setQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [{ data, isLoading, isError }, setRequestParams, setData] = useRequest(
    null,
    {
      bestMatches: [],
    },
  );
  const debouncedQuery = useDebounce(query, 500);

  const preventQuery =
    !debouncedQuery || (selectedItem && selectedItem.symbol === debouncedQuery);

  const actionCallback = item => {
    setQuery(item.symbol);
    setSelectedItem(item);
  };

  const reset = () => {
    setQuery("");
    setSelectedItem(null);
    setData({
      bestMatches: [],
    });
  };

  useEffect(() => {
    if (!preventQuery) {
      setRequestParams(searchCompany(debouncedQuery));
    }
  }, [debouncedQuery]);

  return (
    <div className="mt-4">
      <Form
        onSubmit={event => {
          event.preventDefault();
          dispatch({ type: ActionTypes.ADD_COMPANY, payload: selectedItem });
          reset();
        }}
      >
        <FormGroup>
          <Row>
            <Col sm={5}>
              <Form.Label>Company symbol</Form.Label>
              <Form.Control
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
                data-testid="search"
                placeholder="Company symbol"
              />
              <Form.Text className="text-muted">
                Provide the stock exchange symbol of a company you want to track
              </Form.Text>
            </Col>
          </Row>
        </FormGroup>
        <Button type="submit" disabled={!selectedItem}>
          Track
        </Button>
      </Form>
      {isError && (
        <Alert variant="danger" className="mt-4">
          Error occured :(
        </Alert>
      )}
      {isLoading ? (
        <div className="mt-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <CompanyResults results={data.bestMatches} action={actionCallback} />
      )}
    </div>
  );
}
