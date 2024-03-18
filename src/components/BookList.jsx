import React, { Component } from "react";
import SingleBook from "./SingleBook";
import CommentArea from "./CommentArea";
import { Col, Form, Row } from "react-bootstrap";

class BookList extends Component {
  state = {
    searchQuery: "",
    selectedBookAsin: null, // Aggiungi lo stato per il codice ASIN del libro selezionato
  };

  handleBookSelect = (asin) => {
    this.setState({ selectedBookAsin: asin });
  };

  render() {
    const { selectedBookAsin } = this.state;

    return (
      <>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={4} className="text-center">
            <Form.Group>
              <Form.Control
                type="search"
                placeholder="Cerca un libro"
                value={this.state.searchQuery}
                onChange={(e) => this.setState({ searchQuery: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={8}>
            <Row className="g-2">
              {this.props.books
                .filter((b) => b.title.toLowerCase().includes(this.state.searchQuery))
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook
                      book={b}
                      onSelect={this.handleBookSelect} // Passa la funzione di gestione della selezione
                      isSelected={selectedBookAsin === b.asin} // Verifica se il libro è selezionato
                    />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <CommentArea selectedBookAsin={selectedBookAsin} />{" "}
            {/* Passa il codice ASIN del libro selezionato al CommentArea */}
          </Col>
        </Row>
      </>
    );
  }
}

export default BookList;
